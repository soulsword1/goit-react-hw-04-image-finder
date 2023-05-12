import { Component } from 'react';
import { FetchPixabayApi } from '../services/FetchPixabayApi';
import { ImageGalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem';
import { Button } from '../Button';
import { Loader } from '../Loader';

export class ImageGallery extends Component {
  state = {
    page: 1,
    imageToSearch: null,
    images: null,
    error: null,
    state: 'idle',
  };

  onBtnClick = () => {
    const imageToSearch = this.props.imageToSearch;
    const page = this.state.page + 1;
    const state = 'pending';
    this.setState({ page, state });
    setTimeout(() => {
      FetchPixabayApi(imageToSearch, page)
        .then(data =>
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
          }))
        )
        .catch(error => this.setState({ error }));
      this.setState({ state: 'idle' });
    }, 1000);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.imageToSearch !== this.props.imageToSearch) {
      const imageToSearch = this.props.imageToSearch;
      const page = 1;
      this.setState({ imageToSearch, page, state: 'pending' });
      setTimeout(() => {
        FetchPixabayApi(imageToSearch, page)
          .then(data => this.setState({ images: data.hits }))
          .catch(error => this.setState({ error }));
        this.setState({ state: 'idle' });
      }, 1000);
    }
  }

  render() {
    const { images, state } = this.state;
    return (
      <>
        <ImageGalleryList>
          {images &&
            images.map(({ id, webformatURL, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
              />
            ))}
        </ImageGalleryList>
        {state === 'pending' && <Loader />}
        {images && <Button onBtnClick={this.onBtnClick} />}
      </>
    );
  }
}

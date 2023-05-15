import { Component } from 'react';
import PropTypes from 'prop-types';
import { FetchPixabayApi } from '../../services/FetchPixabayApi';
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
    const page = this.state.page + 1;
    this.setState({ page });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.imageToSearch !== this.props.imageToSearch) {
      this.setState({ images: [] });
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

    if (prevState.page !== this.state.page && this.state.page !== 1) {
      const imageToSearch = this.props.imageToSearch;
      const page = this.state.page;
      const state = 'pending';
      this.setState({ state });
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
    }
  }

  render() {
    const { images, state } = this.state;
    return (
      <>
        {images && (
          <ImageGalleryList>
            {images.map(({ id, webformatURL, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
              />
            ))}
          </ImageGalleryList>
        )}
        {state === 'error' && <p>Images not found</p>}
        {state === 'pending' && <Loader />}
        {state === 'idle' && images && <Button onBtnClick={this.onBtnClick} />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  imageToSearch: PropTypes.string,
};

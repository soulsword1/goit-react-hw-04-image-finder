import { Component } from 'react';
import {
  ImageGalleryLi,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';
import { Modal } from '../Modal';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  closeModalOnEsc() {}

  render() {
    const { webformatURL, largeImageURL } = this.props;
    const { showModal } = this.state;

    return (
      <>
        <ImageGalleryLi onClick={this.toggleModal}>
          <ImageGalleryItemImage src={webformatURL} alt="some_img" />
        </ImageGalleryLi>

        {showModal && (
          <Modal largeImageURL={largeImageURL} toggleModal={this.toggleModal} />
        )}
      </>
    );
  }
}

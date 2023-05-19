import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ImageGalleryLi,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';
import { Modal } from '../Modal';

export function ImageGalleryItem({ webformatURL, largeImageURL }){
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

    return (
      <>
        <ImageGalleryLi onClick={toggleModal}>
          <ImageGalleryItemImage src={webformatURL} alt="some_img" />
        </ImageGalleryLi>

        {showModal && (
          <Modal largeImageURL={largeImageURL} toggleModal={toggleModal} />
        )}
      </>
    );
  }

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
}
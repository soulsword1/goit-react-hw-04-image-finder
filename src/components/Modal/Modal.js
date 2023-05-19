import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ModalOverlay, ModalImg } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ largeImageURL, toggleModal }) {

  const onClickBackdrop = e => {
    e.currentTarget === e.target && toggleModal();
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        toggleModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleModal]);

  return createPortal(
    <ModalOverlay onClick={onClickBackdrop}>
      <ModalImg src={largeImageURL} />
    </ModalOverlay>,
    modalRoot
  );
}

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

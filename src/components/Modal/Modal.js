import { Component } from 'react';
import { ModalOverlay, ModalImg } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      console.log(e.code);
      this.props.toggleModal();
    }
  };

  onClickBackdrop = e => {
    e.currentTarget === e.target && this.props.toggleModal();
  };

  render() {
    const { largeImageURL } = this.props;
    return createPortal(
      <ModalOverlay onClick={this.onClickBackdrop}>
        <ModalImg src={largeImageURL} />
      </ModalOverlay>,
      modalRoot
    );
  }
}

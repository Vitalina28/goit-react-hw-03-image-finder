import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import { Component } from 'react';

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
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={css.Overlay} onClick={this.props.onClose}>
        <div className={css.Modal}>
          <img
            src={this.props.selectedImage.largeImageURL}
            alt={this.props.selectedImage.tags}
          />
        </div>
      </div>,
      modalRoot
    );
  }
}

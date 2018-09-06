import { createPortal } from 'react-dom';
import React, { Component } from 'react';
import { Button, ModalDialog, ModalTitle, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import './Modal.scss'

const modalRoot = document.getElementById('modal');

export class Overlay extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return createPortal(
        this.props.children,
        this.el,
    );
  }
}

export default function Modal(props) {
  return (
      <Overlay>
        <div className='modal' onClick={props.onClose}>
          <ModalDialog>
            <ModalHeader>
              <ModalTitle>{props.title}</ModalTitle>
            </ModalHeader>
            <ModalBody>{props.children}</ModalBody>
            <ModalFooter>
              <Button onClick={props.onClose}>Close</Button>
            </ModalFooter>
          </ModalDialog>
        </div>
      </Overlay>
  );
}
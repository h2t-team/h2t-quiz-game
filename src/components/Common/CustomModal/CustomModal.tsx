import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import Loader from '../Loader/Loader';

interface CustomModalProps {
  isShowModal: boolean;
  closeModal: () => void;
  titleText: string;
  submitForm?: React.FormEventHandler<HTMLFormElement>;
  modalBody?: React.ReactNode;
  bodyText?: string;
  cancelModal: () => void;
  isDisableConfirm: boolean;
  confirmText: string;
  confirmClick?: () => void;
  confirmVariant: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isShowModal,
  closeModal,
  titleText,
  submitForm,
  modalBody,
  bodyText,
  cancelModal,
  isDisableConfirm,
  confirmText,
  confirmClick,
  confirmVariant
}) => {
  const formModal = (
    <>
      <Form onSubmit={submitForm}>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelModal}>
            Cancel
          </Button>
          <Button variant={confirmVariant} type="submit" disabled={isDisableConfirm}>
            {isDisableConfirm ? <Loader size="sm" /> : confirmText}
          </Button>
        </Modal.Footer>
      </Form>
    </>
  );
  const normalModal = (
    <>
      <Modal.Body>{bodyText}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={cancelModal}>
          Cancel
        </Button>
        <Button
          variant={confirmVariant}
          onClick={confirmClick}
          disabled={isDisableConfirm}
        >
          {isDisableConfirm ? <Loader size="sm" /> : confirmText}
        </Button>
      </Modal.Footer>
    </>
  );

  return (
    <Modal size="lg" centered show={isShowModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{titleText}</Modal.Title>
      </Modal.Header>
      {submitForm ? formModal : normalModal}
    </Modal>
  );
};

export default CustomModal;

import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CustomModal = ({ showSubmitButton = true,show, handleClose, title, actionTitle, content, onSubmit, confirmButtonVariant = 'primary', size='sm' }: any) => {
    return (
        <Modal show={show} onHide={handleClose} size={size}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {content}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                {showSubmitButton &&
                    <Button variant={confirmButtonVariant} onClick={() => onSubmit()}>
                        {actionTitle}
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    );
};

export default CustomModal;

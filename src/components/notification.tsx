import React from 'react';
import Toast from 'react-bootstrap/Toast';

function NotificationToast({ show, onClose, title, message }: any) {
    return (
        <Toast
            show={show}
            onClose={onClose}
            delay={3000}
            autohide bg='success'
            className="position-absolute top-0 end-0 m-3">
            <Toast.Header>
                <strong className="me-auto">{title}</strong>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
    );
}

export default NotificationToast;
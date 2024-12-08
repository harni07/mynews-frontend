import React from 'react';
import '../styles/components/spinner.scss';

const LoadingSpinner = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '30vh' }}>
            <div className="custom-spinner" role="status">
            </div>
        </div>
    );
};

export default LoadingSpinner;
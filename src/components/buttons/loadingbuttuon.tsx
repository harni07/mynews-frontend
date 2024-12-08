import React, { useCallback } from 'react';
import { Button, ButtonProps, Spinner } from 'react-bootstrap';

interface LoadingButtonProps extends ButtonProps {
    text: string;
    onClickCallback: (callback: () => void) => void;
}

const LoadingButton = ({ text, onClickCallback, disabled, ...restProps }: LoadingButtonProps) => {
    const [clicked, setClicked] = React.useState(false);

    const handleClick = useCallback(() => {
        setClicked(true);
        onClickCallback(() => setClicked(false));
    }, [onClickCallback]);

    const buttonDisabled = disabled || clicked;

    const spinner = (
        <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            variant="light"
        />
    );

    return (
        <Button
            disabled={buttonDisabled}
            onClick={handleClick}
            {...restProps}
        >
            {clicked ? spinner : text}
        </Button>
    );
};

export default LoadingButton;

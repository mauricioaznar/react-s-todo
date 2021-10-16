import React, {useEffect, useState} from 'react';
import {Snackbar} from "@mui/material";

interface MauSnackbarProps {
    message: string;
    onClose: () => void;
}


const MauSnackbar = ({message, onClose}: MauSnackbarProps) => {

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (message !== '') {
            setIsOpen(true)
        }
    }, [message])

    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={6000}
            onClose={() => {
                setIsOpen(false)
                onClose()
            }}
            message={message}
        />
    );
};

export default MauSnackbar;

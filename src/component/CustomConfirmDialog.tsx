import React, { useState } from 'react';

type CustomConfirmDialogProps = {
    onConfirm : () => void
    text : string
    message : string
}

export const  CustomConfirmDialog = (props : CustomConfirmDialogProps) => {

    const style = {
        dialog :{
            backgroundColor : "green",
            padding : "5px"
        }
    }


    const [isOpen, setIsOpen] = useState(false);

    const openDialog = () => {
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
    };

    const confirmAction = () => {
        props.onConfirm(); // Execute the action if confirmed
        closeDialog();
    };

    return (
        <div>
        <button onClick={openDialog}>{props.text}</button>
        {isOpen && (
            <div style={style.dialog}>
                <p>{props.message}</p>
                <button onClick={confirmAction}>Yes</button>
                <button onClick={closeDialog}>No</button>
            </div>
        )}
        </div>
    );
}
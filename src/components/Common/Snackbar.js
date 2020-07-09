import React, { useState } from "react";
import { Snackbar } from 'react-native-paper';


export function ShowSnackbarSuccess(props) {
    const [visible, setVisible] = useState(true)

    return (
        <Snackbar
            style={{ backgroundColor: "#30A507", justifyContent: "center" }}
            visible={visible}
            duration={5000}
            onDismiss={() => setVisible(false)}
        >
            {props.message}
        </Snackbar>
    );
}

export function ShowSnackbarError(props) {
    const [visible, setVisible] = useState(true)


    return (
        <Snackbar
            style={{ backgroundColor: "#CB4335", justifyContent: "center", alignItems: "center" }}
            visible={visible}
            duration={5000}
            onDismiss={() => setVisible(false)}
        >
            {props.message}
        </Snackbar>
    );
}
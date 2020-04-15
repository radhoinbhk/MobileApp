import React from 'react'
import { IconButton, Button } from 'react-native-paper';
import { View } from 'react-native';
import { useSelector } from "react-redux";


export default function Header(props) {
    const isSignedIn = useSelector((state) => state.HomeReducer.isSignedIn)
    return (
        <View style={{ width: "100%"}}>
            {!isSignedIn ?
                <View style={{ paddingTop: 30, paddingLeft: 10 }}>
                    <Button mode="contained" style={{ width: 170 }} onPress={() => props.navigation.navigate('Login')}>
                        connecter
                    </Button>
                </View>
                :
                <IconButton
                    icon="menu"
                    size={30}
                    onPress={() => props.navigation.openDrawer()}
                    color="#6200ee"
                />
            }
        </View>
    );
}
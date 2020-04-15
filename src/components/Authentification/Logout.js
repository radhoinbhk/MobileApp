import React, { useEffect } from 'react'
import { SetUserData } from '../../redux/Action/HomeAction';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';
import Loader from '../Common/Loader';


export default function Logout(props) {
    const dispatch = useDispatch()


    const removeItemValue = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
            props.navigation.push('Home')
            return true;
        }
        catch (exception) {
            return false;
        }
    }
    useEffect(() => {
        dispatch(SetUserData(false, {}, ""))
        removeItemValue("userData")
    }, [])
    return (
        <Loader />
    );
}
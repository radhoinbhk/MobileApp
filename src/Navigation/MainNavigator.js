import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import Home from '../components/Home/Index';
import Login from '../components/Authentification/Login';
import SignupForm from '../components/Authentification/Signup/SignupForm';
import Signup from '../components/Authentification/Signup/Index';
import HelpRequestDetails from '../components/Common/HelpRequestDetails';
import DrawerNavigator from './DrawerNavigator';
import { SetUserData, StackIsLoading } from '../redux/Action/HomeAction';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import Loader from '../components/Common/Loader';
import PersonneParticipant from '../components/MyHelpRequest/PersonnesPartcipant';
import { Avatar, Subheading } from 'react-native-paper';
import { View, Text } from 'react-native';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MainNavigator(props) {
    const dispatch = useDispatch()
    const isSignedIn = useSelector((state) => state.HomeReducer.isSignedIn)
    const stackIsLoading = useSelector((state) => state.HomeReducer.stackIsLoading)

    useEffect(() => {
        if (!isSignedIn) {
            getUserData()
        }
    }, [])

    const getUserData = async () => {
        dispatch(StackIsLoading(true))
        try {
            const value = await AsyncStorage.getItem('userData')
            if (value !== null) {
                const userData = JSON.parse(value)
                dispatch(SetUserData(userData.success, userData.user, userData.token))
            }
            dispatch(StackIsLoading(false))
        } catch (e) {
            dispatch(StackIsLoading(false))
            console.log("erro", e)
        }
    }

    return (
        stackIsLoading ?
            <Loader />
            : isSignedIn ? (
                <>
                    < Stack.Navigator headerMode="none" >
                        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
                        <Stack.Screen name="HelpRequestDetails" component={HelpRequestDetails} />
                        <Stack.Screen name="PersonneParticipant" component={PersonneParticipant} />
                    </Stack.Navigator >
                </>
            ) : (
                    <>
                        < Stack.Navigator headerMode="none" >
                            <Stack.Screen name="Home" component={Home} />
                            <Stack.Screen name="Login" component={Login} />
                            <Stack.Screen name="Signup" component={Signup} />
                            <Stack.Screen name="SignupForm" component={SignupForm} />
                        </Stack.Navigator >

                    </>
                )
    );
}
export default MainNavigator
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import Home from '../components/Home/Index';
import Login from '../components/Authentification/Login';
import Logout from '../components/Authentification/Logout';
import Signup from '../components/Authentification/Signup';
import { SetUserData, StackIsLoading } from '../redux/Action/HomeAction';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import Loader from '../components/Common/Loader';
import { Avatar, Subheading } from 'react-native-paper';
import { View, Text } from 'react-native';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MainNavigator(props) {
    const dispatch = useDispatch()
    const isSignedIn = useSelector((state) => state.HomeReducer.isSignedIn)
    const userData = useSelector((state) => state.HomeReducer.userData)
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

    const CustomDrawerContent = (props) => {
        return (
            <DrawerContentScrollView {...props}>
                <View style={{ justifyContent: "center", alignItems: "center", width: "100%", marginBottom: 10, marginTop: 10 }}>
                    <Avatar.Icon size={80} icon="account" color="rgb(0,122,255)" style={{ backgroundColor: "rgba(0,122, 255, 0.12)" }} />
                    <Subheading>{userData.Nom}</Subheading>
                    <Text>{userData.Prenom}</Text>
                </View>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        );
    }

    return (
        stackIsLoading ?
            <Loader />
            : isSignedIn ? (
                <>
                    <Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawerContent {...props} />}>
                        <Drawer.Screen name="Home" component={Home} />
                        <Drawer.Screen name="Se déconnecter" component={Logout} />
                    </Drawer.Navigator >
                </>
            ) : (
                    <>
                        < Stack.Navigator headerMode="none" >
                            <Stack.Screen name="Home" component={Home} />
                            <Stack.Screen name="Login" component={Login} />
                            <Stack.Screen name="Signup" component={Signup} />
                        </Stack.Navigator >

                    </>
                )
    );
}
export default MainNavigator
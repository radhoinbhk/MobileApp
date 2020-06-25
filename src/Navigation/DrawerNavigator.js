import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import Home from '../components/Home/Index';
import Logout from '../components/Authentification/Logout';
import AddHelpRequest from '../components/HelpRequest/AddHelpRequest';
import HelpRequestList from '../components/HelpRequest/HelpRequestList';
import MyHelpRequestList from '../components/MyHelpRequest/MyHelpRequestList';
import Profile from '../components/Profile/Index';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { Avatar, Subheading } from 'react-native-paper';
import { View, Text } from 'react-native';
const Drawer = createDrawerNavigator();

function DrawerNavigator(props) {
    const userData = useSelector((state) => state.HomeReducer.userData)
    const [userDataState, setUserData] = useState(userData)

    useEffect(() => {
        setUserData(userData)
    }, [userData])

    const CustomDrawerContent = (props) => {
        return (
            <DrawerContentScrollView {...props}>
                <View style={{ justifyContent: "center", alignItems: "center", width: "100%", marginBottom: 10, marginTop: 10 }}>
                    <Avatar.Icon size={80} icon="account" color="#fff" style={{ backgroundColor: "rgba(41, 182, 246, 0.3)" }} />
                    <Subheading>{userDataState.Nom}</Subheading>
                    <Text>{userDataState.Prenom}</Text>
                </View>
                <DrawerItemList {...props} activeBackgroundColor="rgba(41, 182, 246, 0.3)" activeTintColor="#000" />
            </DrawerContentScrollView>
        );
    }

    return (
        <Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Ajouter demande d'aide" component={AddHelpRequest} />
            <Drawer.Screen name="Liste des demandes d'aide" component={HelpRequestList} />
            <Drawer.Screen name="Mes demandes" component={MyHelpRequestList} />
            <Drawer.Screen name="Profil" component={Profile} />
            <Drawer.Screen name="Se déconnecter" component={Logout} />
        </Drawer.Navigator >
    );
}
export default DrawerNavigator
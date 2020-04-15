/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/Navigation/MainNavigator';
import store from './src/redux/Store'

const App: () => React$Node = () => {

  
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </Provider>
    </>
  );
};


export default App;

import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomNavigation } from 'react-native-paper';
import {useState} from 'react'
import BottomNavi from './Components/BottomNavi';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Lock from './Home/Lock';
import Main from './Home/Main';
import { PaperProvider } from 'react-native-paper';
import { StyleSheet } from "react-native"

const Stack = createStackNavigator()

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <BottomNavi/>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;

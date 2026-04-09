import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, Image, TouchableOpacity,Text,FlatList} from 'react-native';
import React, { useState } from 'react';
import Table from './components/Table';
import Login from './components/Login';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function App() {
  const BottomTabs = createBottomTabNavigator();
  return (
        <BottomTabs.Navigator>
          <BottomTabs.Screen name="Login" component={Login}/>
          <BottomTabs.Screen name="Profile" component={Profile} />   
          <BottomTabs.Screen name="Dashboard" component={Dashboard}/>
        </BottomTabs.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingTop: 40
  },
  textinput: {
    height: 40,
    width: '90%',
    maxWidth:500,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10
  },
  imagesize: {
  width: '80%',
  height: 100,          
  resizeMode: 'contain',
  marginVertical: 40
  },
  buttonstyle: {
  height: 40,
  paddingHorizontal: 15,
  backgroundColor: '#4285F4',
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center'
},
buttonText: {
  color: '#fff',
  fontSize: 14
}
});



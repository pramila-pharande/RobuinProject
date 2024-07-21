import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import HomeScreen from '../HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



const Stack = createNativeStackNavigator();

const RootNavigation = (props) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen"  screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      
     
       
      </Stack.Navigator>
  )
}

export default RootNavigation

const styles = StyleSheet.create({})
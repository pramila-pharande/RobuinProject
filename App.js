import { StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootNavigation from './src/Screens/Navigator/RootNavigation'
import FlashMessage from 'react-native-flash-message'



const App = (props) => {
  return (
    <NavigationContainer>
      <RootNavigation/>
      <FlashMessage position="top" />
   </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})
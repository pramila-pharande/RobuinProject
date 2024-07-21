import { SafeAreaView, StyleSheet, Text, View, Dimensions, TextInput,ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderComponent from './Components/HeaderComponent'
import ButtonComponent from './Components/ButtonComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';

const { width, height } = Dimensions.get('window');

const HomeScreen = (props) => {

  const [Inputtxt, setInputtxt] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
const [Loader, setLoader] = useState(false);

  useEffect(() => {
  
    const loadLastErrorMessage = async () => {
      try {
        const lastError = await AsyncStorage.getItem('lastErrorMessage');
        if (lastError !== null) {
          setErrorMessage(lastError);
        }
      } catch (error) {
        console.error('Load fail:', error);
      }
    };

    loadLastErrorMessage();
  }, []);



  const APIFunction = async () => {
   
    const timeoutValue = parseInt(Inputtxt, 10); 

    if (isNaN(timeoutValue) || timeoutValue <= 0) {
      setErrorMessage('Please enter a valid timeout value.');
      return;
    }

    setLoader(true);

    setTimeout(async () => {
      try {
        const source = axios.CancelToken.source();
        const timeout = setTimeout(() => {
          source.cancel('Request timed out');
        }, timeoutValue * 1000); 

        

        const response = await axios.get('https://jsonplaceholder.typicode.com/photos', {
          cancelToken: source.token,
          timeout: timeoutValue * 1000 
        });

        clearTimeout(timeout);

        if (response.status !== 200) {
          throw new Error(`HTTP status ${response.status}`);
        }

        console.log('*****************', timeoutValue);
        const data = response.data;
        console.log('API RESPONSE------:', data);
        setErrorMessage(''); 
        setInputtxt('')
        showMessage({
          message: "Welcome to Robu.in",
          type: "success",
        });
      } catch (error) {
        const errorMsg = axios.isCancel(error) ? `Request timed out for  ${timeoutValue} seconds` : error.message;
        setErrorMessage(errorMsg);
        console.log(error, '================');
        await AsyncStorage.setItem('lastErrorMessage', errorMsg);
        showMessage({
          message: errorMsg,
          type: "danger",
        });
      }finally{
        setLoader(false);

      }
    }, timeoutValue *1000); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent />
      <View style={styles.outerview}>

        <View style={styles.searchbox}>
          <TextInput
            value={Inputtxt}
            placeholder="Enter the time"
            placeholderTextColor={'#959595'}
            style={styles.input}
            maxLength={250}
            onChangeText={ setInputtxt}
            keyboardType="numeric"
          />
        </View>
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        <ButtonComponent title={Loader ? <ActivityIndicator color="#fff" /> : "SUBMIT"} Action={() => {APIFunction()}} />

      </View>

    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  outerview: {
    flexGrow: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchbox: {
    backgroundColor: '#e2e2e2',
    width: width * 0.9,
    borderRadius: 12,
    justifyContent: 'center',
    padding: 8
  },
  input: {
    backgroundColor: '#e2e2e2',
    fontSize: 14,
    paddingVertical: 2,
    width: width * 0.8,
    color: '#000'
  },
  errorText:{
    color:'red',
    fontSize:10,
    fontWeight:'400',
    marginTop:5
  }
})
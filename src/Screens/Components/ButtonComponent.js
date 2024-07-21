import { StyleSheet, Text,Dimensions,TouchableOpacity } from 'react-native'
import React from 'react'


const { width, height } = Dimensions.get('window');

const ButtonComponent = (props) => {
    return (
        <TouchableOpacity style={styles.btnstyle} onPress={props?.Action}>
            <Text style={styles.submitetxt}>{props?.title}</Text>
        </TouchableOpacity>
    )
}

export default ButtonComponent

const styles = StyleSheet.create({
    btnstyle: {
        backgroundColor: '#ff6600',
        borderRadius: 8,
        width: width * 0.3,
        alignItems: 'center',
        marginVertical: 20,
        paddingVertical: 8,
      },
      submitetxt: {
        color: '#000',
        fontSize: 14,
        fontWeight: '800',
      },
})
import { StyleSheet, Text, View ,Dimensions,TouchableOpacity} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';


const { width, height } = Dimensions.get('window');

const HeaderComponent = (props) => {
  return (
      <View style={styles.headertyle}>
          <TouchableOpacity> 
          <Icon name={'reorder-three'} size={22} color={'#ff6600'} />
          </TouchableOpacity>
          <Text style={styles.txtstyle}>Home</Text>
          
             
      </View>
  )
}

export default HeaderComponent

const styles = StyleSheet.create({
    headertyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width * 0.54,
        marginTop:12,
        marginHorizontal:10
    },
    txtstyle:{
        color:'#000',
        fontWeight:'700',
        fontSize:16
    }
    

})
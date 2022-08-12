import { BaseNavigationContainer } from '@react-navigation/native';
import React from 'react'
import { Text, View ,StyleSheet,TouchableOpacity} from 'react-native';

function TestDashBoard({navigation, route}) {

    const backHandler = ()=>{
        navigation.goBack();
    }

    const {status,auth_token} = route.params;

  return (
    <View style={styles.screen}>
        <View style={styles.container}>
            <Text style={styles.text}>Hi! </Text>
            <Text numberOfLines={2} style={styles.text}>{auth_token}</Text>
            <Text style={styles.text}>{status} </Text>

        </View>
        <TouchableOpacity style={styles.login_btn} onPress={backHandler}>
          <Text style={styles.login_button_text} >Back button</Text>
        </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:"center",
        alignItems:'center'
    },
    container:{
        justifyContent:"center",
        alignItems:"center",
        width: 250,
        height:300,

    },
    text:{
        flex:1,
        padding : 15,
        fontSize: 15,
    }
    
})
export default TestDashBoard
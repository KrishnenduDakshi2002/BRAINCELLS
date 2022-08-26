import React from 'react'
import { View,StyleSheet, useWindowDimensions,Text,Image } from 'react-native'

function sample() {

    const {styles} = useStyle();
  return (
     <View style={styles.container}>
        <Text>
            Hellow
        </Text>
     </View>
  )
}


const useStyle= ()=>{
    const styles = StyleSheet.create({
        container:{
            width : width/1.3,
            height: height/1.6,
            justifyContent:"center",
            alignItems:"center",
            backgroundColor:"yellow",
            marginTop: 20,
            padding: 20,
            borderRadius:25
        }
        
    })

    return {styles}

}



export default sample
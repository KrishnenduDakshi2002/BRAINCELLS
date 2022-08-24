import React from 'react'
import { View,StyleSheet, Text } from 'react-native'

import {Video} from 'expo-av';


function video() {
    const {styles} = useStyle();
  return (
    <View style={styles.container}>

    <Text>Video player</Text>
    <Video
	   source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
	   shouldPlay
	   resizeMode="cover"
	   style={{ width, height: 300 }}
	  />
    </View>
  )
}

const useStyle = ()=>{

    const styles = StyleSheet.create({
        container :{
            flex:1,
            justifyContent:"center",
            alignItems:"center"
        }
        
    })

    return {styles};
}

export default video
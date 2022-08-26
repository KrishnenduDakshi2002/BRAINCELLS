import React from 'react'
import { View,StyleSheet, Text } from 'react-native'

import {Video} from 'expo-av';


function VideoPlayer() {
    const {styles} = useStyle();
  return (
    <View style={styles.container}>

    <Text>Video player</Text>
    <Video
	   source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
	   shouldPlay
	   resizeMode="contain"
       useNativeControls
       isLooping
	   style={{ width:300, height: 300 }}
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

export default VideoPlayer
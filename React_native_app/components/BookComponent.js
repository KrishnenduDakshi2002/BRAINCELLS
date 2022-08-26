import React from 'react'
import { View,StyleSheet, useWindowDimensions,Text,Image } from 'react-native'

function BookComponent(props) {
    const {styles }= useStyle();
  return (
    <View style={styles.container}>
     <View style={styles.imageContainer}>
        <Image
        resizeMethod='auto'
        style={styles.image}
        source= {props.image}
        />
     </View>
     <View style={styles.detailsContainer}> 

     <Text style={styles.text1}>{props.text1}</Text>
     <Text style={styles.text2}>{props.text2}</Text>
     <Text style={styles.text3}>{props.text3}</Text>
     <Text style={styles.text4}>{props.text4}</Text>

     </View>
    </View>
  )
}

const useStyle = ()=>{

    const {width,height }= useWindowDimensions();
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
        },
        imageContainer:{
            flex:0.7,
            width: width/1.5,
            justifyContent:"center",
            alignItems:"center",
            paddingBottom:10
        },
        image:{
            width: width/2,
            height:'100%'
        },

        detailsContainer:{
            flex:0.3,
            backgroundColor:"green",
            width: width/1.5,
            borderRadius: 20,
            justifyContent:"center",
            paddingLeft: 15
        },
    })

    return {styles}
}

export default BookComponent
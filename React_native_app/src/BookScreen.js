import React from 'react'
import { View,StyleSheet, useWindowDimensions,Text, ScrollView,StatusBar } from 'react-native'

import BookComponent from '../components/BookComponent';


function BookScreen() {
    const {styles }= useStyle();
  return (
    <View style={styles.container}>

    <ScrollView 
    showsVerticalScrollIndicator={false}
    >
        <BookComponent
        image = {require('../assets/BookSampleImage.jpg')}
        text1= {'DC pandey physics book'}
        text2= {'This is a description'}
        text3= {'Rating'}
        text4= {'provided by person1'}
        />
        <BookComponent
        image = {require('../assets/BookSampleImage.jpg')}
        text1= {'DC pandey physics book'}
        text2= {'This is a description'}
        text3= {'Rating'}
        text4= {'provided by person1'}
        />
        <BookComponent
        image = {require('../assets/BookSampleImage.jpg')}
        text1= {'DC pandey physics book'}
        text2= {'This is a description'}
        text3= {'Rating'}
        text4= {'provided by person1'}
        />
        <BookComponent
        image = {require('../assets/BookSampleImage.jpg')}
        text1= {'DC pandey physics book'}
        text2= {'This is a description'}
        text3= {'Rating'}
        text4= {'provided by person1'}
        />
  
    </ScrollView>
    </View>
  )
}

const useStyle = ()=>{

    const {width,height }= useWindowDimensions();
    const styles = StyleSheet.create({
        container:{
            flex:1,
            justifyContent:"center",
            alignItems:"center",
            marginTop: StatusBar.currentHeight
        }
    })

    return {styles}
}

export default BookScreen
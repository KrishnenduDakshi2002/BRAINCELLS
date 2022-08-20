import React from 'react'
import { Text, View , StyleSheet, ScrollView} from 'react-native'

//importing classc component

import DiscussionComponent from '../../components/DiscussionComponent';

// IMPORTING THE TODAY CLASS ARRAY FROM CLASS TAB


  

function Discussion() {

    const {styles} = useStyle();
  return (
    
    <ScrollView 
    contentContainerStyle={styles.container}
    showsVerticalScrollIndicator = {false}
    >
      <DiscussionComponent/>

    </ScrollView>
  )
}


const useStyle = ()=>{

    const styles = StyleSheet.create({
      container:{
        padding: 25,
        paddingRight : 25
      }
    })
  
    return {styles}
  }
  
  

export default Discussion
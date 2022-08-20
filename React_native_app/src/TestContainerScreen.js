import React from 'react'
import { Text, View , StyleSheet, ScrollView,Pressable, RefreshControl} from 'react-native'

//importing classc component
import ClassComponent from '../components/ClassComponent';


import { AntDesign} from '@expo/vector-icons';

// IMPORTING THE TODAY CLASS ARRAY FROM CLASS TAB


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


function TestContainer() {

    const {styles} = useStyle();
    const [refreshing, setRefreshing] = React.useState(false);

    

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      
      wait(2000).then(() => setRefreshing(false));
    }, []);





  return (
    <>
    <ScrollView 
    contentContainerStyle={styles.container}
    showsVerticalScrollIndicator = {false}
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    }
    >
        
        <ClassComponent/>

    </ScrollView>
    <Pressable style={styles.floating_button} onPress={()=> {
        

      }
        }>
      <AntDesign name="pluscircle" size={55} color="black" />
      </Pressable>
  
    
    </>
  )
}


const useStyle = ()=>{

    const styles = StyleSheet.create({
      container:{
        padding: 25,
        paddingRight : 25
      },
      floating_button:{
        position:"absolute",
        bottom: 80,
        right : 50,
        backgroundColor:"white",
        borderRadius: 50
      }
    })
  
    return {styles}
  }
  
  

export default TestContainer
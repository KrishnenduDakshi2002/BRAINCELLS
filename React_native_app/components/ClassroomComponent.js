import React from 'react';

import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const ClassroomComponent = (props) => {
    const {styles}= useStyle();

    console.log('hello', props.route, props.role);
  return (
    <Pressable onPress={props.onPressClassroom}>
    <View style={[styles.container,{...props.style}]}>
        {/* <View style={styles.imageContainer}>
            <Pressable onPress={props.clickTocopyClickBoard}>
            <Image source={require('../assets/Classroom.png')} style={{height:50,width:50}}/>

            </Pressable>
        </View> */}
        <View style={styles.details}>
            <Text style={styles.topic}>{props.title}</Text>
            <Text style={styles.subject}>{props.subject}</Text>
        </View>
        <View style={styles.icon}>
        {props.role === "TEACHER" && (
            <Pressable onPress={props.onPressDelete}>
                {/* <Image source={require('../assets/dustbin.png')} style={{width:30,height:30,marginRight:10}}/> */}
                <Ionicons name='trash-outline' color='red' size={18}/>
            </Pressable>
        )}
        </View>
    </View>

    </Pressable>
  );
};


const useStyle = ()=>{
    
    const {height, width} = useWindowDimensions();
    const styles = StyleSheet.create({
        container:{
            flexDirection:'row',
            width : '100%',
            borderRadius: 6,
            marginBottom: 10,
            paddingVertical: 4,
            backgroundColor:"#04cc7522"
        },
        imageContainer:
        {
            justifyContent:"center",
            alignItems:"center",
            paddingLeft:10,
            justifyContent:"center",
            alignItems:"center"
        
        }
        ,
        icon:{
            flex:0.1,
            alignItems:"center",
            paddingTop: 10
        },
        details:{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
            paddingLeft:20,
            // backgroundColor:"pink"
            
        },
        topic:{
            marginTop:10,
            width:'100%',
            fontSize: 18,
            marginBottom : 10,
            color:"black"
        },
        subject:{
            width:'100%',
            fontSize: 14,
            marginBottom : height/70,
            color:"#6e6e6e"
        },
        teacher:{
            
            width:'100%',
            fontSize: height/50,
            marginBottom : height/70,
        },
        dateTime:{
            
            width:'100%',
            fontSize: height/50,
            marginBottom : height/70,
        }
        
    })

    return {styles};

}

export default ClassroomComponent;

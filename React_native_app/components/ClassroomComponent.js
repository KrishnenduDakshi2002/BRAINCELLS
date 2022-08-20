import React ,{useState}from "react";

import { Text,
    View,
    StyleSheet, 
    useWindowDimensions ,
    Pressable,
    TouchableWithoutFeedback,
    ImageBackground,
    Image

} from "react-native";


import { Entypo } from '@expo/vector-icons';





const ClassroomComponent = (props) => {
    const {styles}= useStyle();

  return (
    <Pressable onPress={props.onPressClassroom}>
    <View style={[styles.container,{...props.style}]}>
        <View style={styles.imageContainer}>
            <Pressable onPress={props.clickTocopyClickBoard}>
            <Image source={require('../assets/Classroom.png')} style={{height:50,width:50}}/>

            </Pressable>
        </View>
        <View style={styles.details}>
            <Text style={styles.topic}>{props.title}</Text>
            <Text style={styles.subject}>{props.subject}</Text>
        </View>
        <View style={styles.icon}>
            <Pressable onPress={props.onPressDelete}>
                <Image source={require('../assets/dustbin.png')} style={{width:30,height:30,marginRight:10}}/>
            </Pressable>
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
            height : width/3.5,
            borderRadius: 25,
            marginBottom: 15,
            backgroundColor:"#04cc75"
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
            fontSize: height/45,
            fontWeight :"bold",
            marginBottom : 5,
            color:"black"
        },
        subject:{
            
            width:'100%',
            fontSize: height/50,
            marginBottom : height/70,
            color:"#242121"
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

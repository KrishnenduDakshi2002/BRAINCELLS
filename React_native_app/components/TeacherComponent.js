import React from "react";

import { Text,
    View,
    StyleSheet, 
    useWindowDimensions ,
    Pressable,
    TouchableWithoutFeedback,
    Image

} from "react-native";


import { Entypo } from '@expo/vector-icons';

const TeacherComponent = (props) => {
    const {styles}= useStyle();
  return (
    
    <View style={styles.container}>
        <View style={{justifyContent:"center",alignItems:"center", marginRight: 15}} 
        
        >
            <View style={styles.icon}>
                <Image source={require('../assets/user.png')} style={{width:50, height:50}}/>
            </View>
        </View>
        <View style={styles.details}>
            <Text style={styles.name}>{props.name}</Text>
            <Text style={styles.email}>{props.email}</Text>
        </View>
        
    </View>
  );
};


const useStyle = ()=>{
    
    const {height, width} = useWindowDimensions();
    const styles = StyleSheet.create({
        container:{
            flexDirection:'row',
            backgroundColor: "yellow",
            width : '100%',
            height : width/4,
            padding: 15,
            borderRadius: 25,
            marginBottom: 15
        },
        icon:{
            flex:0.3,
            alignItems:"center",
            paddingTop: 10,
            // backgroundColor:"dodgerblue",
            justifyContent:"center",
            alignItems:"center"
        },
        details:{
            flex:1,
            justifyContent:'center',
            alignItems:'center'
            
        },
        name:{
            width:'100%',
            fontSize: height/45,
            fontWeight :"bold"
        },
        email:{
            width:'100%',
            fontSize: height/45
        },
    
        
    })

    return {styles};

}

export default TeacherComponent;

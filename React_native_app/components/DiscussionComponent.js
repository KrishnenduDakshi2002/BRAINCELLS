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

const DiscussionComponent = (props) => {
    const {styles}= useStyle();
  return (
    
    <View style={styles.container}>
        <Pressable style={{justifyContent:"center",alignItems:"center", marginRight: 15}} 
        onPress={()=>console.log("Pressed material")}
        >
            <View style={styles.icon}>
                <Image source={require('../assets/forum.png')} style={{width:50, height:50}}/>
            </View>
        </Pressable>
        <View style={styles.details}>
            <Text style={styles.topic}>{props.topic}</Text>
            <Text style={styles.provided_by}>{props.provided_by}</Text>
            <Text style={styles.dateTime}>{props.dateTime}</Text>
        </View>
        
    </View>
  );
};


const useStyle = ()=>{
    
    const {height, width} = useWindowDimensions();
    const styles = StyleSheet.create({
        container:{
            flexDirection:'row',
            backgroundColor: "#04cc75",
            width : '100%',
            height : width/2.5,
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
            alignItems:'center',
            // backgroundColor:"pink"
            
        },
        topic:{
            marginTop:10,
            width:'100%',
            fontSize: height/45,
            fontWeight :"bold",
            marginBottom : height/50
        },
        
        provided_by:{
            
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

export default DiscussionComponent;

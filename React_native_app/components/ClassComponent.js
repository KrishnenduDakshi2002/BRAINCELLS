import React from "react";

import { Text,
    View,
    StyleSheet, 
    useWindowDimensions ,
    Pressable,
    TouchableWithoutFeedback,
    Image

} from "react-native";

import moment  from "moment";

import { Entypo } from '@expo/vector-icons';

const ClassComponent = (props) => {
    const {styles}= useStyle();
  return (
    <View style={[styles.container,{...props.style}]}>
        <View style={styles.class_icon}>
        <Image source={require('../assets/book.png')} style={{width:45, height:45}}/>

        </View>
        <View style={styles.details}>
            <Text style={styles.topic}>{props.topic}</Text>
            <Text style={styles.teacher}>{props.teacher}</Text>
            <Text style={styles.dateTime}>{moment(props.dateTime).calendar()}</Text>
        </View>

        {/* <View style={styles.icon}>
            <TouchableWithoutFeedback onPress={props.onPressFunction}>
                <Entypo name="dots-three-vertical" size={18} color="black" />
            </TouchableWithoutFeedback>  
    
        
        </View> */}
        
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
            height : width/2.3,
            padding: 15,
            borderRadius: 25,
            marginBottom: 15,
            alignItems:'center'
        },
        icon:{
            flex:0.1,
            alignItems:"center",
            paddingTop: 10,
            justifyContent:"flex-start"
        },
        class_icon:{
            backgroundColor:'yellow',
            borderRadius:50,
            marginRight:15,
            width: width/6,
            height: width/6,
            justifyContent:'center',
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
        subject:{
            
            width:'100%',
            fontSize: height/50,
            marginBottom : height/70,
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

export default ClassComponent;

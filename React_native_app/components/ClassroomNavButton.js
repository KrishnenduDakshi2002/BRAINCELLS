import React from "react";

import { Text,
    View,
    StyleSheet, 
    useWindowDimensions ,
    TouchableWithoutFeedback,

    Pressable,
} from "react-native";


const ClassroomNavButton = (props) => {
    const {styles}= useStyle();
  return (
    <Pressable style={styles.button} onPress={props.onPressFunction}>
        <Text style = {styles.text}>{props.text}</Text>
    </Pressable>
  );
};


const useStyle = ()=>{
    
    const {height, width} = useWindowDimensions();
    const styles = StyleSheet.create({

        button:{
            backgroundColor:"white",
            justifyContent:"center",
            alignItems:"center",
            marginTop:15,
            marginBottom:15,
            marginRight : 10,
            height : height/20,
            width : width/3,
            borderRadius : 50
        },
        text:{
            fontWeight:"bold",
        }
    })

    return {styles};

}

export default ClassroomNavButton;

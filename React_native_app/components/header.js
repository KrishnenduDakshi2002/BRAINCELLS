import React from "react";

import { Text, View, StyleSheet, useWindowDimensions, ScrollView } from "react-native";


import ClassroomNavButton from "./ClassroomNavButton";

const ClassroomHeader = (props) => {
    const {styles}= useStyle({...props.style});
  return (
    <View name="header" style={[styles.header,{...props.style}]}>
      <View name="classroom Details" style={styles.description}>
        <Text>Classroom</Text>
      </View>
    </View>
  );
};


const useStyle = (style)=>{
    
    const {height, width} = useWindowDimensions();
    const styles = StyleSheet.create({

        header:{
            flex: style.flex,
            width: width,
            height: height/3.5,
            backgroundColor:"yellow",
            justifyContent:"center",
            alignItems:"center"
        },
        description:{
            flex:1,
            backgroundColor:"#f75200",
            width : width,
            justifyContent:"center",
            alignItems:"center"
        },
        scrollContainer:{
            flex:0.4
        },
        scrollViewContainer:{
            backgroundColor :"blue",
            justifyContent:"center",

        },
        
    })

    return {styles};

}

export default ClassroomHeader;

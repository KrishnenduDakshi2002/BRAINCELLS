import React, { Component, useState,useEffect } from "react";
import {
    Image,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  useWindowDimensions,
  ImageBackground,
  StatusBar,
  TouchableWithoutFeedback,
  Dimensions,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useRoute,useNavigation } from '@react-navigation/native';

// import { Dropdown } from "react-native-element-dropdown";

import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
// import { BaseNavigationContainer , DefaultTheme, DarkTtheme, useTheme  } from '@react-navigation/native';
// import { render } from "react-dom";


function UserDashBoard() {

  // Navigation
  const navigation = useNavigation();
  const route = useRoute();


  const onClickClassRoom = (data) => {
    navigation.navigate("ClassroomsContainer",data);
  };


 const [dashboard_res, setDashboard_res] = useState([]);

  useEffect(() => {
    console.log("Running useeffect");

        fetch('https://akshar-siksha.herokuapp.com/api/data/get/user/dashboard',{
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization' : 'Bearer '+ (route.params.auth_token)
            }
          })
          .then((response) => response.json())
          .then((data)=> setDashboard_res(data))

  }, [])

let user_details ={}
if(dashboard_res.User){

  if('Student_id' in dashboard_res.User){
    user_details = dashboard_res.User.Student_id;
  }else if('Teacher_id' in dashboard_res.User){
    user_details = dashboard_res.User.Teacher_id;
  }

}


  return (

   <>
   {
     dashboard_res.User &&
      <ImageBackground
      // source={require("../assets/leaves.jpg")}
      style={{ height: Dimensions.get("screen").height / 1 }}
    >
        {/* <StatusBar hidden/> */}
      <KeyboardAwareScrollView
        style={styles.container}
        contentOffset={{ x: 0, y: 24 }}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: 0 ,paddingBottom: 50 }}
        contentInsetAdjustmentBehavior="always"
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraHeight={32}
        extraScrollHeight={Platform.OS == "android" ? 32 : 0}
        enableResetScrollToCoords={false}
        // onKeyboardDidShow={this._keyboardDidShowHandler}
      >
        <View style={styles.container}>
          <View style={styles.header}>
          {/* <Image style={styles.headerimg} source={{uri: 'https://img.freepik.com/free-vector/education-horizontal-typography-banner-set-with-learning-knowledge-symbols-flat-illustration_1284-29493.jpg?w=1380&t=st=1660630467~exp=1660631067~hmac=f124e774ad58e89e82354d29cfe0ab5f25b8310bb88f72ad6273271508074560'}}/> */}
          </View>
          {/* <Image style={styles.avatar} source={require('../assets/user.png')}/> */}
          <Image style={styles.avatar} source={{uri: 'https://img.freepik.com/premium-vector/laughing-boy-avatar-funny-kid-profile-picture_176411-3537.jpg?w=740'}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              
                <View>
                <Text style={styles.name}>{
                    user_details.first_name + " "+ user_details.last_name
                }</Text>
                </View>
                <View>
                  
                <Text style={styles.info}>{user_details.role}</Text> 
                </View>
                <View>
                  
                <Text style={styles.description}>{'Institute : '+ user_details.institute}</Text>
                
                <Text style={styles.description}>{user_details.address}</Text>
                
                <Text style={styles.description}>{'Class : '+ dashboard_res.User.Class}</Text>
                </View>
            </View>
          </View>
          <View style={styles.foot}>
            <View style={styles.footContent}>
                <View style={styles.CategoryGroup}>
                <TouchableOpacity style={styles.buttonContainer1} onPress={()=>{

                    // NAVIGATING TO CLASSROOMCONTAINER  PASSING ONLY AUTH TOKEN

                    navigation.navigate("ClassroomsContainer",{"auth_token": route.params.auth_token,"role":user_details.role});


                }} >
                <View style={styles.CategoryContainer}>
                <MaterialCommunityIcons name="google-classroom" size={75} color="#F4F9F4" />
                <Text style={styles.CategoryText}>Class Room</Text>  
                </View>
              </TouchableOpacity> 
                          
              <TouchableOpacity style={styles.buttonContainer2} onPress={()=>{}}>
              <View style={styles.CategoryContainer}>
              <MaterialIcons name="schedule" size={75} color="#FF467E" />
                <Text style={styles.CategoryText}>Test Schedule</Text> 
                </View>
              </TouchableOpacity>
              </View>
              
              <View style={styles.Grp2}>
              <TouchableOpacity style={styles.buttonContainer3} onPress={()=>{}}>
              <View style={styles.CategoryContainer}>
              <AntDesign name="barschart" size={75} color="#00ADB5" /> 
                <Text style={styles.CategoryText}>Achievements</Text> 
                </View>
              </TouchableOpacity>              
              <TouchableOpacity style={styles.buttonContainer4} onPress={()=>{}}>
              <View style={styles.CategoryContainer}>
              <MaterialIcons name="settings" size={75} color="#443737" />
                <Text style={styles.CategoryText}>Settings</Text> 
                </View>
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
   }
   
   </>
   
  );
}

const styles = StyleSheet.create({
    header:{
      backgroundColor: "#FF9933",
      height:200,
    },
    headerimg: {
        height: 200,
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "white",
      marginBottom:10,
      alignSelf:'center',
      position: 'absolute',
      marginTop:130
    },
    name:{
      fontSize:22,
      color:"#FFFFFF",
      fontWeight:'600',
    },
    body:{
      marginTop:40,
    },
    bodyContent: {
      flex: 1,
      alignItems: 'center',
      padding:30,
    },
    name:{
      fontSize:28,
      color: "#696969",
      fontWeight: "600"
    },
    info:{
      fontSize:16,
      color: "#00BFFF",
      marginTop:10
    },
    description:{
      fontSize:16,
      color: "#696969",
      marginTop:10,
      textAlign: 'center'
    },
    footContent: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: "space-around",
      },
    buttonContainer1: {
      marginTop:10,
      height:150,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:150,
      borderRadius:30,
      backgroundColor: "#E4C9F9",
    },
    buttonContainer2: {
        marginTop:10,
        height:150,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:150,
        borderRadius:30,
        backgroundColor: "#CDF0EA",
      },
      buttonContainer3: {
        marginTop:10,
        height:150,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:150,
        borderRadius:30,
        backgroundColor: "#F2D7D9",
      },
      buttonContainer4: {
        marginTop:10,
        height:150,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:150,
        borderRadius:30,
        backgroundColor: "#F9EBC8",
      },
    CategoryContainer: {
        alignItems: 'center',
    },
    CategoryText: {
      fontSize: 16,
    }
  });

  export default UserDashBoard

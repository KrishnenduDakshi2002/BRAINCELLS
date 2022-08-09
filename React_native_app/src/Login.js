import React ,{useState,useRef,useEffect} from "react";

// NAVIGATION IMPORT

import {
  CurrentRenderContext,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//NATIVE COMPONENTS IMPORT

import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ImageBackground,
  useWindowDimensions,
  StatusBar,
  Image,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
  Keyboard,
} from "react-native";

// ICONS IMPORT

import { Ionicons, MaterialCommunityIcons,Entypo, } from "@expo/vector-icons";



const Stack = createNativeStackNavigator();



//USE KEYBOARD HEIGHT HOOK

function useKeyboardHeight() {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', e => setKeyboardHeight(e.endCoordinates.height));
    const hideSubscription = Keyboard.addListener('keyboardWillHide', () => setKeyboardHeight(0));
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    }
  }, [setKeyboardHeight]);

  return keyboardHeight;
}





function Login({ navigation }) {

  // STYLES
  const { styles } = useStyle();

  // PASSWORD VISIBILITY
  const [passwordVisible, setPasswordVisible] = useState(true);

  // NAVIGATION
  const onPressHandler = () => {
    navigation.navigate("Registration");
  };

  //KEYBOARD STATUS
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);

  // get keyboard height
  const keyboardHeight = useKeyboardHeight();


  //KEYSTATUS FUNCTION
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard_Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard_Hidden");
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

   // ANIMATIONS

   const translate_value = useState(new Animated.Value(0))[0];

   // TIMING ANIMATION

   // ----- animations for keyboard out -----

   const screen_height = Dimensions.get('screen').height;
   const translate_animation_up = Animated.timing(translate_value,{toValue:-keyboardHeight+20,delay:10,useNativeDriver: true});
   const translate_animation_down = Animated.timing(translate_value,{toValue:1,delay:10,useNativeDriver: true});


  // RUNNING KEYBOARD ANIMATIONS and RESACLING WITH TRANSLATION
   if(keyboardStatus === 'Keyboard_Hidden'){
    translate_animation_down.start();

  } 
  else if(keyboardStatus == 'Keyboard_Shown')
  {
    translate_animation_up.start();

   } 


   

  //  GETTING THE DATA FROM TEXT INPUT

   const [Data, setData] = useState({
    email : '',
    password : ''
   })


   // SUBMITTING LOGIN INFORMATION
  const submitLoginInfo = ()=>{
    console.log(Data.email);
    console.log(Data.password);
  
  }




  return (
    <ImageBackground
      source={require("../assets/leaves.jpg")}
      style={{ height: Dimensions.get("screen").height / 1 }}
    >
      {/* Icon and back arrow  */}
      <View name={"back arrow icon text"}  style={styles.icon_text_container}>
        
          <View name={"arrow container"} style={styles.arrow_container}>
            <Ionicons name="chevron-back" size={32} color="white" />
          </View>
          <View name={"icon container"} style={styles.icon_container}>
            
            <Animated.View style={[styles.icon]}>
              <MaterialCommunityIcons name="flower-tulip" size={100} color="white" />
            </Animated.View>
          </View>

      </View>

      {/* Main login container */}
      <Animated.View style={[styles.login_container,{transform:[{translateY : translate_value}]}]}>
        {/* Email and password */}
        <View name ={"login form"} 
                      style={[styles.login_form_container]}>

          {/* Login text */}

          <View name={"Login text"} style={styles.login_text_container}>
            <Text style={styles.login_text}>Login</Text>
          </View>


          <View name={"email and password container"} style={styles.email_pass_container}>
            {/* Email id input  */}
            <View name={"Email contrainer"} style={styles.email_container}>
              <TextInput style={styles.email_input}
                                value={Data.email}
                                onChangeText={(emailAddress)=>setData({...Data,email:emailAddress})}
                                placeholder="Enter email address"
                                placeholderTextColor={"lightgrey"}
                                keyboardType={'default'}/>
            </View>

            {/* Password input and icon for view password */}
          
            {/* Password input */}
            <View name={"password input"} style={styles.password_container} >
              <TextInput style={styles.password_input}
                              onChangeText={(password) => setData({...Data,password : password})}
                              placeholder="Enter password "
                              placeholderTextColor={"lightgrey"}
                              secureTextEntry={passwordVisible}        
              />
            {/* Icon  */}
              <TouchableWithoutFeedback onPress={()=>{setPasswordVisible(!passwordVisible)}}>
                <Ionicons name={passwordVisible ? "eye":"eye-off"} size={24} color="black" />
              </TouchableWithoutFeedback>
            </View>

            {/* Forgot password button */}
            <TouchableWithoutFeedback>
              <Text style={{color:"#28800b"}}>Forgot Password</Text>
            </TouchableWithoutFeedback>

          </View>

        </View>

        {/* Login and register button */}
        <View name={"Login and sign up"} style={[styles.login_signup_btn_container]}>
        <TouchableOpacity style={styles.login_btn}>
          <Text style={styles.login_button_text} onPress={submitLoginInfo}>Login</Text>
        </TouchableOpacity>

        <View style={styles.register_button}>
            <Text>Not registered? </Text>
            <TouchableWithoutFeedback>
                <Text style={{color:"#28800b"}}>
                  Register Now
                </Text>
            </TouchableWithoutFeedback>
        </View>
        
        </View>

      </Animated.View>


    </ImageBackground>
  );
}

const useStyle = () => {
  // getting dimensions of screen
  const { height, width } = useWindowDimensions();

  const styles = StyleSheet.create({
    icon_text_container:{
      flex:1,
    },
    arrow_container:{
      flex:1,
      justifyContent:"center",
      paddingLeft:10
    },
    icon_container:{
      flex:1,
      justifyContent:"flex-start",
      alignItems:"center",
    },
    icon:{
    },

    // Login container
    login_container:{
      flex:1,
      borderTopLeftRadius:50,
      borderTopRightRadius:50,
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:"white"
    },

    //  Login form
    login_form_container:{
      flex:1,
      justifyContent:"space-around",
      paddingLeft:20,
      paddingRight:20,
    },
    login_text_container:{
      flex:0.4,
      justifyContent:"center",
      alignItems:"center"
      // backgroundColor:"red",

    },
    login_text:{
      fontSize: width / 15,
      fontWeight:'bold',
    },
    email_pass_container:{
      flex:1,
      justifyContent:"space-evenly",
      alignItems:"center",
    },

    // Email sectiton
    email_container:{
      width: width / 1.2,
      borderBottomWidth:1,
      borderBottomColor:"rgba(0,0,0,0.4)",
    },
    email_input:{
      fontSize: width/20,
      paddingLeft: 10,
      paddingBottom: 10,

    },
    // password container
    password_container:{
      flexDirection:"row",
      borderBottomWidth:1,
      borderBottomColor:"rgba(0,0,0,0.4)",
      width: width/1.2
    },
    password_input:{

      flex:2,
      fontSize: width / 20,
      paddingLeft: 10,
      paddingBottom: width / 60,

    },

    // login and register button
    login_signup_btn_container:{
      flex:0.7,
      alignItems : "center",
      // paddingTop : width / 12,
      // backgroundColor:"blue",
    },
    login_btn:{
      backgroundColor:"#20590d",
      justifyContent:"center",
      alignItems:"center",
      width : width / 1.2,
      height : height / 18,
      borderRadius: 100,
    },
    login_button_text:{
      fontSize: width / 25,
      fontWeight:"bold",
      color: "#fff"
    },
    register_button:{
      flexDirection:"row",
      margin: width / 30,
    },
  });

  return { styles };
};

export default Login;

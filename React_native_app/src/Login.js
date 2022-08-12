import React ,{useState,useRef,useEffect} from "react";

// NAVIGATION IMPORT
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
  Alert,
  Modal,
  Button
} from "react-native";

// ICONS IMPORT

import { Ionicons, MaterialCommunityIcons,Entypo,AntDesign, } from "@expo/vector-icons";


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




function Login({navigation}) {

  // NAVIGATION
  const onClickRegistration = () => {
    navigation.navigate("Registration");
  };

  // STYLES
  const { styles } = useStyle();


  //STATES
  // PASSWORD VISIBILITY
  const [passwordVisible, setPasswordVisible] = useState(true);


  //KEYBOARD STATUS
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);

  // get keyboard height
  const keyboardHeight = useKeyboardHeight();

  // required validation for email and password
  const [validate,SetValidate] = useState(true);


  // check for email or phoneNumber
  const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z]+[^a-zA-Z0-9]+[a-zA-Z]+/;
  const phoneRegex = /[0-9]{10}/;

  // Modal for alert
  const [modalVisible, setModalVisible] = useState(false);

  // Modal for forgot password
  const [forgotPassModal, setforgotPassModal] = useState(false);

  // Phone number input from forgot password modal
  const [resetEmailAddress, setResetEmailAddress] = useState("")


  //KEYBOARDSTATUS FUNCTION
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


  // RUNNING KEYBOARD ANIMATIONS 
   if(keyboardStatus === 'Keyboard_Hidden'){
    translate_animation_down.start();

  } 
  else if(keyboardStatus == 'Keyboard_Shown')
  {
    translate_animation_up.start();

   } 


  //  GETTING THE DATA FROM TEXT INPUT

   const [Data, setData] = useState({
    input:'',
    password : ''
   })

   // FUNCTIONALITY FUNCTIONS

   // forgot password button function
  const onClickForgotPass = ()=>{
    console.log("forgot pass");
    setforgotPassModal(!forgotPassModal);
  }

  const sendResetPassUrl = ()=>{
    //fetch api call 
    if(emailRegex.test(resetEmailAddress)){

      fetch('https://akshar-siksha.herokuapp.com/api/user/reset_password_url/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: resetEmailAddress
          })
        })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
        });
  
      setforgotPassModal(!forgotPassModal);
      
    }else{
      Alert.alert("Invalid input type");
    }
    

  }

  // SUBMITTING LOGIN INFORMATION TO THE SERVER THROUGH API

   // submitting data function
  const submitLoginInfo =  async()=>{
    if(Data.input ===""|| Data.password===""){
      SetValidate(false);
    }else{

      const Userpassword = Data.password;
      let userDataObject = {password:Userpassword}; // object for storing email or phone number

      if(emailRegex.test(Data.input)){
        userDataObject.email = Data.input; 

      }
      else if(phoneRegex.test(Data.input)){
        userDataObject.phoneNumber = Data.input
      }
      else{
        setModalVisible(!modalVisible);
        return;
      }


      /// fetch api call
      const login_json_response = await fetch('https://akshar-siksha.herokuapp.com/api/user/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userDataObject)
      })
      .then((response) => response.json());

      if("ErrorMessage" in login_json_response){
        Alert.alert("Error","User doesn't exists");
      }
      else if("auth_token" in login_json_response)
      {
        // we will pass auth toke to next secreen and this passing of token will go on
        console.log("Successful login");

        // Just for demo we are passing all the values to the next screen which is our 
        // Dashboard
        console.log(login_json_response);
          navigation.navigate("TestDashBoard",{
            status: login_json_response.status,
            id : login_json_response.id,
            auth_token : login_json_response.auth_token
        });
    
      }
    }
  }


  return (
    <ImageBackground
      source={require("../assets/leaves.jpg")}
      style={{ height: Dimensions.get("screen").height / 1}}
    >

    {/* Modal alert implemenation */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Invalid input</Text>
            <Pressable
              style={[ styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Okay</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    {/* Modal for forgot password implemenation */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={forgotPassModal}
      >
        <View style={styles.forgot_centeredView}>

          {/* when clicked forgot password button */}
          <View style={styles.forgot_modalView}>
            <TextInput onChangeText={(emailInput)=> setResetEmailAddress(emailInput)}
                        visible={true}
                        placeholder='Enter email address'
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholderTextColor={'lightgrey'}
                        style={styles.forgot_pass_input}/>
            <Pressable
              style={[ styles.forgot_buttonClose]}
              onPress={sendResetPassUrl}
            >
              <Text style={styles.textStyle}>Continue</Text>
            </Pressable>
            <Pressable
              style={[ styles.forgot_buttonClose,{backgroundColor:"#ad3b48"}]}
              onPress={()=>{setforgotPassModal(!forgotPassModal)}}
            >
              <Text style={[styles.textStyle]}>Close</Text>
            </Pressable>
          </View>


        </View>
      </Modal>



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
                                onChangeText={(inpData)=>{setData({...Data,input: inpData})}}
                                placeholder={(validate) ? "Enter email / Phone No. ":"required"}
                                placeholderTextColor={(validate)? "lightgrey" : "red"}
                                keyboardType={'default'}
                                autoCorrect={false}
                                autoCapitalize='none'/>
            </View>

            {/* Password input and icon for view password */}
          
            {/* Password input */}
            <View name={"password input"} style={styles.password_container} >
              <TextInput style={styles.password_input}
                              onChangeText={(password) => setData({...Data,password : password})}
                              placeholder={(validate) ? "Enter your password ":"required"}
                              placeholderTextColor={(validate)? "lightgrey" : "red"}
                              secureTextEntry={passwordVisible}
                              autoCorrect={false}
                              autoCapitalize='none' />
            {/* Icon  */}
              <TouchableWithoutFeedback onPress={()=>{setPasswordVisible(!passwordVisible)}}>
                <Ionicons name={passwordVisible ? "eye":"eye-off"} size={24} color="black" />
              </TouchableWithoutFeedback>
            </View>

            {/* Forgot password button */}
            <TouchableWithoutFeedback onPress={onClickForgotPass}>
              <Text style={{color:"#28800b"}}>Forgot Password</Text>
            </TouchableWithoutFeedback>

          </View>

        </View>


        {/* Login and register button */}
        <View name={"Login and sign up"} style={[styles.login_signup_btn_container]}>
        <TouchableOpacity style={styles.login_btn} onPress={submitLoginInfo}>
          <Text style={styles.login_button_text} >Login</Text>
        </TouchableOpacity>

        <View style={styles.register_button}>
            <Text>Not registered? </Text>
            <TouchableWithoutFeedback onPress={onClickRegistration}>
                <Text style={{color:"#28800b"}}>
                  Register Now
                </Text>
            </TouchableWithoutFeedback>
        </View>
        
        </View>

      </Animated.View>

    </ImageBackground >
  );
}

const useStyle = () => {
  // getting dimensions of screen
  const { height, width } = useWindowDimensions();

  const styles = StyleSheet.create({
    //Modal sytles
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      width: width /1.5,
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 25,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    buttonClose: {
      width: width/ 2.5,
      borderRadius: 20,
      padding:10,
      elevation: 2,
      backgroundColor: "red",
      marginTop:width/20,
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 15,
    },
    modalText: {
      marginBottom: 5,
      textAlign: "center",
      fontSize: width/20,
    },
    
    //Forgot passoword modal
    forgot_centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      // backgroundColor:"rgba(160, 163, 168,0.5)"
    },
    forgot_modalView: {
      width: width /1.3,
      height: height/4,
      justifyContent:"center",
      alignItems:"center",
      margin: 20,
      backgroundColor: "#06baba",
      borderRadius: 20,
      padding: 25,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    forgot_pass_input:{
      // borderBottomWidth:1,
      // borderBottomColor:"rgba(0,0,0,0.4)",
      borderRadius:25,
      width: width/1.5,
      height:height/15,
      fontSize: width/30,
      padding:5,
      textAlign:"center",
      backgroundColor:"white",
    },
    forgot_buttonClose: {
      width: width/ 2.5,
      borderRadius: 20,
      padding:10,
      elevation: 2,
      backgroundColor: "#20590d",
      marginTop:width/20,
    },


    ///////
    icon_text_container:{
      flex:1,
    },
    arrow_container:{
      flex:1,
      justifyContent:"center",
      paddingLeft:10,
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
      borderBottomLeftRadius:50,
      borderBottomRightRadius:50,
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

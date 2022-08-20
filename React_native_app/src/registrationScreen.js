import React, { Component,useState } from 'react';
import { 
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
    Alert} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Dropdown } from 'react-native-element-dropdown';

import { AntDesign ,Ionicons} from '@expo/vector-icons';

//importing global styles

let pallete = {

  placeholderColor : "darkgrey",
  borderColor : "black",
  register_btn_color :"#28800b",
  login_btn_color : "#20590d",
  showPasswordColor : '#28800b',
  modelCancel_btn_color : "red",
  modal_body_color : "white",
  backgroundColor : '#fbf5f2',
  text_input : "white",
  header_color : '#FF9933'

}



function RegistrationScreen({navigation}) {

  // Navigate to login screen
  const onClickLogin = () => {
    navigation.navigate("Login");
  };

  

  // STYLES
  const { styles } = useStyle();

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
    // PASSWORD VISIBILITY
  const [passwordVisible, setPasswordVisible] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);

  const [otpChoice, setOtpChoice] = useState("");
  const [choiceVisibility, setChoiceVisibility] = useState(false);


  const [formData, setFormData] = useState({
    firstName : "",
    lastName : "",
    phoneNumber: "",
    email: "",
    role : "",
    address : "",
    institute : "",
    instituteCode : "",
    password : "",
    confirm_password : ""
  });


  //DROPDOWN DATA
  const data = [
    { label: 'Student', value: 'STUDENT' },
    { label: 'Teacher', value: 'TEACHER' },
    { label: 'Institute', value: 'INSTITUTE' }
  ];

// check for email or phoneNumber
const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z]+[^a-zA-Z0-9]+[a-zA-Z]+/;
const phoneRegex = /[0-9]{10}/;


  let choice = '';
  const verification_method = (method)=>{
    choice = method;
  }

  const onClickChoiceModal = ()=>{
    setChoiceVisibility(!choiceVisibility);
  }

  const onClickRegister = async()=>{

    for (const key in formData){
      const data = formData[`${key}`];

      if(!data){
        setModalVisible(!modalVisible);
        return;
      }

    }

    //validation whether confirm password and password are same or not
    if(formData.password != formData.confirm_password){
      Alert.alert("Password and confirm password should match");
    }
    if(!emailRegex.test(formData.email)){
      Alert.alert("Invalid email");
    }

    if(!phoneRegex.test(formData.phoneNumber)){
      Alert.alert("Invalid phone number");
    }

    // All tests passed

    // formdata object will be passed
    console.log(formData);                          // REMOVE AFTER DEV

    // Before moving to OTP screen we need to send otp on the Phone number

    if(choice === 'MOBILE'){

      console.log("Running mobile verification");
      let res = await fetch("https://akshar-siksha.herokuapp.com/api/user/otp/generate/", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone_number : formData.phoneNumber
        })
      }).then((res)=>res.json())

      // Navigate to otp screen with this data

      if(res.status === 201){
        console.log(res);

        // Passing all the registration data to next screen(OTP screen)
        navigation.navigate("OTPScreen",formData);
      }else{
        Alert.alert("Invalid credentials","Please check your enterted phone number");
      }
        
    }else if(choice === 'EMAIL'){
      
      console.log("Running email verification");
      let res = await fetch("https://akshar-siksha.herokuapp.com/api/user/email/veification/", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email : formData.email
        })
      }).then((res)=>res.json())


      if(res.status === 200){
        console.log(res);

        // Passing all the registration data to next screen(OTP screen)
        navigation.navigate("OTPScreen",formData);
      }else{
        Alert.alert("Invalid credentials","Please check your enterted email");
      }
      
    }


}

return (

    <ImageBackground 
    source={require("../assets/Background.png")}
    style={{ height: Dimensions.get("screen").height / 1}}
    >
        <KeyboardAwareScrollView
            style={styles.container}
            contentOffset={{ x: 0, y: 24 }}
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingTop: 24 }}
            contentInsetAdjustmentBehavior="always"
            keyboardShouldPersistTaps="handled"
            enableOnAndroid={true}
            extraHeight={32}
            extraScrollHeight={Platform.OS == "android" ? 32 : 0}
            enableResetScrollToCoords={false}
            // onKeyboardDidShow={this._keyboardDidShowHandler}
            >

                {/* Modal all fields required alert implemenation */}
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text style={styles.modalText}>All fields are required</Text>
                      <Pressable
                        style={[ styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                      >
                        <Text style={styles.textStyle}>Okay</Text>
                      </Pressable>
                    </View>
                  </View>
                </Modal>

                {/* Modal for choosing OTP verification method */}
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={choiceVisibility}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text style={styles.modalText}>Verification Method</Text>
                      <Pressable
                        style={[ styles.buttonClose]}
                        onPress={() => {
                          verification_method('EMAIL');
                          onClickRegister();
                          setChoiceVisibility(!choiceVisibility);
                        }}
                      >
                        <Text style={styles.textStyle}>Email</Text>
                      </Pressable>

                      <Pressable
                        style={[ styles.buttonClose]}
                        onPress={() => {
                          verification_method('MOBILE');
                          onClickRegister();
                          setChoiceVisibility(!choiceVisibility);
                        }}
                      >
                        <Text style={styles.textStyle}>Phone Number</Text>
                      </Pressable>
                    </View>
                  </View>
                </Modal>

                <View style={styles.FormContainer}>

                    <Text style={styles.header}>Create Account</Text>


                    <View name="first name"style={styles.inputTextWrapper}>
                        <TextInput
                            placeholder="First name"
                            placeholderTextColor= {pallete.placeholderColor}
                            style={styles.textInput}
                            returnKeyType="next"
                            onChangeText={(data)=> setFormData({...formData,firstName:data})}
                        />
                        
                    </View>

                    <View name="Last name" style={styles.inputTextWrapper}>
                        <TextInput
                            placeholder='Last name'
                            placeholderTextColor={pallete.placeholderColor}
                            style={styles.textInput}
                            returnKeyType="next"
                            onChangeText={(data)=> setFormData({...formData,lastName:data})}
                        />

                    </View>

                    <View name="Phone number" style={styles.inputTextWrapper}>
                        <TextInput
                            placeholder='Phone number'
                            placeholderTextColor={pallete.placeholderColor}
                            style={styles.textInput}
                            returnKeyType="done"
                            keyboardType='numeric'
                            onChangeText={(data)=> setFormData({...formData,phoneNumber:data})}
                        />

                    </View>


                    <View name="Email container"style={styles.inputTextWrapper}>
                        <TextInput
                            placeholder="Email address"
                            placeholderTextColor={pallete.placeholderColor}
                            style={styles.textInput}
                            returnKeyType="next"
                            onChangeText={(data)=> setFormData({...formData,email:data})}
                            autoCapitalize = "none"
                        />
                    </View>

                    <View name="Role" style={styles.dropDownContainer}>
                        {/* {renderLabel()} */}
                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={[styles.placeholderStyle]}
                            selectedTextStyle={styles.selectedTextStyle}
                            // iconStyle={styles.iconStyle}
                            data={data}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder= "Describe yourself"
                            value={value}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setValue(item.value);
                                setFormData({...formData,role:item.value});
                                setIsFocus(false);
                            }}
                        />
                    </View>

                    <View name="Address"style={styles.inputTextWrapper}>
                        <TextInput
                            placeholder="Address"
                            placeholderTextColor={pallete.placeholderColor}
                            style={styles.textInput}
                            returnKeyType="next"
                            onChangeText={(data)=> setFormData({...formData,address:data})}
                            autoCapitalize="none"
                        />

                    </View>

  
                    <View name="Institute" style={styles.inputTextWrapper}>
                        <TextInput
                            placeholder="Institute name"
                            placeholderTextColor={pallete.placeholderColor}
                            style={styles.textInput}
                            returnKeyType="next"
                            onChangeText={(data)=> setFormData({...formData,institute:data})}

                        />
                    </View>

                    <View name="Insititute code" style={styles.inputTextWrapper}>
                        <TextInput
                            placeholder="Institute code"
                            placeholderTextColor={pallete.placeholderColor}
                            style={styles.textInput}
                            returnKeyType="next"
                            onChangeText={(data)=> setFormData({...formData,instituteCode:data})}
                        />
                    </View>

                    <View name = "Password container" style={styles.passwordContainer}>
                        <TextInput
                            placeholder='Password    (Atleast 6 characters)'
                            placeholderTextColor={pallete.placeholderColor}
                            style={styles.textInput}
                            secureTextEntry={passwordVisible}
                            returnKeyType="next"
                            onChangeText={(data)=> setFormData({...formData,password:data})}
                            autoCapitalize="none"
                        />
                    </View>

                    <View name="Confirm password" style={styles.passwordContainer}>
                        <TextInput
                            placeholder='Confirm password'
                            placeholderTextColor={pallete.placeholderColor}
                            style={styles.textInput}
                            secureTextEntry={passwordVisible}
                            returnKeyType="next"
                            onChangeText={(data)=> setFormData({...formData,confirm_password:data})}
                            autoCapitalize="none"
                            
                            />
                        
                    </View>
                    <View>
                        <TouchableWithoutFeedback onPress={()=>{setPasswordVisible(!passwordVisible)}}>
                            <Text style={{color:pallete.showPasswordColor}}>Show password</Text>
                        </TouchableWithoutFeedback>
                    </View>

                    <View name="register button wrapper" style={styles.btnWrapper}>
                        <TouchableOpacity style={styles.btnContainer} onPress={onClickChoiceModal}>
                            <Text style={styles.btnText}>Create Account</Text>
                        </TouchableOpacity>

                    </View>
                    <View name="login button wrapper"style={styles.login_button}>
                        <Text>Already registered? </Text>
                        <TouchableWithoutFeedback onPress={onClickLogin} >
                            <Text style={{color:pallete.login_btn_color,fontWeight:"bold"}}>
                            Login now
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
        </KeyboardAwareScrollView>
    </ImageBackground>

  )
}


const useStyle = ()=>
{
    const { height, width } = useWindowDimensions();

  const styles = StyleSheet.create({
    //Modal sytles starts
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      width: width /1.5,
      margin: 20,
      backgroundColor: pallete.modal_body_color,
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
      backgroundColor: pallete.modelCancel_btn_color,
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

    ///>>> modal style end

    // Form style start
      container: {
        flex: 1,
        padding: width /25,
        backgroundColor:pallete.backgroundColor,
    },
    FormContainer: {
        flex: 1,
        padding: width /20,
        paddingBottom: height/5.5,
        // backgroundColor:"yellow"
      },

      header: {
        fontSize: width/18,
        padding: 24,
        margin: 12,
        textAlign: "center",
        fontWeight: 'bold',
        color: pallete.header_color,
      },
      inputTextWrapper: {
        marginBottom: 24,
        height: height/15,
        // borderColor: pallete.borderColor,
        // borderBottomWidth: 1,
        backgroundColor:pallete.text_input,
        borderRadius: 50,
        padding:width/30,
        justifyContent:"center",
      },
      passwordContainer:{
        flexDirection:"row",
        marginBottom: 24,
        height: height/15,
        // borderColor: pallete.borderColor,
        // borderBottomWidth: 1,
        backgroundColor:pallete.text_input,
        borderRadius: 50,
        padding:width/30,
        justifyContent:"space-between",

      },
      dropDownContainer:{
        marginBottom: 24,
        height: height/15,
        // borderColor: pallete.borderColor,
        // borderBottomWidth: 1,
        backgroundColor:pallete.text_input,
        borderRadius: 50,
        padding:width/30,
        justifyContent:"center",
      },
      placeholderStyle: {
        fontSize: width/24,
        color:pallete.placeholderColor,
    },
    textInput: {
        fontSize: width/24,

      },
      errorText: {
        color: 'red',
        fontSize: 10,
      },
  
      btnWrapper:{
        // backgroundColor:"red",
        marginTop: height/ 20,
      },
      btnContainer: {
        backgroundColor: pallete.register_btn_color,
          alignItems: 'center',
          height: height/15,
          borderRadius: 30,
          justifyContent:"center",
          alignItems:"center",
      },
      btnText: {
        fontSize: height/40,
        fontWeight:"bold",
        color: "#fff"
      },
      login_button:{
        marginTop: 15,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
      },
    });

    return {styles};

}

export default RegistrationScreen
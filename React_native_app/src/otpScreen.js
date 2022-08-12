import React, {useState, useRef, useEffect} from 'react'
import {View, 
    StyleSheet, 
    KeyboardAvoidingView, 
    Text, 
    Dimensions, 
    keyboard,
    TextInput, 
    TouchableOpacity,
    TouchableWithoutFeedback,
    useWindowDimensions,
    Modal,
    Alert,

} from 'react-native';

const pallete = {
    resend_text_color:"#006FFD",
    confirm_btn: "#006FFD",
    confirm_text_color:"white",
    screen_background : "white",
    description_text : "grey"
}


function OTPScreen({navigation,route}) {

    const {styles} = useStyle();

    const {
    firstName,
    lastName ,
    phoneNumber,
    email,
    role ,
    address ,
    institute ,
    instituteCode ,
    password ,
    confirm_password ,
    } = route.params;

    const box1 = useRef();
    const box2 = useRef();
    const box3 = useRef();
    const box4 = useRef();

    const [pins, setPins] = useState({
        pin1: "",
        pin2: "",
        pin3: "",
        pin4: "",

    })

    const OTP = pins.pin1.concat(pins.pin2,pins.pin3,pins.pin4);

    const onClickResend = async()=>{
        console.log("Resending OTP");
        const res = await fetch("https://akshar-siksha.herokuapp.com/api/user/otp/generate/", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phone_number : phoneNumber
                })
                }).then((res)=>res.json())

                // Navigate to otp screen with this data

                if(res.status === 201){
                    console.log(res);

                // Passing all the registration data to next screen(OTP screen)
                }else{
                    Alert.alert("Invalid credentials","Please check your enterted phone number");
    }


    }

    // this will send a POST request for registration
    const onClickContinue = async ()=>{
        const register_url = 'https://akshar-siksha.herokuapp.com/api/user/register/'.concat(OTP.toString());

        const register_res = await fetch(register_url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                address : address,
                email : email,
                first_name : firstName,
                last_name : lastName,
                phoneNumber : phoneNumber,
                institute : institute,
                institute_code: instituteCode ,
                password : password,
                password2 : confirm_password,
                role : role

            })
            });

            const status = register_res.status;
            const json_res = register_res.json();

            // console.log(register_res);
            if(status == 400)
            {
               Alert.alert("User exists","You have an account on this email or phone number",
               [
                    {
                        text: "Login",
                        onPress: ()=>{
                            navigation.navigate('Login');
                        }
                    }
                ])
            }else{

                navigation.navigate("TestDashBoard",{
                    status: json_res.status,
                    id : json_res.id,
                    auth_token : json_res.auth_token
    
                });

            }
            
    }

  return (

    <View style={styles.screen}>
        <View style={styles.container}>


            <View name="heading and below text"style={styles.textContainer} >
                <Text style={styles.heading}>Enter Confirmation Code</Text>
                <Text style={styles.description}>A 4-digit code was sent to
                    registered phone number</Text>
            </View>


            <View name="Confirmation code boxes" style={styles.otpboxContainer}>

                <View name="Box1" style={styles. box}>
                    <TextInput style={styles.otpbox}
                    ref={box1}
                    keyboardType='numeric'
                    textAlign='center'
                    returnKeyType ="done"
                    maxLength={1}
                    onChangeText={(pin)=>{
                        setPins({...pins,pin1:pin});
                        if(pin){
                            box2.current.focus();
                        }
                    }}
                    

                    />
                </View>
                <View name="Box2" style={styles. box}>
                <TextInput style={styles.otpbox}
                    ref={box2}
                    keyboardType='numeric'
                    textAlign='center'
                    returnKeyType ="done"
                    maxLength={1}
                    // this will control the forward movement of cursor to next box
                    onChangeText={(pin)=>{
                        setPins({...pins,pin2:pin});
                        if(pin){
                            box3.current.focus();
                        }
                    }}
                    // when backspace the pressed the focus will be on previous box
                    onKeyPress={({nativeEvent})=>{
                        if(nativeEvent.key === "Backspace")
                        {
                            box1.current.focus();
                        }
                    }}
                />
                </View>
                <View name="Box3" style={styles. box}>
                <TextInput style={styles.otpbox}
                    ref={box3}
                    keyboardType='numeric'
                    textAlign='center'
                    maxLength={1}
                    returnKeyType ="done"
                    onChangeText={(pin)=>{
                        setPins({...pins,pin3:pin});
                        if(pin){
                            box4.current.focus();
                        }
                    }}
                    onKeyPress={({nativeEvent})=>{
                        if(nativeEvent.key === "Backspace")
                        {
                            box2.current.focus();
                        }
                    }}
                    
                />
                
                </View>
                <View name="Box4" style={styles. box}>
                <TextInput style={styles.otpbox}
                    ref={box4}
                    keyboardType='numeric'
                    textAlign='center'
                    maxLength={1}
                    returnKeyType ="done"
                    onChangeText={(pin)=>{
                        setPins({...pins,pin4:pin});
                    }}
                    onKeyPress={({nativeEvent})=>{
                        if(nativeEvent.key === "Backspace")
                        {
                            box3.current.focus();
                        }
                    }}
                />
                
                </View>

            </View>

            <View name="buttons" style={styles.buttonContainer}>
               
                <TouchableOpacity style={styles.resend_btn} onPress={onClickResend}>
                    <Text style={styles.resend_text}>Resend OTP</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.confirm_btn} onPress={onClickContinue}>
                    <Text style={styles.confirm_text}>Continue</Text>
                </TouchableOpacity>

            </View>

        </View>

    </View>

  )
}


const useStyle= ()=>{
    const {height,width} = useWindowDimensions();

    const styles = StyleSheet.create({

        screen:{
            flex:1,
            justifyContent:"center",
            alignItems:"center",
            backgroundColor:pallete.screen_background,
        },
        container:{
            width: width/1.3,
            height:height/2,
            // backgroundColor:"red",
            justifyContent:"center",
            alignItems:"center",
            position:"absolute",

        },
        textContainer:{
            flex:0.6,
            width: width/ 1.5,
            // backgroundColor:"yellow",
            justifyContent:"center",
            alignItems:"center",
        },
        heading:{
            // backgroundColor:"white",
            width: width/1.5,
            textAlign:"center",
            fontSize:width/20,
            marginBottom:width/50,
            fontWeight:"bold",
        },
        description:{
            width:width/2,
            textAlign:"center",
            fontSize:width/30,
            color:pallete.description_text,
        },
        otpboxContainer:{
            flex:0.6,
            flexDirection:"row",
            // backgroundColor:"blue",
            width: width/1.5,
            justifyContent:"space-evenly",
            alignItems:"center",
        },
        box:{
            backgroundColor:"white",
            margin:5,
            width: width/7.5,
            height: width/7.5,
            borderRadius:10,
            borderWidth:1,

        },
        otpbox:{
            flex:1,
            fontSize:width/15,
            justifyContent:"center",
        },
        buttonContainer:{
            flex:1.5,
            justifyContent:"flex-end",
            width: width/1.5,
            // backgroundColor:"skyblue"

        },
        resend_btn:{
            marginBottom:10,
            // backgroundColor:"green"
        },
        confirm_btn:{
            backgroundColor:pallete.confirm_btn,
            height: width/7.5,
            justifyContent:"center",
            borderRadius:10,
        },
        resend_text:{
            justifyContent:"center",
            textAlign:"center",
            color:pallete.resend_text_color,
        },
        confirm_text:{
            justifyContent:"center",
            textAlign:"center",
            fontSize:width/25,
            fontWeight:"bold",
            color:pallete.confirm_text_color,

        }
        
    })

    return {styles};

}

export default OTPScreen
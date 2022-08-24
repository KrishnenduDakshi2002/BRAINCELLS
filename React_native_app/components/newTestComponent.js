import React, { useState } from "react";

import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Modal,
  useWindowDimensions,
  Image,
  Alert,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import * as Linking from "expo-linking";


const TestComponent = (props) => {

    const { styles } = useStyle();
  
    const navigation = useNavigation();

    const openLink = (url) => {
      Linking.openURL(url);
    };
  
    // for student it will pop for a modal for uploading the sheet
  
    const upload_sheet = () => {
      console.log("i am a student");
      navigation.navigate("UploadAnswerSheetScreen", {
        auth_token: props.auth_token,
        test_id : props.test_id
      });

    };
  
    // for teacher it will navigate to a screen similar to material screen
  
    const navigate_answerSheet_screen = (answerSheetArray) => {
      console.log("i am a regular teacher");
      console.log("this is the answerarray -- \n\n", answerSheetArray);
      navigation.navigate("AnswerSheets", {
        "AnswerSheetsArray": answerSheetArray,
        "auth_token": props.auth_token,
        "role": props.role,
      });
    };

    const onPressNav = ()=>{
      console.log('please navigate');
    }

    return (
    
      <Pressable>
  
        <View style={styles.mainContainer}>
          <View style={[styles.container]}>
            <View style={styles.imageContainer}>
              <Pressable>
                <Image
                  source={require("../assets/list.png")}
                  style={{ height: 65, width: 65 }}
                />
              </Pressable>
            </View>
  
            {/* this is details */}
             <View style={styles.details}>
              <Text style={styles.topic}>{props.topic}</Text>
              <Text style={styles.subject}>{props.subject}</Text>
              <Text style={styles.subject}>{props.dateTime}</Text>
            </View> 
  
             <View style={styles.icon}>
              {props.role === "TEACHER" && (
                <Pressable onPress={props.onPressDelete}>
                  <Image
                    source={require("../assets/dustbin.png")}
                    style={{ width: 30, height: 30, marginRight: 20 }}
                  />
                </Pressable>
              )}
            </View> 
  
          </View>
           <View style={styles.buttons_holder}>
            <Pressable
              style={styles.button}
              onPress={() => {
                openLink(props.questionLink);
              }}
            >
              <Text style={styles.text}>Question paper</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={
                ()=>{
                  props.role === 'TEACHER' ? navigate_answerSheet_screen(props.answerSheets) : upload_sheet();
                }
              }
            >
              <Text style={styles.text}>
                {props.role === "TEACHER" ? "Answersheets" : "Add sheet"}
              </Text>
            </Pressable>
          </View> 
        </View>
      </Pressable>
    );
  };
  
  const useStyle = () => {
    const { height, width } = useWindowDimensions();
    const styles = StyleSheet.create({
      mainContainer: {
        backgroundColor: "#04cc75",
        borderRadius: 25,
        marginBottom: 15,
        height: width / 1.5,
        width: "100%",
        justifyContent: "space-evenly",
      },
      container: {
        flexDirection: "row",
      },
      imageContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 10,
        justifyContent: "center",
        alignItems: "center",
      },
      icon: {
        flex: 0.1,
        alignItems: "center",
        paddingTop: 10,
      },
      details: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 20,
        //   backgroundColor:"pink"
      },
      topic: {
        marginTop: 10,
        width: "100%",
        fontSize: height / 40,
        fontWeight: "bold",
        marginBottom: 5,
        color: "black",
      },
      subject: {
        width: "100%",
        fontSize: height / 50,
        marginBottom: height / 70,
        color: "#242121",
      },
      teacher: {
        width: "100%",
        fontSize: height / 50,
        marginBottom: height / 70,
      },
      dateTime: {
        width: "100%",
        fontSize: height / 50,
        marginBottom: height / 70,
      },
      buttons_holder: {
        flexDirection: "row",
        // backgroundColor:"pink",
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingRight: 10,
        paddingLeft: 10,
      },
      button: {
        backgroundColor: "#e3fffe",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 15,
        height: height / 20,
        width: width / 2.7,
        borderRadius: 50,
      },
      text: {
        fontWeight: "bold",
      },
    });
  
    return { styles };
  };
  
export default TestComponent;
  
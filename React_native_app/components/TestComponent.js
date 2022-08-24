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

import * as ImagePicker from "expo-image-picker";

import * as DocumentPicker from "expo-document-picker";

import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAn6I2uIF2zYnq2jAR61gbSvNB8YBUr_Zs",
  authDomain: "akshar-siksha.firebaseapp.com",
  projectId: "akshar-siksha",
  storageBucket: "akshar-siksha.appspot.com",
  messagingSenderId: "172146470008",
  appId: "1:172146470008:web:2884e80c6562839c75d18d",
  measurementId: "G-CWVJ34VYN6",
};

import { Entypo } from "@expo/vector-icons";

import * as Linking from "expo-linking";

import { useNavigation } from "@react-navigation/native";

let pallete = {
  upload_model_bgc: "#FF9933",
  upload_model_continue_btn: "#28800b",
  upload_model_close_btn: "#28800b",

  modelCancel_btn_color: "red",
  modal_body_color: "white",
  backgroundColor: "#fbf5f2",
  text_input: "white",
  header_color: "#FF9933",
};

const TestComponent = (props) => {

  const { styles } = useStyle();

  const navigation = useNavigation();

  // visibility of modal
  const [showModal, setShowModal] = useState(false);

  // is create classroom
  const [IsCreated, setIsCreated] = useState(false);

  // is file uploaded
  const [IsUploaded, setIsUploaded] = useState(false);

  // is file choose by teacher (after choose -> false)
  const [IsChoosen, setIsChoosen] = useState(true);

  const [doc, setDoc] = useState(null);

  const [url, setUrl] = useState("");

  const [filename, setFilename] = useState("");

  const app = initializeApp(firebaseConfig);

  const storage = getStorage();


  // *************************************** Upload answer sheet *********************************************************************************************************

const upload_answer_sheet = (link,filename)=>{
    const url =
      "https://akshar-siksha.herokuapp.com/api/data/classroom/upload/answer_sheet/" + props.test_id;
    const res = fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.auth_token,
      },
      body: JSON.stringify({
        "fileName" : filename,
        "link" : link
      }),
    }).then((res) => res.json());

    console.log("this is our response for creating new test line-101",res);

    if (res.status === 201) {
      setIsCreated((current) => !current);
    } else if (res.status === 200) {
      Alert.alert(res.message);
    }
}


// *************************************** ask permissions *********************************************************************************************************

const askPermission = () => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("We need your permissions");
        }
      }
    })();
  };

  // *************************************** Pick document *********************************************************************************************************

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    console.log(result);
    setFilename(result.name);
    console.log(filename);

    if (!result.cancelled) {
      setDoc(result.uri);
    }

    setIsChoosen((current) => !current);
    setIsUploaded((current) => !current);
  };
  // *************************************** upload document and create test *********************************************************************************************************

  const current_time = new Date().toISOString();

  const UploadfileName =
    "answersheets"  + "/" + current_time + "_" + filename;

  const uploadDoc_run_create_test = async () => {
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", doc, true);
        xhr.send(null);
      });

      const storageRef = ref(storage, UploadfileName);

      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = snapshot.bytesTransferred / snapshot.totalBytes;
          console.log("Upload is " + progress * 100 + "% done");
        },
        (error) => {
          Alert.alert("File upload unsucessful");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log(downloadURL);
            setUrl(downloadURL);

            if (true) {
                upload_answer_sheet(downloadURL,filename);
            } else {
              Alert.alert("Please provide details");
            }
          });
        }
      );
    } catch (error) {
      console.log("THis is our testForm line - 251 ", testForm);
      console.log("Our error is line 252 ", error);
      Alert.alert("Document missing", "Please provide question paper");
    }
  };



  //DOCUMENT UPLOAD ENDS



  const openLink = (url) => {
    Linking.openURL(url);
  };

  // for student it will pop for a modal for uploading the sheet

  const upload_sheet = () => {
    console.log("i am a student");
    askPermission();
  };

  // for teacher it will navigate to a screen similar to material screen

  const navigate_answerSheet_screen = (answerSheetArray) => {
    console.log("i am a teacher");
    // navigation.navigate("AnswerSheets", {
    //   "AnswerSheetsArray": answerSheetArray,
    //   "auth_token": props.auth_token,
    //   "role": props.role,
    // });
  };

  return (
  
    <Pressable>

      // MODAL STARTS
     
      // MODAL ENDS

      <View style={styles.mainContainer}>
        <View style={[styles.container, { ...props.style }]}>
          <View style={styles.imageContainer}>
            <Pressable onPress={props.clickTocopyClickBoard}>
              <Image
                source={require("../assets/list.png")}
                style={{ height: 65, width: 65 }}
              />
            </Pressable>
          </View>

          {/* this is details */}
          {/* <View style={styles.details}>
            <Text style={styles.topic}>{props.topic}</Text>
            <Text style={styles.subject}>{props.subject}</Text>
            <Text style={styles.subject}>{props.dateTime}</Text>
          </View> */}

          {/* <View style={styles.icon}>
            {props.role === "TEACHER" && (
              <Pressable onPress={props.onPressDelete}>
                <Image
                  source={require("../assets/dustbin.png")}
                  style={{ width: 30, height: 30, marginRight: 20 }}
                />
              </Pressable>
            )}
          </View> */}

        </View>
        {/* <View style={styles.buttons_holder}>
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
              props.role === "TEACHER"
                ? navigate_answerSheet_screen
                : upload_sheet
            }
          >
            <Text style={styles.text}>
              {props.role === "TEACHER" ? "Answersheets" : "Add sheet"}
            </Text>
          </Pressable>
        </View> */}
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

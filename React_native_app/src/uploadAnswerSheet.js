import React, {useState,useEffect} from 'react'
import { Text, View,StyleSheet , BackHandler,useWindowDimensions,TouchableOpacity,Pressable,Image,Alert} from 'react-native'


import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from 'expo-image-picker';

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


import { useRoute, useNavigation } from "@react-navigation/native";

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

function UploadAnswerSheetScreen() {


    const {styles} = useStyle();

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


  const navigation = useNavigation();

  const route = useRoute();

  // *************************************** passing data to database *********************************************************************************************************

  const postAnswer =async(question_url,filename)=>{

    const url =
      "https://akshar-siksha.herokuapp.com/api/data/classroom/upload/answer_sheet/" + route.params.test_id
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + route.params.auth_token,
      },
      body: JSON.stringify({
        fileName : filename,
        link : question_url
      }),
    }).then((response) => response.json());

    console.log("this is our response for creating new test line-348",res);

    if (res.status === 201) {
      setIsCreated((current) => !current);
    } else if (res.status === 200) {
      Alert.alert(res.message);
    }
  }

   // *************************************** Ask for permissions for file choose *********************************************************************************************************

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

  let upload_classroom_id = "";

  let UploadfileName =
    "answerSheets" + "/" + route.params.test_id + "/" + current_time + "_" + filename;

  const upload_answerSheet = async () => {
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
            postAnswer(downloadURL,filename);

          });
        }
      );
    } catch (error) {
      console.log("Our error is line 252 ",error);
      Alert.alert("Document missing", "Please provide question paper");
    }
  };

  // *************************************** back handler *********************************************************************************************************

  const backToTestContainer = async () => {
    navigation.navigate("TestContainer", {
      auth_token: route.params.auth_token,
      test_id : route.params.test_id    
    });
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backToTestContainer
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.mainContainer}>
        <View style={styles.create_classroom_modalView}>
        {!IsCreated ? (
        <>
            {IsChoosen && (
            <>
                <View
                name="Upload file view"
                style={[
                    styles.uploaded_file,
                    {
                    borderStyle: "dashed",
                    borderWidth: 2,
                    borderColor: "black",
                    backgroundColor: "transparent",
                    },
                ]}
                >
                <View
                    style={[
                    styles.icon_and_text_container,
                    { justifyContent: "center" },
                    ]}
                >
                    <TouchableOpacity onPress={()=>{
                        askPermission();
                        pickDocument();
                    }}>
                    <Text style={{ fontSize: 15 }}>Choose file</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </>
            )}

            {IsUploaded && (
            <>
                <View
                name="icon and file name"
                style={styles.uploaded_file}
                >
                <View style={styles.icon_and_text_container}>
                    <Image
                    source={require("../assets/pdf.png")}
                    style={{ width: 40, height: 40 }}
                    />
                    <Text style={styles.filename}>{filename}</Text>

                    <TouchableOpacity onPress={()=>{
                        setIsUploaded(current => !current);
                        setIsChoosen(current => !current);
                        setDoc(null);
                    }}>
                        <Image
                        source={require("../assets/close.png")}
                        style={{ width: 30, height: 30, bottom:"40%",left:10 }}
                        />
                    </TouchableOpacity>

                </View>
                </View>
            </>
            )}

            <TouchableOpacity
            style={[styles.create_classroom_btn]}
            onPress={upload_answerSheet}
            >
            <Image
                source={require("../assets/file-upload.png")}
                style={{
                width: 25,
                height: 25,
                marginRight: 20,
                marginLeft: 15,
                }}
            />
            <Text style={styles.textStyle}>Upload</Text>
            </TouchableOpacity>
        </>
        ) : (
        <Pressable
            onPress={() => {
            backToTestContainer();
            }}
        >
            <Image
            source={require("../assets/check.png")}
            style={{ width: 150, height: 150 }}
            />
        </Pressable>
        )}
    </View>
    </View>
  )
}

const useStyle = () => {
    const { width, height } = useWindowDimensions();
    const styles = StyleSheet.create({
        mainContainer:{
            flex:1,
            justifyContent:"center",
            alignItems:"center",
            backgroundColor:"#ffefd4"
        },
      container: {
        flex: 1,
        backgroundColor: "#f75200",
      },
      header: {
        flex: 0.5,
        backgroundColor: "#f75200",
        height: 100,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 20,
      },
      icon: {
        backgroundColor: "white",
        borderRadius: 50,
        width: width / 3.5,
        height: width / 3.5,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
      },
      icon_image: {
        width: width / 6,
        height: width / 6,
      },
  
      header_text: {
        fontWeight: "bold",
        fontSize: width / 20,
      },
      scrollContainer: {
        flex: 1,
        // padding: 25,
        paddingRight: 25,
        paddingLeft: 25,
        paddingTop: 15,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: pallete.backgroundColor,
      },
      floating_button: {
        position: "absolute",
        bottom: 80,
        right: 50,
        backgroundColor: "white",
        borderRadius: 50,
      },
  
      // MODAL
      create_classroom_centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255,1)",
      },
      create_classroom_modalView: {
        width: width / 1.3,
        height: height / 2,
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
        backgroundColor: pallete.upload_model_bgc,
        borderRadius: 50,
        padding: 25,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      classroom_details_input: {
        borderRadius: 15,
        width: width / 1.5,
        height: height / 15,
        fontSize: width / 24,
        padding: 5,
        // textAlign: "center",
        paddingRight: 10,
        backgroundColor: "white",
        margin: 10,
      },
      create_classroom_btn: {
        width: width / 2,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: pallete.upload_model_continue_btn,
        marginTop: width / 20,
        flexDirection: "row",
        alignItems: "center",
      },
      close_classroom_btn: {
        width: width / 2,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: pallete.upload_model_continue_btn,
        marginTop: width / 20,
        flexDirection: "row",
        alignItems: "center",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 15,
      },
  
      // MODAL ENDS
      icon_and_text_container: {
        flexDirection: "row",
        alignItems: "center",
      },
      filename: {
        flex: 1,
        fontSize: width / 20,
        paddingLeft: 15,
      },
      file_icon: {
        flex: 0.2,
      },
      dateTimeContainer: {
        width: width / 1.5,
        flexDirection: "row",
        justifyContent: "space-evenly",
      },
  
      // FILE UPLOAD AND CHOOSE STYLES
      uploaded_file: {
        width: width / 1.5,
        backgroundColor: "white",
        marginBottom: 25,
        borderRadius: 25,
        padding: 20,
      },
      icon_and_text_container: {
        flexDirection: "row",
        alignItems: "center",
      },
      filename: {
        flex: 1,
        fontSize: width / 20,
        paddingLeft: 15,
      },
  
      // DROPDOWN
  
      dropDownContainer: {
        borderRadius: 15,
        width: width / 1.5,
        marginBottom: 24,
        height: height / 15,
        // borderColor: pallete.borderColor,
        // borderBottomWidth: 1,
        backgroundColor: pallete.text_input,
        padding: width / 30,
        justifyContent: "center",
      },
      placeholderStyle: {
        fontSize: width / 24,
        color: "lightgrey",
      },
    });
  
    return { styles };
  };

export default UploadAnswerSheetScreen
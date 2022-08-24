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

// importing classroom context

import { ClasroomContext } from "./Classroom";

import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  RefreshControl,
  BackHandler,
  Modal,
  useWindowDimensions,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
  StatusBar,
} from "react-native";

//importing classc component
import TestComponent from "../components/newTestComponent";

import ClassroomComponent from '../components/ClassroomComponent'

import { AntDesign } from "@expo/vector-icons";

import { useRoute, useNavigation } from "@react-navigation/native";

import DateTimePicker from "@react-native-community/datetimepicker";

import moment from "moment";

import { Dropdown } from "react-native-element-dropdown";

import * as Clipboard from "expo-clipboard";

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

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function TestContainer() {
  const { styles } = useStyle();

  const [dropdown, setDropdown] = useState(null);

  const [refreshing, setRefreshing] = React.useState(false);

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

  // using context from classroomcontext
  const context = useContext(ClasroomContext); // we want to use this ClassroomContext

  // const [DataArray, setDataArray] = useState(context.StudentsDataArray);

  // let DataArray = context.MaterialsDataArray;

  const initial_testForm = [{
    topic: "",
    subject: "",
    classroom_id : ""
  }];

  // storing classroom details filled by the teacher
  const [testForm, settestForm] = useState(initial_testForm);

  const [test_id, setTest_id] = useState("");

  // storing classrooms array
  const [testList, setTestList] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();

  const [value, setValue] = useState(null);

  const [isFocus, setIsFocus] = useState(false);

  const [classroom_dropdown_data, setClassroom_dropdown_data] = useState([]);

  // *************************************** Pick datetime *********************************************************************************************************

  // for datetime picker
  // for datetime picker
  let initial_text = "";
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("data");
  const [show, setShow] = useState(false);
  const [text, setText] = useState(initial_text);

  const onChangeDateTime = (selectedDate) => {
    const inputDate = selectedDate["nativeEvent"]["timestamp"];
    const currentDate = new Date(inputDate) || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let currentDateStamp =
      currentDate.getFullYear() +
      "-" +
      String(currentDate.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(currentDate.getDate()).padStart(2, "0") +
      "T" +
      String(currentDate.getHours()).padStart(2, "0") +
      ":" +
      String(currentDate.getMinutes()).padStart(2, "0") +
      ":" +
      String(currentDate.getSeconds()).padStart(2, "0") +
      "Z";
    setText(currentDateStamp);
    console.log(currentDateStamp);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

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
    "tests" + "/" + upload_classroom_id + "/" + current_time + "_" + filename;

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

            if (testForm && text) {
              createNewTest(downloadURL);
            } else {
              Alert.alert("Please provide details");
            }
          });
        }
      );
    } catch (error) {
      console.log("THis is our testForm line - 251 ", testForm);
      console.log("Our error is line 252 ",error);
      Alert.alert("Document missing", "Please provide question paper");
    }
  };

  // ************************************************************************************************************************************************
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  //  https://stackoverflow.com/questions/61140709/how-to-navigate-to-specific-screen-on-backhandler-in-reat-native

  // ************************************************************************************************************************************************

  useEffect(() => {
    const backToDashboard = async () => {
      // add async  else it will navigate to login screen
      navigation.navigate("UserDashBoard", {
        auth_token: route.params.auth_token,
        role: route.params.role,
      });
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backToDashboard
    );

    return () => backHandler.remove();
  }, []);

  // ****************************************************************** Loading screen from API ******************************************************************

  const load_screen = () => {
    fetch(
      "https://akshar-siksha.herokuapp.com/api/data/get/user/dashboard/tests",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + route.params.auth_token,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        
      setTestList(data.Tests.Tests);
      });
  };

  const load_classroom_array = () => {
    fetch(
      "https://akshar-siksha.herokuapp.com/api/data/get/user/dashboard/classrooms",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + route.params.auth_token,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setClassroom_dropdown_data(data.Classrooms.Classrooms));
  };

  useEffect(() => {
    load_screen();
    load_classroom_array();
  }, []);

  // ************************************************************************************************************************************************

  const createNewTest = async (question_url) => {
    console.log("running create classroom");
    
    if (!testForm) {
      Alert.alert("Every field is mandatory.");
      return;
    }

    const url =
      "https://akshar-siksha.herokuapp.com/api/data/classroom/create/test/" + testForm.classroom_id;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + route.params.auth_token,
      },
      body: JSON.stringify({
        topic: testForm.topic,
        subject: testForm.subject,
        dateTime: text,
        questionPaper: question_url,
      }),
    }).then((res) => res.json());

    console.log("this is our response for creating new test line-348",res);

    if (res.status === 201) {
      setIsCreated((current) => !current);
      setTest_id(res.test_id);
    } else if (res.status === 400) {
      Alert.alert("Coudn't create classroom");
    }
  };

  // ************************************************************************************************************************************************

  const onPressDelete = async (classroom_id) => {
    // const del_url = "https://akshar-siksha.herokuapp.com/api/data/classroom/delete/"+ classroom_id
    // const res = await fetch(del_url, {
    // method: "DELETE",
    // headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     'Authorization' : 'Bearer '+ (route.params.auth_token)
    // }
    // }).then((res) => res.json()).then((json)=> console.log("This is from deleting function : ",json));
  };

  // ************************************************************************************************************************************************


  if(route.params.role === 'TEACHER'){
    console.log("this is answersheet list --- \n\n",testList);
  }


  return (
    <>
      {/* <StatusBar hidden/> */}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          mode={mode}
          onChange={onChangeDateTime}
          is24Hour={true}
          display="default"
          value={date}
        />
      )}

      <View style={styles.container}>
        
        <Modal animationType="fade" transparent={true} visible={showModal}>
          <View style={styles.create_classroom_centeredView}>
            {/* when clicked upload confirm button */}

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
                          <TouchableOpacity onPress={pickDocument}>
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
                        </View>
                      </View>
                    </>
                  )}
                  <View
                    name="choose classroom"
                    style={styles.dropDownContainer}
                  >
                    {/* {renderLabel()} */}
                    <Dropdown
                      style={[
                        styles.dropdown,
                        isFocus && { borderColor: "blue" },
                      ]}
                      placeholderStyle={[styles.placeholderStyle]}
                      selectedTextStyle={styles.selectedTextStyle}
                      data={classroom_dropdown_data}
                      maxHeight={300}
                      labelField="Title"
                      valueField="_id"
                      placeholder="Choose classroom"
                      value={dropdown}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={(item) => {
                        setValue(item._id);
                        settestForm({...testForm,classroom_id:item._id});
                        setIsFocus(false);
                      }}
                    />
                  </View>
                  <TextInput
                    onChangeText={(input) => {
                      settestForm({ ...testForm, topic: input });
                    }}
                    visible={true}
                    placeholder="Topic of test"
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholderTextColor={"lightgrey"}
                    style={styles.classroom_details_input}
                  />
                  <TextInput
                    onChangeText={(input) => {
                      settestForm({ ...testForm, subject: input });
                    }}
                    visible={true}
                    placeholder="Subject"
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholderTextColor={"lightgrey"}
                    style={styles.classroom_details_input}
                  />
                  <View style={styles.dateTimeContainer}>
                    <Pressable
                      onPress={() => {
                        showMode("date");
                      }}
                    >
                      <Image
                        source={require("../assets/calendar.png")}
                        style={{ width: 50, height: 50 }}
                      />
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        showMode("time");
                      }}
                    >
                      <Image
                        source={require("../assets/clock.png")}
                        style={{ width: 50, height: 50 }}
                      />
                    </Pressable>
                  </View>

                  <TouchableOpacity
                    style={[styles.create_classroom_btn]}
                    onPress={uploadDoc_run_create_test}
                  >
                    <Image
                      source={require("../assets/plus.png")}
                      style={{
                        width: 25,
                        height: 25,
                        marginRight: 20,
                        marginLeft: 15,
                      }}
                    />
                    <Text style={styles.textStyle}>Create</Text>
                  </TouchableOpacity>
                  <Pressable
                    style={[styles.close_classroom_btn]}
                    onPress={() => setShowModal((current) => !current)}
                  >
                    <Image
                      source={require("../assets/delete.png")}
                      style={{
                        width: 20,
                        height: 20,
                        marginRight: 20,
                        marginLeft: 15,
                      }}
                    />
                    <Text style={styles.textStyle}>Cancel</Text>
                  </Pressable>
                </>
              ) : (
                <Pressable
                  onPress={() => {
                    setShowModal((current) => !current);
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
        </Modal>

        <View style={styles.header}>
          <View style={styles.icon}>
            <Image
              source={require("../assets/exam.png")}
              style={styles.icon_image}
            />
          </View>

          <Text style={styles.header_text}>SCHEDULED TESTS</Text>
        </View>
        <View style={styles.scrollContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >

            {testList ?
              testList.map((obj) => (
                <TestComponent
                  key={obj._id}
                  role = {route.params.role}
                  topic={obj.topic}
                  test_id = {obj._id}
                  auth_token = {route.params.auth_token}
                  subject={obj.subject}
                  dateTime={moment(obj.dateTime).format("lll")}
                  questionLink={obj.questionPaper}
                  answerSheets={
                    route.params.role === "TEACHER" ? obj.answerSheet : null   // this passes an array
                  }
                />
              ))
              : null
            }

          </ScrollView>
        </View>

        {route.params.role == "TEACHER" && (
          <Pressable
            style={styles.floating_button}
            onPress={() => {
              askPermission();
              setShowModal((current) => !current);
              setIsCreated(false);
              settestForm(initial_testForm);
              if (!IsChoosen) {
                setIsChoosen((current) => !current);
              }
              if (IsUploaded) {
                setIsUploaded((current) => !current);
              }
            }}
          >
            <AntDesign name="pluscircle" size={55} color="black" />
          </Pressable>
        )}
      </View>
    </>
  );
}

const useStyle = () => {
  const { width, height } = useWindowDimensions();
  const styles = StyleSheet.create({
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
      height: height / 1.3,
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

export default TestContainer;

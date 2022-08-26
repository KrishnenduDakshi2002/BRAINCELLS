import React, {
  useEffect,
  useState,
} from 'react';

import * as Clipboard from 'expo-clipboard';
import {
  Alert,
  BackHandler,
  Image,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';

//importing classc component
import ClassroomComponent from '../components/ClassroomComponent';

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

function ClassroomsContainer() {
  const { styles } = useStyle();
  const [refreshing, setRefreshing] = React.useState(false);

  // visibility of modal
  const [showModal, setShowModal] = useState(false);

  // is create classroom
  const [IsCreated, setIsCreated] = useState(false);


  const initial_ClassroomForm = {
    Title: "",
    Subject: "",
    Description: "",
  };

  // storing classroom details filled by the teacher
  const [ClassroomForm, setClassroomForm] = useState(initial_ClassroomForm);

  // storing classrooms array
  const [classroomList, setClassroomList] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();
  // ************************************************************************************************************************************************

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    load_screen();

    wait(2000).then(() => setRefreshing(false));
  }, []);

  //  https://stackoverflow.com/questions/61140709/how-to-navigate-to-specific-screen-on-backhandler-in-reat-native

// ************************************************************************************************************************************************

  useEffect(() => {
    const backToDashboard = async () => {
      // add async  else it will navigate to login screen
      navigation.navigate("UserDashBoard", {
        auth_token: route.params.auth_token,
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
  .then((data) => setClassroomList(data.Classrooms.Classrooms));

}
// ************************************************************************************************************************************************
useEffect(() => {
    console.log("Running useeffect");

    load_screen();
    
  }, []);

// ************************************************************************************************************************************************
  const createNewClassroom = async () => {
    console.log("running create classroom");
    if (!ClassroomForm.Title && !ClassroomForm.Subject) {
      Alert.alert("Title and subject are mandatory fields");
      return;
    }

    const res = await fetch(
      "https://akshar-siksha.herokuapp.com/api/data/classroom",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization' : 'Bearer '+ (route.params.auth_token)
        },
        body: JSON.stringify({
          title: ClassroomForm.Title,
          subject: ClassroomForm.Subject,
          description: ClassroomForm.Description,
        }),
      }
    ).then((res) => res.json());

    if (res.status === 201) {
      setIsCreated((current) => !current);
    } else if (res.status === 400) {
      Alert.alert("Coudn't create classroom");
    }
  };

// ************************************************************************************************************************************************

const onPressDelete = async (classroom_id)=> {
  const del_url = "https://akshar-siksha.herokuapp.com/api/data/classroom/delete/"+ classroom_id
  const res = await fetch(del_url, {
  method: "DELETE",
  headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Authorization' : 'Bearer '+ (route.params.auth_token)
  }
  }).then((res) => res.json()).then((json)=> console.log("This is from deleting function : ",json));
};

// ************************************************************************************************************************************************


  return (
    <View style={styles.container}>
      <Modal animationType="fade" transparent={true} visible={showModal}>
        <View style={styles.create_classroom_centeredView}>
          {/* when clicked upload confirm button */}

          <View style={styles.create_classroom_modalView}>
            {!IsCreated ? (
              <>
                <TextInput
                  onChangeText={(input) => {
                    setClassroomForm({ ...ClassroomForm, Title: input });
                  }}
                  visible={true}
                  placeholder="Classroom title"
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholderTextColor={"lightgrey"}
                  style={styles.classroom_details_input}
                />
                <TextInput
                  onChangeText={(input) => {
                    setClassroomForm({ ...ClassroomForm, Subject: input });
                  }}
                  visible={true}
                  placeholder="Classroom Subject"
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholderTextColor={"lightgrey"}
                  style={styles.classroom_details_input}
                />
                <TextInput
                  onChangeText={(input) => {
                    setClassroomForm({ ...ClassroomForm, Description: input });
                  }}
                  visible={true}
                  placeholder="Classroom description"
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholderTextColor={"lightgrey"}
                  style={styles.classroom_details_input}
                />

                <TouchableOpacity
                  style={[styles.create_classroom_btn]}
                  onPress={() => {
                    createNewClassroom();
                  }}
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
         <Image source={require('../assets/lecture.png')} style={styles.icon_image}/>
        </View>  

        <Text style={styles.header_text}>My Classrooms</Text>


      </View>
      <View style={styles.scrollContainer}>
        <ScrollView
          // contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* contents */}

          {classroomList &&
            classroomList.map((obj) => (
              <ClassroomComponent
                key={obj._id}                             // id
                id = {obj._id}                            // key
                role = {route.params.role}
                title={obj.Title}                         //title
                subject={obj.Subject}                     //subject
                clickTocopyClickBoard={() => {            // function for Clipboard
                  Clipboard.setString(obj._id);
                  Alert.alert(
                    "Copied to clipboard",
                    "Classroom id has been copied"
                  );
                }}
                auth_token ={route.params.auth_token}   // user auth token 
                onPressClassroom={() => {               // on press classroom screen navigation
                  navigation.navigate("Classroom", {
                    'auth_token': route.params.auth_token,
                    'classroom_id': obj._id,
                    'role':route.params.role
                  });
                }}
                onPressDelete = {()=>{
                  onPressDelete(obj._id);
                }}
              />
            ))}
        </ScrollView>
      </View>

      {
      (route.params.role == 'TEACHER') &&(
      //   <Pressable
      //   style={styles.floating_button}
      //   onPress={() => {
      //     setShowModal((current) => !current);
      //     setIsCreated(false);
      //     setClassroomForm(initial_ClassroomForm);
      //   }}
      // >
      //   <Ionicons color={'white'} size={50} name='add'/>
      // </Pressable>
      <Pressable style={{marginBottom: 40, position:'absolute', bottom: 30, right: 20, backgroundColor: '#81c784', paddingHorizontal: 15, paddingVertical: 18, borderRadius: 14}}>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Ionicons name='add' size={30} style={{marginRight: 6}} color='white'/>
          <Text style={{color: 'white', fontSize: 20, marginRight: 6}}>Add new class</Text>
        </View>
      </Pressable>
      )

    }



      
    </View>
  );
}

const useStyle = () => {
  const { width, height } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f7520044",
    },
    header: {
      flex: 0.5,
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
      // fontWeight: "bold",
      fontSize: 30,
    },
    scrollContainer: {
      flex: 1,
      // padding: 25,
      paddingRight: 10,
      paddingLeft: 10,
      paddingTop: 10,
      backgroundColor: pallete.backgroundColor,
    },
    floating_button: {
      position: "absolute",
      bottom: 40,
      right: 20,
      backgroundColor: 'green',
      height: 60,
      width: 60,
      borderRadius: 50,
      display: 'flex',
      flexDirection: 'row',
      justifyContent:'center',
      alignItems:'center'
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
      height: height / 1.8,
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
      fontSize: width / 30,
      padding: 5,
      textAlign: "center",
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
  });

  return { styles };
};

export default ClassroomsContainer;

import React, { useState, useEffect, useContext, createContext } from "react";
import { Text, View, StyleSheet, ScrollView, BackHandler } from "react-native";

import ClassroomHeader from "../components/header";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { useRoute, useNavigation } from "@react-navigation/native";

// importing screens

import Classes from "./ClassroomScreens/Classes";
import Student from "./ClassroomScreens/Student";
import Teacher from "./ClassroomScreens/Teacher";
import Material from "./ClassroomScreens/Material";
import Discussion from "./ClassroomScreens/Discussion";


// Icons
import {
  Entypo,
  FontAwesome5,
  Octicons,
  FontAwesome,
} from "@expo/vector-icons";


//  Share data from single API call across material top tabs


//  https://stackoverflow.com/questions/63021232/react-navigation-5-x-share-data-from-single-api-call-across-material-top-tabs



// creating a new context using Context API

const ClasroomContext = createContext();                // this context will be available to all children (also children of a child)

// createContext()  ---> for creating context 

//  useContext()  ----> for using a context created


// exporting the context so it can be imported whenever needed

export {ClasroomContext};






function Materials() {
  const { styles } = useStyle();

  const navigation = useNavigation();
  const route = useRoute(); // auth_token |  classroom_id

  const [classroom_details, setClassroom_details] = useState([]);

// ******************************************************** Back handler *********************************************************************
  useEffect(() => {
    const backToDashboard = async () => {
      // add async  else it will navigate to login screen
      navigation.navigate("ClassroomsContainer", {
        auth_token: route.params.auth_token,
      });
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backToDashboard
    );

    return () => backHandler.remove();
  }, []);

// ******************************************************************************************************************************

  const Tab = createMaterialTopTabNavigator();

// ******************************************************************************************************************************


const [TodayClassesDataArray, setTodayClassesDataArray] = useState([]);
const [ScheduledClassesDataArray, setScheduledClassesDataArray] = useState([]);
const [TeachersDataArray, setTeachersDataArray] = useState([]);
const [StudentsDataArray, setStudentsDataArray] = useState([]);
const [MaterialsDataArray, setMaterialsDataArray] = useState([]);
const [DiscussionDataArray, setDiscussionDataArray] = useState([]);


// ******************************************************************************************************************************

let res = {};
  
const get_classroom = async ()=>{
    const url =
      "https://akshar-siksha.herokuapp.com/api/data/classroom/get/classroom/details/" +
      route.params.classroom_id;
    res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
    //   .then((data) => setClassroom_details(data.classroom_details));

      if(res.classroom_details._id){

        var start = new Date();
        start.setUTCHours(0, 0, 0, 0); // this give the start of a day
    
        var end = new Date();
        end.setUTCHours(23, 59, 59, 999); // this give the end of a day
    
        // Today's classes
    
        setTodayClassesDataArray(res.classroom_details.Classes.filter(
          (row) => new Date(row.dateTime) > start && new Date(row.dateTime) < end
        ))
    
        // Scheduled classes
        setScheduledClassesDataArray (res.classroom_details.Classes.filter(
          (row) => new Date(row.dateTime) > end
        ))
    
        // For students tab
    
        setStudentsDataArray(res.classroom_details.Students);
    
        // For teachers tab
    
        setTeachersDataArray(res.classroom_details.Teachers);
    
        // for material tab
    
        setMaterialsDataArray( res.classroom_details.Materials);
    
        // for discussion tab
    
        setDiscussionDataArray(res.classroom_details.Discussion);
      }

}


useEffect(() => {
  console.log("Running useeffect");

  get_classroom();

  }, []);


  // ******************************************************************************************************************************
  return (
    <>
      {res && (
        <ClasroomContext.Provider value={
            // these are the values that can be used using this ClassroomContext
            {
                TodayClassesDataArray,
                ScheduledClassesDataArray,
                StudentsDataArray,
                TeachersDataArray,
                MaterialsDataArray,
                DiscussionDataArray,
                classroom_id : route.params.classroom_id,
                auth_token: route.params.auth_token,
                role : route.params.role
                
            }
            
        }>
            <View>
            <ClassroomHeader />
          </View>
          <Tab.Navigator
            screenOptions={{
              tabBarLabelStyle: { fontSize: 12 },
              // tabBarItemStyle: { width: 100 },
              tabBarStyle: { backgroundColor: "white" },
              tabBarPressColor: "transparent",
              tabBarIconStyle: {
                width: 45,
                height: 45,
                // backgroundColor:"yellow",
                justifyContent: "center",
                alignItems: "center",
              },
              tabBarIndicatorStyle: {
                color: "green",
              },
            }}
          >
            <Tab.Screen
              options={{
                tabBarIcon: ({ color, focus }) => (
                  <Entypo name="blackboard" size={28} color="black" />
                ),
                tabBarLabel: () => {
                  return null;
                },
              }}
              component={Classes}
              name="Class"
            />

            <Tab.Screen
              options={{
                tabBarIcon: ({ color, focus }) => (
                  <FontAwesome name="child" size={32} color="black" />
                ),
                tabBarLabel: () => {
                  return null;
                },
              }}
              component={Student}
              name="Student"
            />

            <Tab.Screen
              options={{
                tabBarIcon: ({ color, focus }) => (
                  <FontAwesome5
                    name="chalkboard-teacher"
                    size={24}
                    color="black"
                  />
                ),
                tabBarLabel: () => {
                  return null;
                },
              }}
              component={Teacher}
              name="Teacher"
            />

            <Tab.Screen
              options={{
                tabBarIcon: ({ color, focus }) => (
                  <FontAwesome5 name="book-open" size={24} color="black" />
                ),
                tabBarLabel: () => {
                  return null;
                },
              }}
              component={Material}
              name="Material"
            />

            <Tab.Screen
              options={{
                tabBarIcon: ({ color, focus }) => (
                  <Octicons name="comment-discussion" size={24} color="black" />
                ),
                tabBarLabel: () => {
                  return null;
                },
              }}
              component={Discussion}
              name="Discussion"
            />
          </Tab.Navigator>
        </ClasroomContext.Provider>
          
      )}
    </>
  );
}

const useStyle = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    classroomHeader: {
      flex: 0.4,
    },
    // material_container:{
    //     flex:1
    // }
  });

  return { styles };
};
export default Materials;







// const data = [
//     {
//       id: 1,
//       topic: "Differential calculus",
//       subject: "Math",
//       teacher: "Krishnendu Dakshi",
//       dateTime: "2022-08-19T20:34:45Z",
//     },
//     {
//       id: 2,
//       topic: "Integral calculus",
//       subject: "Math",
//       teacher: "Krishnendu Dakshi",
//       dateTime: "2022-08-19T20:34:45Z",
//     },
//     {
//       id: 3,
//       topic: "Vector calculus",
//       subject: "Math",
//       teacher: "Krishnendu Dakshi",
//       dateTime: "2022-08-21T20:34:45Z",
//     },
//     {
//       id: 4,
//       topic: "Coordinate geometry",
//       subject: "Math",
//       teacher: "Krishnendu Dakshi",
//       dateTime: "2022-08-22T20:34:45Z",
//     },
//     {
//       id: 5,
//       topic: "Algebra",
//       subject: "Math",
//       teacher: "Krishnendu Dakshi",
//       dateTime: "2022-08-19T20:34:45Z",
//     },
//   ];
  
//   // now sort the Classes according to Today and Scheduled
  
//   // Today's classes
//   const TodayClassesArray = data.filter(
//     (row) => new Date(row.dateTime) > start && new Date(row.dateTime) < end
//   );
  
//   // Scheduled classes
//   const ScheduledClassesArray = data.filter(
//     (row) => new Date(row.dateTime) > end
//   );
  
//   // exporting these arrays to TodayClass tab and scheduledClasss tab
  
//   export { TodayClassesArray, ScheduledClassesArray };
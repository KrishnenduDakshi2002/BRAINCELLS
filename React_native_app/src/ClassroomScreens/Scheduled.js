import React ,{useContext,useState,useEffect}from 'react'
import { Text, View , StyleSheet, ScrollView,Pressable, RefreshControl,Modal,TextInput,TouchableOpacity,Image,useWindowDimensions,Alert} from 'react-native'

//importing classc component
import ClassComponent from '../../components/ClassComponent';


import DateTimePicker from '@react-native-community/datetimepicker';

import moment  from 'moment';


import { AntDesign} from '@expo/vector-icons';

// importing the classroom context from classroom.js

import { ClasroomContext } from '../Classroom';


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
  return new Promise(resolve => setTimeout(resolve, timeout));
}



function ScheduledClass() {

    const {styles} = useStyle();

    const [refreshing, setRefreshing] = React.useState(false);

    var initial_classform ={
      topic : '',
      subject : '',
      teacher : ''
    }

    const [classForm, setClassForm] = useState(initial_classform)


    // visibility of modal
    const [showModal, setShowModal] = useState(false);

    // is create classroom
    const [IsCreated, setIsCreated] = useState(false);

//******************************************************* Date time picker start ****************************************************************

    // for datetime picker
    // for datetime picker
    let initial_text = "";
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('data');
    const [show, setShow] = useState(false);
    const [text, setText] = useState(initial_text);


    const onChangeDateTime = (selectedDate)=>{
        
      const inputDate = selectedDate['nativeEvent']['timestamp']
      const currentDate = new Date(inputDate) || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);      

      let currentDateStamp = 
      
      currentDate.getFullYear()+'-'
      
      +String(currentDate.getMonth()+1).padStart(2, '0')+'-'
      +String(currentDate.getDate()).padStart(2, '0')+'T'
      +String(currentDate.getHours()).padStart(2, '0')+':'
      +String(currentDate.getMinutes()).padStart(2, '0')+':'
      +String(currentDate.getSeconds()).padStart(2, '0')+'Z';
      setText(currentDateStamp);
      console.log(currentDateStamp);
  }

    const showMode = (currentMode)=>{
        setShow(true);
        setMode(currentMode);

    }
    

    //******************************************************* Date time picker end ****************************************************************



    const context  = useContext(ClasroomContext);   // we want to use this ClassroomContext
    

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      
      wait(2000).then(() => setRefreshing(false));
    }, []);


    // console.log(context.ScheduledClassesDataArray);

    // ************************************************************************************************************************************************
    const createNewClass = async() => {
      console.log("running create classroom");
      if (!classForm.topic && !classForm.subject) {
        Alert.alert("Topic and subject are mandatory fields");
        return;
      }
  
        const url = 'https://akshar-siksha.herokuapp.com/api/data/classroom/post/class/'+context.classroom_id;
        const res = await fetch(url,{
          method: 'POST', 
          headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer '+ context.auth_token
          },
          body: JSON.stringify({
            "topic": classForm.topic,
            "subject" : classForm.subject,
            "teacher" : classForm.teacher,
            "dateTime" : text
          })
        })
          .then((response) => response.json())
  
      if (res.status === 201) {
        setIsCreated((current) => !current);
      } else if (res.status === 400) {
        Alert.alert("Coudn't create class");
      }
    };
  

// ************************************************************************************************************************************************



  return (
    <>
    {show && (
        <DateTimePicker
        testID='dateTimePicker'
        mode = {mode}
        onChange = {onChangeDateTime}
        is24Hour = {true}
        display = "default"
        value = {date}
        
        />
    )}

  <Modal animationType="fade" transparent={true} visible={showModal}>
        <View style={styles.create_classroom_centeredView}>
          {/* when clicked upload confirm button */}

          <View style={styles.create_classroom_modalView}>
            {!IsCreated ? (
              <>
                <TextInput
                  onChangeText={(input) => {
                    setClassForm({ ...classForm, topic: input });
                  }}
                  visible={true}
                  placeholder="Class topic"
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholderTextColor={"lightgrey"}
                  style={styles.classroom_details_input}
                />
                <TextInput
                  onChangeText={(input) => {
                    setClassForm({ ...classForm, subject: input });
                  }}
                  visible={true}
                  placeholder="Class Subject"
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholderTextColor={"lightgrey"}
                  style={styles.classroom_details_input}
                />
                <TextInput
                  onChangeText={(input) => {
                    setClassForm({ ...classForm, teacher: input });
                  }}
                  visible={true}
                  placeholder="Class teacher"
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholderTextColor={"lightgrey"}
                  style={styles.classroom_details_input}
                />

                { (text !== "") &&(
                  <Text>{moment(text).calendar()}</Text>)

                }

                <View style={styles.dateTimeContainer}>
                  <Pressable onPress={()=>{showMode('date')}}>
                    <Image source={require('../../assets/calendar.png')} style={{width: 50,height:50}}/>
                  </Pressable>
                  <Pressable onPress={()=>{showMode('time')}}>
                    <Image source={require('../../assets/clock.png')} style={{width: 50,height:50}}/>
                  </Pressable>
                </View>



                <TouchableOpacity
                  style={[styles.create_classroom_btn]}
                  onPress={() => {
                    createNewClass();
                  }}
                >
                  <Image
                    source={require("../../assets/plus.png")}
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
                    source={require("../../assets/delete.png")}
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
                  source={require("../../assets/check.png")}
                  style={{ width: 150, height: 150 }}
                />
              </Pressable>
            )}
          </View>
        </View>
    </Modal>
      <ScrollView 
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator = {false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      >
          {
              context.ScheduledClassesDataArray.map((class_obj)=> <ClassComponent 
              key = {class_obj._id}
              topic = {class_obj.topic}
              subject = {class_obj.subject}
              teacher = {class_obj.teacher}
              dateTime = {(class_obj.dateTime)}
              />)
          }
      </ScrollView>

      {
      (context.role === 'TEACHER') &&(
        <Pressable style={styles.floating_button} onPress={()=> {
          setText(initial_text);
          setShowModal((current) => !current);
          setIsCreated(false);
  
        }
          }>
        <AntDesign name="pluscircle" size={55} color="black" />
      </Pressable>
      )

    }

    </>
  )
}


const useStyle = ()=>{

  const {width,height} = useWindowDimensions();
    const styles = StyleSheet.create({
      container:{
        padding: 25,
        paddingRight : 25
      },
      floating_button:{
        position:"absolute",
        bottom: 80,
        right : 50,
        backgroundColor:"white",
        borderRadius: 50
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
      height: height / 1.5,
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
    dateTimeContainer:{
      width:width/1.5,
      flexDirection:"row",
      justifyContent:"space-evenly"
    }

    })
  
    return {styles}
  }
  
  

export default ScheduledClass
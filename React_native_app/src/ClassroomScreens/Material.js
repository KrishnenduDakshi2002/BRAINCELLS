
import * as ImagePicker from 'expo-image-picker';

import * as DocumentPicker from 'expo-document-picker';

import { initializeApp } from 'firebase/app';
import { getStorage, ref ,uploadBytes, getDownloadURL,uploadBytesResumable} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAn6I2uIF2zYnq2jAR61gbSvNB8YBUr_Zs",
  authDomain: "akshar-siksha.firebaseapp.com",
  projectId: "akshar-siksha",
  storageBucket: "akshar-siksha.appspot.com",
  messagingSenderId: "172146470008",
  appId: "1:172146470008:web:2884e80c6562839c75d18d",
  measurementId: "G-CWVJ34VYN6"
};


// importing classroom context
import { ClasroomContext } from '../Classroom';


import React ,{useState,useEffect,useContext}from 'react'
import { Text, 
  View , 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Pressable, 
  TextInput,
  useWindowDimensions,
  Modal,
  Animated,
  Image,
  RefreshControl,
  Alert,

} from 'react-native'


import MaterialComponent from '../../components/MaterialComponent';

import { AntDesign ,FontAwesome,Ionicons} from '@expo/vector-icons';


const pallete = {
  
  upload_model_bgc : '#FF9933',
  upload_model_continue_btn : '#28800b',
  upload_model_close_btn : '#28800b',
}

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


function Material() {


  const {styles} = useStyle();

  const [IsUploaded, setIsUploaded] = useState(false);

  const [IsChoosen, setIsChoosen] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [doc, setDoc] = useState(null);

  const [url, setUrl] = useState("");

  const [filename, setFilename] = useState("");

  const [resetWidth, setResetWidth] = useState(false);

  let percentageValue = 0;

  const app = initializeApp(firebaseConfig);

  const storage = getStorage();

  const [materialTopic, setMaterialTopic] = useState("Material");

  const [refreshing, setRefreshing] = React.useState(false);

  // using context from classroomcontext
  const context  = useContext(ClasroomContext);   // we want to use this ClassroomContext
  // const [DataArray, setDataArray] = useState(context.StudentsDataArray);
  let DataArray = context.MaterialsDataArray;



  const onRefresh = React.useCallback(async() => {
    setRefreshing(true);

    const url =
      "https://akshar-siksha.herokuapp.com/api/data/classroom/get/refresh/materials/" +context.classroom_id
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())

      DataArray = res.refresh_response.Materials

    wait(2000).then(() => setRefreshing(false));
  }, []);



  // how to use width for animated value
  // https://www.codedaily.io/courses/Master-React-Native-Animations/Width-Height-Percentage

  const barwidth = useState(new Animated.Value(0))[0];

  const finalWidth = barwidth.interpolate({
    inputRange: [0,1],
    outputRange : ["0%" , "100%"]
  }) // final width will be provided from the firebase snapshot


  const startAnimation = ()=>{
    Animated.timing(barwidth,{
      toValue : percentageValue,                 // input range -> [0,1] 0 --> 0% width | 1 ---> 100% width
      delay : 100,
      useNativeDriver : false
    }).start();
  }


  const askPermission = ()=>{
    (async ()=>{
        if (Platform.OS !== 'web'){
            const {status}= await ImagePicker.requestMediaLibraryPermissionsAsync();
            if( status !== 'granted'){
                Alert.alert('We need your permissions');
            }
        }
    })();
  }

  const pickDocument = async ()=>{
    let result = await DocumentPicker.getDocumentAsync({
    })

    console.log(result);
    setFilename(result.name);
    console.log(filename);

    if (!result.cancelled) {
        setDoc(result.uri);
      }

    setIsChoosen(current => !current);
    setIsUploaded(current => !current);

  }

  const current_time = new Date().toISOString();
  const UploadfileName = 'materials'+'/'+context.classroom_id+'/'+current_time+'_'+filename;

  const uploadDoc = async()=>{
        

    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function() {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', doc, true);
        xhr.send(null);
      });


    const storageRef = ref(storage,UploadfileName);

    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on('state_changed', 
    (snapshot) => {
    
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes);

      percentageValue = progress;
      startAnimation();
      console.log('Upload is ' + progress*100 + '% done');

    }, 
    (error) => {
      // Handle unsuccessful uploads
      Alert.alert("File upload unsucessful");
    }, 
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log(downloadURL);
        setUrl(downloadURL);
      });
    }
  );

    // // Pushing data and link to database

    if(url){
      const material_url = 'https://akshar-siksha.herokuapp.com/api/data/classroom/post/materials/'+ context.classroom_id;
  
      const res = await fetch(material_url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer '+ context.auth_token
        },
        body: JSON.stringify({
          topic: materialTopic,
          link : url
        })
      }).then((res)=> res.json())
      .then((json)=> console.log(json));
    }

    
  }

  

  return (
    <>

    {/* Modal for upload password implemenation */}
    <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
      >
        <View style={styles.upload_centeredView}>

          {/* when clicked upload confirm button */}

            <View style={styles.upload_modalView}>

              {/* will be visible when file is uploaded */}

            {/* this will be rendered when the file is uploaded */}

            {
              IsUploaded && (

                <>
                <View name= "icon and file name"
                style={styles.uploaded_file}
                >
                    <View style={styles.icon_and_text_container}>
                      {/* <AntDesign name="filetext1" size={32} color="black" style={styles.file_icon} /> */}

                      <Image source={require('../../assets/pdf.png')} style={{width: 35, height:35}}/>
                      <Text style={styles.filename}>{filename}</Text>
                    </View>
                </View>


                <View name = "progress bar" style={styles.progressBar_container}>
                <Animated.View style={[styles.progressBar,{width: resetWidth ? 0 : finalWidth}]}>
                </Animated.View>
                </View>
                
                </>

              )
                
            }

            {
              IsChoosen && (
                <>
                <TextInput
                  onChangeText={(topic)=>{setMaterialTopic(topic)}}
                  visible={true}
                  placeholder="On which Topic"
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholderTextColor={"lightgrey"}
                  style={styles.classroom_details_input}
                />
                  <View name= "Upload file view"
                  style={[styles.uploaded_file,{borderStyle:'dashed',borderWidth:2,borderColor:"black",backgroundColor:"transparent"}]}
                  >
                      <View style={[styles.icon_and_text_container,{justifyContent:"center"}]}>
                          <TouchableOpacity onPress={pickDocument}>
                          <Text style={{fontSize: 15}}>Choose Material</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
                
                  
                </>

              )
            }

                

            

            <Pressable
              style={[ styles.upload_buttonClose]}
              onPress={uploadDoc}
            >
              <Text style={styles.textStyle}>Upload</Text>
            </Pressable>
            <Pressable
              style={[ styles.upload_buttonClose]}
              onPress={()=>setShowModal(current => !current)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>

          </View>


        </View>
        
    </Modal>


      <View style={styles.search_filter}>
        <View style = {styles.search_container}>
          <TextInput style={styles.text_input}/>
          <FontAwesome name="search" size={24} color="black" />
        </View>
        {/* <View style={styles.filter_btn}>
          <Ionicons name="filter" size={24} color="black" />

        </View> */}
      </View>
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


      { DataArray &&
        DataArray.map((row)=>
        <MaterialComponent
        key = {row._id}
        topic ={row.topic}
        provided_by ={row.provided_by.first_name + " "+row.provided_by.last_name}
        dateTime = {row.dateTime}
        link = {row.link}
        />
        )
      }
          

      </ScrollView>
      {
        (context.role === "TEACHER") &&
        (
          <Pressable style={styles.floating_button} onPress={()=> {
            askPermission();
            setShowModal(current => !current);
    
    
            // resetting the values for new upload
    
            if(!IsChoosen){
              setIsChoosen(current => !current);
            }
            if(IsUploaded){
              setIsUploaded(current => !current);
            }
    
            percentageValue = 0;
    
            // resetting ends here
    
    
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


    // MODAL START

    upload_centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:"rgba(255, 255, 255,1)"
    },
    upload_modalView: {
      width: width /1.3,
      height: height/1.5,
      justifyContent:"center",
      alignItems:"center",
      margin: 20,
      backgroundColor: pallete.upload_model_bgc,
      borderRadius: 50,
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
    upload_pass_input:{
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
    upload_buttonClose: {
      width: width/ 2,
      borderRadius: 20,
      padding:10,
      elevation: 2,
      backgroundColor: pallete.upload_model_continue_btn,
      marginTop:width/20,
    },
    textStyle:{

      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 15,
    
    },

    progressBar_container:{
      backgroundColor:"white",
      width: width/1.5,
      borderRadius: 50,
      padding: 3,
      height : 20,
    
    },
    progressBar:{
      backgroundColor : "dodgerblue",
      borderRadius: 50,
      height : '100%'
    },
    uploaded_file:{
      width: width/1.5,
      backgroundColor:"white",
      marginBottom: 50,
      borderRadius: 25,
      padding: 20
    },
    icon_and_text_container:{
      flexDirection: "row",
      alignItems:"center"

    },
    filename:{
      flex: 1,
      fontSize: width/20,
      paddingLeft: 15,
    },
    file_icon:{
      flex: 0.2,
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


    // MODAL END

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
    search_filter:{
      margin:25,
      flexDirection:"row"
    },
    search_container:{
      flex:1,
      flexDirection:"row",
      backgroundColor:"white",
      height: height/15,
      justifyContent:"center",
      alignItems:"center",
      borderRadius: 15
    },
    filter_btn:{
      flex:0.2,
      justifyContent:"center",
      alignItems:"center"
    },
    text_input:{
      width:200
    },
    
  })

  return {styles}
}

export default Material
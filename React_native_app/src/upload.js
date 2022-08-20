

import * as ImagePicker from 'expo-image-picker';

import * as DocumentPicker from 'expo-document-picker';

import { initializeApp } from 'firebase/app';
import { getStorage, ref ,uploadBytes, getDownloadURL,uploadBytesResumable} from "firebase/storage";

import React, {useEffect,useState} from 'react'
import { View , StyleSheet, Text, Image, Button, Platform, Alert} from 'react-native';



const firebaseConfig = {
    apiKey: "AIzaSyAn6I2uIF2zYnq2jAR61gbSvNB8YBUr_Zs",
    authDomain: "akshar-siksha.firebaseapp.com",
    projectId: "akshar-siksha",
    storageBucket: "akshar-siksha.appspot.com",
    messagingSenderId: "172146470008",
    appId: "1:172146470008:web:2884e80c6562839c75d18d",
    measurementId: "G-CWVJ34VYN6"
  };


function Upload() {

    const {styles} = useStyle();


    const [image, setImage] = useState(null);
    const [doc, setDoc] = useState(null);

    const [url, setUrl] = useState("");

    const app = initializeApp(firebaseConfig);


    const storage = getStorage();


    useEffect(()=>{
        (async ()=>{
            if (Platform.OS !== 'web'){
                const {status}= await ImagePicker.requestMediaLibraryPermissionsAsync();
                if( status !== 'granted'){
                    Alert.alert('We need your permissions');
                }
            }
        })();
    },[])

    const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
    };


    const uploadImage = async ()=>{
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function() {
              resolve(xhr.response);
            };
            xhr.onerror = function() {
              reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', image, true);
            xhr.send(null);
          });


        //   const reference = storage.ref().child(new Date().toISOString());
        const storageRef = ref(storage,'images/mountain.jpg');

        uploadBytes(storageRef, blob).then((snapshot) => {
            console.log('Uploaded a blob or file!');
          });
          
    }



    const pickDocument = async ()=>{
        let result = await DocumentPicker.getDocumentAsync({
        })


        console.log(result.name);

        if (!result.cancelled) {
            setDoc(result.uri);
          }

    }

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


        //   const reference = storage.ref().child(new Date().toISOString());
        const storageRef = ref(storage,'doc/sample2.pdf');

        // uploadBytes(storageRef, blob).then((snapshot) => {
        //     console.log('Uploaded a blob or file!');

        //   });
        const uploadTask =  uploadBytesResumable(storageRef, blob);

        uploadTask.on('state_changed',
        (snapshot)=>{
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        })
          
    }



    // to download simple from a URL 

    const generateUrl = ()=>{

        // 1. first need to create a refernce to the file
    
        const getFileRef = ref(storage, 'doc/sample.pdf');
    
    
        // 2. get the download url
        getDownloadURL(getFileRef).then((url)=>{
            console.log(url);

            setUrl(url);
        })
    

    }    



  return (
    <View style={styles.container}>
       <Image source={{uri : image}} style={{width:150,height:150}}/>
       <Button title='choose file' onPress={pickDocument}></Button>
       <Button title='Upload file' onPress={uploadDoc}></Button>
       <Button title='generate url' onPress={generateUrl}></Button>
    </View>
  )
}



const useStyle = ()=>{

    const styles = StyleSheet.create({
        container:{
            flex:1,
            justifyContent:'center',
            alignItems:"center"
        }
    })

    return {styles}
}

export default Upload




import React, {useState} from 'react'

import { View , StyleSheet, Text, Image, Button, Platform, Alert} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import moment from 'moment';

const data = [
    {"dateTime": "2022-01-12T12:45:34Z", "id":0},
    {"dateTime": "2022-01-13T12:45:34Z", "id":1},
    {"dateTime": "2022-01-13T21:45:34Z", "id":2},
    {"dateTime": "2022-01-14T22:45:34Z", "id":3},
    {"dateTime": "2021-02-02T12:45:34Z", "id":4},
    {"dateTime": "2022-02-12T17:45:34Z", "id":5},
    {"dateTime": "2020-02-12T20:45:34Z", "id":6},
]



function DatetimePicker() {

   
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState("Empty");


    function padding(){

    }

    const onChangeDateTime = (selectedDate)=>{
        
        const inputDate = selectedDate['nativeEvent']['timestamp']

        const currentDate = new Date(inputDate) || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        console.log(currentDate)

        let timeStamp = 
      
      currentDate.getFullYear()+'-'
      
      +String(currentDate.getMonth()+1).padStart(2, '0')+'-'
      +String(currentDate.getDate()).padStart(2, '0')+'T'
      +String(currentDate.getHours()).padStart(2, '0')+':'
      +String(currentDate.getMinutes()).padStart(2, '0')+':'
      +String(currentDate.getSeconds()).padStart(2, '0')+'Z';
        setText(timeStamp);

    }

    const showMode = (currentMode)=>{
        setShow(true);
        setMode(currentMode);
    }
    let startDate = '2022-01-01T12:45:34Z';

    // sorting dateTime
    const sortDateTime = ()=>{
        data.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.dateTime) - new Date(a.dateTime);
          });

          console.log(data);
    }

    // filtering datetime
    const filterDateTime = ()=>{

        const result = data.filter(row => new Date(row.dateTime) < new Date(startDate))
        console.log(result);
    }



    const {styles} = useStyle();

  return (
    <View style={styles.container}>
        <Text>{text}</Text>
       <Button title='choose Date' onPress={()=>{showMode('date')}}></Button>
       <Button title='choose Time' onPress={()=>{showMode('time')}}></Button>
       <Button title='Sort' onPress={sortDateTime}></Button>
       <Button title='filter' onPress={filterDateTime}></Button>



       {show && date &&(
        <DateTimePicker
        testID='dateTimePicker'
        mode = {mode}
        onChange = {onChangeDateTime}
        is24Hour = {true}
        display = "default"
        value = {date}
        
        />
       )}
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

export default DatetimePicker
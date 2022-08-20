import React, {useState} from 'react'

import { View , StyleSheet, Text, Image, Button, Platform, Alert} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import moment from 'moment';


const DateTimeModule = ()=>{

    const [date, setDate] = useState(moment().utc(true).toDate());
    const [mode, setMode] = useState('data');
    const [show, setShow] = useState(false);
    const [text, setText] = useState("");

    let tempDate = '';

    const onChangeDateTime = (selectedDate)=>{

        const inputDateTime = selectedDate['nativeEvent']['timestamp'];

        const currentDate = inputDateTime || date ;
        setShow(Platform.OS === 'ios');

        console.log("running onchange date time")
        console.log("input date -",currentDate);
        tempDate = moment(currentDate).format();
        
        console.log("input date after passing -",tempDate);

        setText(tempDate);

    }

    const showMode = (currentMode)=>{
        setShow(true);
        setMode(currentMode);

        
    }


}

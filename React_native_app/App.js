
import { CurrentRenderContext, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text ,View, StyleSheet, Pressable} from 'react-native';

import Registration from './src/registrationScreen';
import Login from './src/Login';
import OTPScreen from './src/otpScreen';
import Upload from './src/upload';
import DatetimePicker from './src/datetimePicker';
import Classroom from './src/Classroom';
import UserDashBoard from './src/UserDashBoard';
import ClassroomsContainer from './src/ClassroomContainerScreen';
import TestContainer from './src/TestContainerScreen';
import Answersheets from './src/answerSheet';
import UploadAnswerSheetScreen from './src/uploadAnswerSheet';
import VideoPlayer from './src/video';

import BookScreen from './src/BookScreen';


const Stack = createNativeStackNavigator();


export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{header: ()=> null}}>

        <Stack.Screen name='Login' component={Login }/>
        <Stack.Screen name='Registration' component={Registration }/> 
        <Stack.Screen name='OTPScreen' component={OTPScreen }/>
        <Stack.Screen name='UserDashBoard' component={UserDashBoard}/>
        <Stack.Screen name='Classroom' component={Classroom }/> 
        <Stack.Screen name='ClassroomsContainer' component={ClassroomsContainer} />
        <Stack.Screen name='TestContainer' component={TestContainer} />
        <Stack.Screen name='AnswerSheets' component={Answersheets} />
        <Stack.Screen name='UploadAnswerSheetScreen' component={UploadAnswerSheetScreen} />
        {/* <Stack.Screen name='BookScreen' component={BookScreen} /> */}

        {/* <Stack.Screen name='VideoPlayer' component={VideoPlayer}/> */}
      
        {/* <Stack.Screen name='DatetimePicker' component={DatetimePicker }/> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
}

import {
  createContext,
  useEffect,
  useState,
} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as English from './Languages/English.json';
import AddEventScreen from './src/AddEvent';
import AllCategoriesScreen from './src/AllCategoriesScreen';
import Answersheets from './src/answerSheet';
import { BookScreen } from './src/Books';
import Classroom from './src/Classroom';
import ClassroomsContainer from './src/ClassroomContainerScreen';
import DashboardTest from './src/dashboardTest';
import DonateScreen from './src/DonateScreen';
import EventDetails from './src/EventDetails';
import EventScreen from './src/EventScreen';
import { GadgetScreen } from './src/Gadgets';
import LoginScreen from './src/Login';
import OTPScreen from './src/otpScreen';
import ProfileScreen from './src/ProfileScreen';
import RegistrationScreen from './src/registrationScreen';
import SearchScreen from './src/SearchScreen';
import { StationaryScreen } from './src/Stationary';
import TestContainer from './src/TestContainerScreen';
import UploadAnswerSheetScreen from './src/uploadAnswerSheet';
import UserDashBoard from './src/UserDashBoard';

// import video from './src/video';

//Hello
const Stack = createNativeStackNavigator();

const RootContext = createContext();  
export {RootContext};
export default function App() {
  useEffect(() => {
    setLanguage(English.default.translation);
  },[]);
  const [language, setLanguage] = useState(English.default.translation);
  return (
    <RootContext.Provider value={{
      language,
      setLanguage
    }}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{header: ()=> null}}>

        <Stack.Screen name='Login' component={LoginScreen}/>
        <Stack.Screen name='Registration' component={RegistrationScreen}/> 
        <Stack.Screen name='OTPScreen' component={OTPScreen}/>
        <Stack.Screen name='UserDashBoard' component={UserDashBoard}/>
        <Stack.Screen name='Classroom' component={Classroom}/> 
        <Stack.Screen name='ClassroomsContainer' component={ClassroomsContainer} />
        <Stack.Screen name='TestContainer' component={TestContainer} />
        <Stack.Screen name='AnswerSheets' component={Answersheets} />
        <Stack.Screen name='UploadAnswerSheetScreen' component={UploadAnswerSheetScreen} />
        <Stack.Screen name='DashboardTest' component={DashboardTest }/>
        <Stack.Screen name='Books' component={BookScreen }/>
        <Stack.Screen name='Stationary' component={StationaryScreen }/>
        <Stack.Screen name='Gadgets' component={GadgetScreen }/>
        <Stack.Screen name='AllCategories' component={AllCategoriesScreen}/>
        <Stack.Screen name='Search' component={SearchScreen}/>
        <Stack.Screen name='Donate' component={DonateScreen}/>
        <Stack.Screen name='Event' component={EventScreen}/>
        <Stack.Screen name='EventDetails' component={EventDetails}/>
        <Stack.Screen name='AddEvent' component={AddEventScreen}/>
        <Stack.Screen name='Profile' component={ProfileScreen}/>

        {/* <Stack.Screen name='Video' component={video}/> */}
      
        {/* <Stack.Screen name='DatetimePicker' component={DatetimePicker }/> */}

      </Stack.Navigator>
    </NavigationContainer>

    </RootContext.Provider>
  );
}

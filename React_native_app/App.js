
import { CurrentRenderContext, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text ,View, StyleSheet, Pressable} from 'react-native';


import Registration from './src/registrationScreen';
import Login from './src/Login';
import TestDashBoard from './src/TestDashBoard';
import OTPScreen from './src/otpScreen';


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{header: ()=> null}}>

        <Stack.Screen name='Login' component={Login }/>
        <Stack.Screen name='TestDashBoard' component={TestDashBoard }/>
        <Stack.Screen name='Registration' component={Registration }/> 
        <Stack.Screen name='OTPScreen' component={OTPScreen }/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

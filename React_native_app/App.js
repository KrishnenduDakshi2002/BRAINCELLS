
import { CurrentRenderContext, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text ,View, StyleSheet, Pressable} from 'react-native';


import Registration from './src/registrationScreen';
// import Login from './src/loginScreen';
import Login from './src/Login';
const Stack = createNativeStackNavigator();





export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator      screenOptions={{
        header: ()=> null
      }}
      >
        <Stack.Screen 
        name='Login' 
        component={Login }
        options={{
          header: ()=> null
        }}/>
        <Stack.Screen name='Registration' component={Registration }/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

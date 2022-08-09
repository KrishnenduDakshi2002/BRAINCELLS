
import { CurrentRenderContext, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect,useRef,useState } from 'react';
import { Text ,View, StyleSheet, Pressable,Animated, TouchableWithoutFeedback} from 'react-native';

const Stack = createNativeStackNavigator();




export default function Registration({navigation}){


    const onPressHandler = ()=>{
      navigation.goBack();
    }

    // const progress = useRef(new Animated.Value(0)).current;
    const progress = useState(new Animated.Value(0))[0];
    const rotatation = useState(new Animated.Value(0))[0];
    const [press,setPress] = useState(false);
  
  
      Animated.timing(progress,{toValue:-100,delay:100,useNativeDriver : true})
      .start(({press})=>{
        Animated.timing(progress,{toValue:50,delay:100,useNativeDriver : true})
      .start();
      });
      Animated.timing(rotatation,{toValue:1,delay:100,useNativeDriver : true}).start();

      // Next, interpolate beginning and end values (in this case 0 and 1)
      const spin = rotatation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '1024deg']
      });


    return(      
    
      <View style={styles.body}>
        <Animated.View style={[styles.square,
          {transform:[{translateY: progress}]}]}>

        </Animated.View>

        <TouchableWithoutFeedback onPress={()=>{setPress(!press)}}>
          <Text>
            Click me
          </Text>
        </TouchableWithoutFeedback>
      </View>
    )
  }
  
  

  
const styles = StyleSheet.create({
  
    body:{
      flex:1,
      justifyContent: 'center',
      alignItems : 'center',

    },
    square:{
      width: 100,
      height:100,
      backgroundColor: 'rgba(0,0,256,0.5)'
    }
})


// NAVIGATION IMPORT

import { CurrentRenderContext, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//NATIVE COMPONENTS IMPORT

import { Text ,View, 
    StyleSheet, Pressable,
    ImageBackground,
    useWindowDimensions,
    StatusBar,
    SafeAreaView,
    Image,
    KeyboardAwareScrollView,
    ScrollView,
} from 'react-native';


// ICONS IMPORT

import { Ionicons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';

//
import KeyboardAvoidingWrapper from '../components/keyboardAvoidingWrapper';


const Stack = createNativeStackNavigator();


export default function Login({navigation}){
    
    
  
    // STYLES
    const {styles} = useStyle();

    // NAVIGATION
    const onPressHandler = ()=>{
      navigation.navigate('Registration');
    }
  
    return(

        
        <ImageBackground style={styles.body}>

            <SafeAreaView>

                <View style={styles.backArrowContainer}>
                    <View style={styles.backArrow}>
                        <Ionicons name="chevron-back" size={32} color="black" />
                    </View>
                </View>
                <ScrollView 
                style={styles.scrollview}
                contentContainerStyle={styles.contentContainer}>

                    <View style={styles.logo}>
                        <View style={styles.logoCircle} >
                            {/* <Image 
                            resizeMethod ={'contain'}
                            source={require('../assets/BrainCells.jpg')}
                            width = {'300'}/> */}
                            <Text/>

                        </View>
                    </View>

                    <View style={styles.loginForm}>

                        <View name={'Welcome text'} style={styles.LoginTextContainer}>
                            <Text style={styles.loginText} >Welcome</Text>
                        </View>

                        <View name={'Form'} style={styles.formContainer}>

                            <View name={'Email'} style={{flex:1}}>
                                <TextInput
                                style={styles.email}
                                placeholder = {'Email Address'}
                                
                                />
                            </View>

                            <View name={'Password'} style={{flex:1}}>
                            <TextInput
                                style={styles.password}
                                placeholder = {'Password'}
                                secureTextEntry ={true}
                                />

                            </View>

                        </View>

                        <View name={'Login button'} style={styles.loginBtn}>

                        </View>

                    </View>
                </ScrollView>

            </SafeAreaView>

        </ImageBackground>


    )
  }
  
  

  const useStyle = ()=>{

    // getting dimensions of screen
    const { height, width } = useWindowDimensions();

      const styles = StyleSheet.create({
    
        body:{
          flex:1,
          justifyContent: 'center',
          alignItems : 'center',
    
        },
        text:{
          fontSize: 40,
          fontWeight:'bold',
    
        },
    
        backArrowContainer:{
            flex : 0.1,  // 1/10 th view
            flexDirection : "row",
            backgroundColor: "red",
            width : width - 20,
            marginTop: StatusBar.currentHeight
        },
        backArrow:{
            backgroundColor : "white",
            marginLeft : "3%",
            justifyContent : "center",
            alignItems : "center",
        },
        scrollview:{
            flex:1,
            backgroundColor: "black",
        },

        contentContainer:{
            flexGrow:1,
            justifyContent:"center",
            alignItems:"center",

        },
        logo:{
            flex : 1,
            backgroundColor : "blue",
            height: 200,
            width : width - 20,
            justifyContent : "center",
            alignItems : "center",
        },
        logoCircle:{
            flex:1,
            backgroundColor:"white",
            width : "50%",
            // elevation : 1,
            borderRadius : 100,

        },
        loginForm:{
            flex:2,
            height: 500,
            backgroundColor :"yellow",
            width : width - 20,
        },
        LoginTextContainer:{
            flex:0.5,
            backgroundColor :"green",
            marginTop:"2%",
            marginBottom:"2%",
            padding: 10,
            justifyContent:"center",
            
        },
        loginText:{
            fontSize:25,
        },
        formContainer:{
            flex:2,
            backgroundColor :"dodgerblue",
            
        },
        email:{
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            borderRadius : 50

        },
        password:{
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            borderRadius : 50

        },
        loginBtn:{
            
            flex:1.5,
            backgroundColor :"skyblue",
        },
        


    
    })

    return {styles}

  }

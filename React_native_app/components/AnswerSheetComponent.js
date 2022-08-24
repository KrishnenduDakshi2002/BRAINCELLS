import React from "react";

import { Text,
    View,
    StyleSheet, 
    useWindowDimensions ,
    Pressable,
    TouchableWithoutFeedback,
    Image

} from "react-native";

import * as Linking from 'expo-linking';

const MaterialComponent = (props) => {
    const {styles}= useStyle();


    const openLink = (link)=>{
        Linking.openURL(link);
    }


  return (
    
    <View style={styles.container}>
        <Pressable style={{justifyContent:"center",alignItems:"center", marginRight: 15}} 
        onPress={()=>{
            openLink(props.link);
        }}
        >
            <View style={styles.icon}>
                <Image source={require('../assets/pdf.png')} style={{width:40, height:40}}/>
            </View>
        </Pressable>
        <View style={styles.details}>
            <Text style={styles.provided_by}>{props.provided_by}</Text>
        </View>
        
    </View>
  );
};


const useStyle = ()=>{
    
    const {height, width} = useWindowDimensions();
    const styles = StyleSheet.create({
        container:{
            flexDirection:'row',
            backgroundColor: "#04cc75",
            width : '100%',
            height : width/4,
            padding: 15,
            borderRadius: 25,
            marginBottom: 15
        },
        icon:{
            flex:0.3,
            alignItems:"center",
            paddingTop: 10,
            justifyContent:"center",
            alignItems:"center"
        },
        details:{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:"#b0f5cc",
            borderRadius:20
            
        },
        topic:{
            marginTop:10,
            width:'100%',
            fontSize: height/45,
            fontWeight :"bold",
            marginBottom : height/50
        },
        
        provided_by:{
            
            width:'100%',
            fontSize: height/40,
            marginBottom : height/70,
            textAlign:"center"
        },
        dateTime:{
            
            width:'100%',
            fontSize: height/50,
            marginBottom : height/70,
        }
        
    })

    return {styles};

}

export default MaterialComponent;

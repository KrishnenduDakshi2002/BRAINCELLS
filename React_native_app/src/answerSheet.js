import React ,{useState,useEffect}from 'react'
import { Text, 
  View , 
  StyleSheet, 
  ScrollView, 
  useWindowDimensions,
  RefreshControl,
  Alert,
  BackHandler
} from 'react-native'


import AnswerSheetComponent from '../components/AnswerSheetComponent';

import { useRoute, useNavigation } from "@react-navigation/native";



const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


function Answersheets() {


  const {styles} = useStyle();

  const [refreshing, setRefreshing] = React.useState(false);


  
  const navigation = useNavigation();
  const route = useRoute();


  const onRefresh = React.useCallback(async() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);




  useEffect(() => {
    const backToDashboard = async () => {

        navigation.navigate("TestContainer", {
          auth_token: route.params.auth_token,
          role : route.params.role
        });
  
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backToDashboard
    );

    return () => backHandler.remove();
  }, []);


  return (
    <View style={styles.mainContainer}>

      <View name="header" style={[styles.header]}>
        <View name="classroom Details" style={styles.description}>
          <Text style={styles.header_text}>ANSWER SHEETS</Text>
        </View>
      </View>

      <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator = {false}

      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      >


        {
          (
            route.params.AnswerSheetsArray.map((obj)=>(

                <AnswerSheetComponent
                provided_by = {obj.fileName}
                link = {obj.answerSheetLink}
                />
            
            )
            )
          )
        }

        
      </ScrollView>
  
    </View>
  )
}

const useStyle = ()=>{


  const {width,height} = useWindowDimensions();

  const styles = StyleSheet.create({
    mainContainer:{
      flex :1
    },
    header:{
      flex: 0.3,
      justifyContent:"flex-end",
      alignItems:"center"
  },
  header_text:{
    fontWeight:"bold",
    fontSize : width/20
  },
  description:{
      flex:1,
      backgroundColor:"#f75200",
      width : width,
      justifyContent:"center",
      alignItems:"center"
  },
    container:{
      flex:1,
      padding: 25,
      paddingRight : 25,
    }
    
  })

  return {styles}
}

export default Answersheets
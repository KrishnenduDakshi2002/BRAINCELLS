import React from 'react'
import { Text, View , StyleSheet} from 'react-native'

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'


import TodayClass from './Todayclass';
import ScheduledClass  from './Scheduled';








function Classes() {

  const {styles} = useStyle();

  const Tab = createMaterialTopTabNavigator();



  return (

    <Tab.Navigator
    screenOptions={{
      tabBarLabelStyle: { fontSize: 12 },
      // tabBarItemStyle: { width: 100 },
      tabBarStyle: { backgroundColor: 'white' },
      tabBarPressColor : "transparent",
      tabBarIconStyle : {
          width: 45,
          height:45,
          // backgroundColor:"yellow",
          justifyContent:"center",
          alignItems:"center"
      
      },
      tabBarIndicatorStyle :{
          color: "green"
      }
    }}
    
    >
      <Tab.Screen 
      component={TodayClass} 
      name="Today"
      
      />
      <Tab.Screen component={ScheduledClass} name="Scheduled"/>
    </Tab.Navigator>
    
  )
}

const useStyle = ()=>{

  const styles = StyleSheet.create({
    
  })

  return {styles}
}



export default Classes
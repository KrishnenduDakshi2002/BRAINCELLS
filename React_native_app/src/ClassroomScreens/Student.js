import React ,{useContext,useState,useEffect}from 'react'
import { Text, View , StyleSheet, ScrollView,RefreshControl} from 'react-native'

//importing classc component
import StudentComponent from '../../components/StudentComponent';


// importing classroom context
import { ClasroomContext } from '../Classroom';

// IMPORTING THE TODAY CLASS ARRAY FROM CLASS TAB
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

function Student() {

    const {styles} = useStyle();

    const [refreshing, setRefreshing] = React.useState(false);

      // using context from classroomcontext
    const context  = useContext(ClasroomContext);   // we want to use this ClassroomContext
    // const [DataArray, setDataArray] = useState(context.StudentsDataArray);
    let DataArray = context.StudentsDataArray;

  const onRefresh = React.useCallback(async() => {
    setRefreshing(true);

    const url =
      "https://akshar-siksha.herokuapp.com/api/data/classroom/get/refresh/student/" +context.classroom_id
    await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data)=> DataArray = data);
    
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // console.log(DataArray);
  return (
    
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
      { DataArray &&
        DataArray.map((row)=>
          <StudentComponent
          key = {row.Student_id._id}
          name={row.Student_id.first_name + " "+ row.Student_id.last_name }
          email = {row.Student_id.email}
          />
        )
      }
    </ScrollView>
  )
}


const useStyle = ()=>{

    const styles = StyleSheet.create({
      container:{
        padding: 25,
        paddingRight : 25
      }
    })
  
    return {styles}
  }
  
  

export default Student
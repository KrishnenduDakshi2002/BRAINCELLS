import React, { Component, useState } from 'react';
import {
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  useWindowDimensions,
  ImageBackground,
  StatusBar,
  TouchableWithoutFeedback,
  Dimensions,
  Modal,
  Pressable,
  Alert,
  Height,
  Width,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { AntDesign, Ionicons, FontAwesome, FontAwesome5, MaterialIcons, MaterialCommunityIcons, Fontisto, Feather } from '@expo/vector-icons';


const Images = [
  'https://kettocdn.gumlet.io/media/campaign/204000/204410/image/5eda52567eb83.png?w=768&dpr=1.3',
  'https://www.sos-childrensvillages.org/getmedia/d962919f-6e71-412b-9c18-0ae044d24599/Emergency-Appeal-Corona-Crisis.jpg?width=1200&height=630&ext=.jpg',
  'http://www.lotuspetalfoundation.org/wp-content/uploads/2022/05/thumb-donate-a-tablet.jpg'
];

console.log('statusBarHeight: ', StatusBar.currentHeight);

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function DashboardTest({navigation}) {

  const [imgActive, setimgActive] = useState(0);

    const onChange = (nativeEvent) => {
    if(nativeEvent) {
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
      if (slide != imgActive) {
        setimgActive(slide);
      }
    }
  }


  const onClickBooks = () => {
    navigation.navigate('Books');
  };

  const onClickStationary = () => {
    navigation.navigate('Stationary');
  };

  const onClickGadgets = () => {
    navigation.navigate('Gadgets');
  };

  const onClickMentor = () => {
    navigation.navigate('Mentor');
  };

  const onClickClassRoom = () => {
    navigation.navigate('ClassRoom');
  };

  const onClickContest = () => {
    navigation.navigate('Contest');
  };

  const onClickNGO = () => {
    navigation.navigate('NGO');
  };

  const onClickOthers = () => {
    navigation.navigate('Others');
  };

  const onClickProfile = () => {
    navigation.navigate('Profile');
  };

  const { styles } = useStyle();

  return (
    <ImageBackground
      // source={require("../assets/leaves.jpg")}
      style={{ height: Dimensions.get('screen').height / 1 }}>
      <KeyboardAwareScrollView
        style={styles.container}
        contentOffset={{ x: 0, y: 24 }}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: 35 }}
        contentInsetAdjustmentBehavior="always"
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraHeight={32}
        extraScrollHeight={Platform.OS == 'android' ? 32 : 0}
        enableResetScrollToCoords={false}
        // onKeyboardDidShow={this._keyboardDidShowHandler}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Akshar</Text>
          <TouchableOpacity style={styles.btnContainer} onPress={onClickProfile}>
          <FontAwesome style={styles.icon} name="user-circle-o" size={24} color="black" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.wrap}>
        <ScrollView 
        onScroll={({nativeEvent}) => onChange(nativeEvent)}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        style={styles.wrap}
        >
        {
          Images.map((e, index) => 
          <Image
          key={e}
          resizeMode='stretch'
          style={styles.wrap}
          source={{uri: e}}
          />
          )
        }
        </ScrollView>
        <View style={styles.wrapDot}>
        {
          Images.map((e, index) =>
           <Text 
           key={e} 
           style={imgActive == index ? styles.dotActive : styles.dot} 
           >
           ●
           </Text>
          )
        }
        </View>
        </View>

        <View style={styles.categoriesContainer}>

        <View style={styles.categoriesList1}> 

        <TouchableOpacity style={styles.btnContainer} onPress={onClickBooks}>
        <View style={styles.category}>
        <View style={styles.categoryIcon}>
        <FontAwesome name="book" size={24} color="green" />
        </View>
        <Text style={styles.categoryText}> Books </Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnContainer} onPress={onClickStationary}>
        <View style={styles.category}>
        <View style={styles.categoryIcon}>
        <FontAwesome5 name="pencil-ruler" size={24} color="blue" />
        </View>
        <Text style={styles.categoryText}> Stationary </Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnContainer} onPress={onClickGadgets}>
        <View style={styles.category}>
        <View style={styles.categoryIcon}>
        <MaterialIcons name="devices" size={27} color="#34626C" />
        </View>
        <Text style={styles.categoryText}> Gadgets </Text>
        </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.btnContainer} onPress={onClickMentor}>
        <View style={styles.category}>
        <View style={styles.categoryIcon}>
        <FontAwesome5 name="chalkboard-teacher" size={24} color="orange" />
        </View>
        <Text style={styles.categoryText}> Mentor </Text>
        </View>
        </TouchableOpacity>

        </View>

        <View style={styles.categoriesList2}> 

        <TouchableOpacity style={styles.btnContainer} onPress={onClickClassRoom}>
        <View style={styles.category}>
        <View style={styles.categoryIcon}>
        <MaterialCommunityIcons name="google-classroom" size={27} color="brown" />
        </View>
        <Text style={styles.categoryText}> Classroom </Text>
        </View>
        </TouchableOpacity>


        <TouchableOpacity style={styles.btnContainer} onPress={onClickContest}>
        <View style={styles.category}>
        <View style={styles.categoryIcon}>
        <MaterialCommunityIcons name="ab-testing" size={28} color="#80558C" />
        </View>
        <Text style={styles.categoryText}> Contest </Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnContainer} onPress={onClickNGO}>
        <View style={styles.category}>
        <View style={styles.categoryIcon}>
        <Fontisto name="mongodb" size={28} color="#354259" />
        </View>
        <Text style={styles.categoryText}> NGO </Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnContainer} onPress={onClickOthers}>
        <View style={styles.category}>
        <View style={styles.categoryIcon}>
        <Feather name="more-horizontal" size={28} color="red" />
        </View>
        <Text style={styles.categoryText}> Others </Text>
        </View>
        </TouchableOpacity>

        </View>

        </View>

        <View style={styles.recentlyAdded}>
        <View style={styles.recentText}>
        <View>
        <Text style={styles.recent}>Recently Added</Text></View>
        <View>
        <TouchableOpacity style={styles.btnContainer} onPress={onClickProfile}>
          <Text style={styles.seeMore}>See More</Text>
          </TouchableOpacity>
          </View>
        </View>
        </View>

        <View style={styles.recentAdd}>

    </View>
        

        
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
}

const useStyle = () => {
  const { Height, Width } = useWindowDimensions();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight
    },
    header: {
      height: 50,
      backgroundColor: '#96E5D1',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    headerText: {
      fontSize: 24,
      color: '#293462',
      marginStart: 15,
    },

    icon: {
      marginEnd: 15,
    },

    wrap: {
      width: WIDTH,
      height: HEIGHT * 0.25,
      borderRadius: 15,
      marginBottom: 10,
    },
    wrapDot: {
      position: 'absolute',
      bottom: 0,
      flexDirection: 'row',
      alignSelf: 'center',
      marginBottom: 10,
    },
    dotActive: {
      margin: 3,
      color: 'black',
    },
    dot: {
      margin: 3,
      color: 'white'
    },

    categoriesContainer: {
      justifyContent: 'space-evenly',
    },
    categoriesList1: {
      marginStart: 0,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      margin: 14,
      marginLeft: 10,
    },
    categoriesList2: {
      marginStart: 0,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      margin: 14,
    },
    category: {
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    categoryIcon: {
      width: 60,
      height: 60,
      backgroundColor: '#E8F9FD',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    categoryText: {
      fontSize: 14,
    },

    recentlyAdded: {
      marginTop: 20,
    },
    recentText: {
      height: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    recent: {
      fontSize: 20,
      marginStart: 15,
      color: '#046582',
    },
    seeMore: {
      marginEnd: 15,
      color: '#E4BAD4',
    },

  });

  return { styles };
};
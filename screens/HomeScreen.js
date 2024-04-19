import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Platform, ImageBackground} from 'react-native';
import { auth } from '../config/firebase';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../config/firebase';
import AppLoading from 'expo-app-loading';
import { useFonts, Itim_400Regular } from '@expo-google-fonts/itim';
import * as Progress from 'react-native-progress';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from "react-native-modal";
import UpperBar from '../components/UpperBar';
const image = (require('../assets/images/home-bg.png'));

const HomeScreen = ({ navigation, route }) => {
  let [fontsLoaded] = useFonts({
    Itim_400Regular,
  });
    let user = route.params.user;
    const uid = user.uid
    const docRef = doc(db, "users", uid);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState();
    const [progress, setProgress] = useState(0);
    const [userModalVisible, setUserModalVisible] = useState(false);

    const toggleUserModal = () => {
      setUserModalVisible(!userModalVisible);
    };

    useEffect(() => {
        const fetchData = async () => {
          const user = await getUser();
          setCurrentUser(user);
          setLoading(false);
          }
        fetchData();
    }, []);

    useEffect(() => {
      const duration = 12 * 60 * 1000; // 12 minutes in milliseconds
      const intervalTime = 100; // Update frequency in milliseconds
      const steps = duration / intervalTime; // Total number of steps
      let step = 0; // Current step
    
      const interval = setInterval(() => {
        step++;
        if (step >= steps) {
          step = 0; // Reset step to 0 when it reaches the total steps
        }
        setProgress((step / steps).toFixed(2)); // Calculate progress percentage
      }, intervalTime);
    
      return () => clearInterval(interval);
    }, []);

    async function getUser() {
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data();
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      }

    const signOut = () => {
        auth.signOut().then(() => {
          console.log('User signed out!');
          navigation.navigate('Login');
        }).catch((error) => {
          console.error('Sign Out Error', error);
        });
    };
      
    if (!fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <ImageBackground source={image} resizeMode="cover" style={styles.container}>
        {loading ? (
            <Text>Loading...</Text>
          ) : (
            <>
            <Modal isVisible={userModalVisible} style={styles.modalContainer}>
              <View style={styles.userModal}>
                <View style={[, {flex: 1}]}>
              <Text style={{fontFamily: 'Itim_400Regular', fontSize: 35, color: 'white', fontWeight: '600'}}>User Information</Text>
                <Text>UID: {currentUser.uid}</Text>
              <Text>name: {currentUser.username}</Text>
              <Text>age: {currentUser.age}</Text>
              <Text>balance: {currentUser.balance}</Text>
              <Text>gender: {currentUser.gender}</Text>
              <Text>jobs: {currentUser.jobs}</Text>
              <Text>skills: {currentUser.skills}</Text>
                </View>

                <View style={{flexDirection: 'row', width: '100%', justifyContent:'center', marginBottom: 25}}>
                  <View style={[styles.BottomButtons, {alignSelf: 'center'}]}>
                    <View style={[styles.buttonWrapper, { marginRight: 30}]}>
                      <Pressable style={styles.button} onPress={() => {toggleUserModal()}}>
                        <Text style={{color: 'white', fontSize: 30, fontFamily: 'Itim_400Regular'}}>Close</Text>
                      </Pressable>
                    </View>
                  </View>
                  <View style={[styles.BottomButtons, {alignSelf: 'center'}]}>
                    <View style={[styles.buttonWrapper, {marginLeft: 30}]}>
                      <Pressable style={styles.button} onPress={signOut}>
                        <Text style={{color: 'white', fontSize: 30, fontFamily: 'Itim_400Regular'}}>Log out</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              
              </View>
            </Modal> 
            <View style={styles.headerContainer}>
              
                <View style={styles.infomationContainer}>
                  <View style={styles.balanceContainer}>
                  <UpperBar/>
                   <FontAwesome5 name="coins" size={35} color="yellow" style={styles.icons}/>     
                   <Text style={{fontFamily: 'Itim_400Regular', fontSize: 23, color: 'white', fontWeight: '600'}}>{currentUser.balance}</Text>
                  </View>
                  
                  <View style={styles.healthContainer}>
                  <UpperBar/>
                    <MaterialCommunityIcons name="heart-multiple" size={35} color="#F73653" style={styles.icons}/>     
                    <Text style={{fontFamily: 'Itim_400Regular', fontSize: 23, color: 'white', fontWeight: '600'}}>{currentUser.health}</Text>
                  </View>

                  <View style={styles.happinessContainer}>
                  <UpperBar/>
                    <MaterialCommunityIcons name="emoticon-happy" size={35} color="yellow" style={styles.icons}/>     
                    <Text style={{fontFamily: 'Itim_400Regular', fontSize: 23, color: 'white', fontWeight: '600'}}>{currentUser.happiness}</Text>
                  </View>
                </View>

              <View style={styles.headerBottomBar}></View>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontFamily: 'Itim_400Regular', fontSize: 30, marginRight: 10}}>Year 1</Text>
                <Progress.Bar progress={ progress } width={250} height={15} borderRadius={15} color='#A4E860' unfilledColor='gray' borderColor='#692600' borderWidth={3}/>
              </View>
            </View>

            {/*  
              
              <Text>daily_login_streak: {currentUser.daily_login_streak}</Text>
              
              */}

              <View style={styles.buildingContainer}>

                <View style={styles.building}>
                  <Pressable onPress={() => navigation.navigate('Restaurant')}
                  style={{height: "100%", width: 200, alignSelf: 'flex-end'}} />
                </View>

                <View style={styles.building}>
                <Pressable onPress={() => navigation.navigate('School')}
                  style={{height: "100%", width: 180}} />
                </View>

                <View style={styles.building}>
                  <Pressable onPress={() => navigation.navigate('RentalHouse')}
                    style={{height: "100%", width: 180}} />

                  <Pressable onPress={() => navigation.navigate('Work')}
                    style={{height: "100%", width: 200, alignSelf: 'flex-end', marginLeft: 20}} />
                </View>

                <View style={styles.building}>
                  
                <Pressable onPress={() => navigation.navigate('RentalHouse')}
                  style={{height: "100%", width: 180}} />
                </View>
              </View>

              <View style={styles.BottomButtonsContainer}>
                <View style={styles.BottomButtons}>
                  <View style={styles.buttonWrapper}>
                    <Pressable style={styles.button}></Pressable>
                  </View>
                </View>
                <View style={styles.BottomButtons}>
                  <View style={styles.buttonWrapper}>
                    <Pressable style={styles.button} onPress={toggleUserModal}>
                      <FontAwesome name="user-circle-o" size={40} color="white" />
                    </Pressable>
                  </View>
                </View>
                <View style={styles.BottomButtons}>
                  <View style={styles.buttonWrapper}>
                    <Pressable style={styles.button}></Pressable>
                  </View>
                </View>
                
              </View>
            </>
          )}
        </ImageBackground>
      );}
}

const styles = StyleSheet.create({
    container: {
        
        flex: 1,
        alignItems: 'center',
    },
    headerContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 110,
      width: '100%',
      flexDirection: 'column',
      backgroundColor: '#7D5E46',
      
    },
    infomationContainer: {
      flex: 1,
      flexDirection: 'row',
      width: '100%',
      marginTop: 50,
      paddingLeft: 10,
      justifyContent: 'center',
    },
    icons: {
      position: 'absolute',
      left: -14,
      
    },
    balanceContainer:{
      width: 100,
      height: 40,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#5C3933',
      borderRadius: 10,
      borderColor: '#331101',
      borderWidth: 2,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    healthContainer:{
      width: 100,
      height: 40,
      marginHorizontal: 25,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#5C3933',
      borderRadius: 10,
      borderColor: '#331101',
      borderWidth: 2,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    happinessContainer:{
      
      width: 100,
      height: 40,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#5C3933',
      borderRadius: 10,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      borderColor: '#331101',
      borderWidth: 2,
    },
    headerBottomBar: {
      backgroundColor: '#362505', 
      height: 13, 
      width: '100%', 
      borderTopColor: '#A37A64',
      borderWidth: 3,
    },
    progressBarContainer: {
      marginTop: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      width: '90%',
      flexDirection: 'column',
      backgroundColor: '#F1B564',
      borderRadius: 10,
      borderColor: '#692600',
      borderWidth: 3,
    },
    bottomBar:{
       
      backgroundColor: '#BC3B25', 
      height: 20, 
      borderColor: '#692600',
      width: '100%', 
      borderBottomLeftRadius: 7, 
      borderBottomRightRadius: 7,
      borderBottomColor: 'none',
    },
    buildingContainer: {
      display: 'flex',
      height: "65%",
      width: '100%',
      flexDirection: 'column',
      
    },
    building: {
      height: "25%",
      width: '100%',
     
      flexDirection: 'row',
    },
    BottomButtonsContainer: {
      flex: 1,
      width: '100%',
      flexDirection: 'row',
      paddingBottom: 20
    },
    BottomButtons: {
      height: 80,
      
      width: '33.33%',
      alignSelf: 'flex-end',
      alignItems: 'center',
      justifyContent: 'flex-end',
      shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 6,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
            elevation: 40,
            zIndex:999,
    },
    button:{ 
      backgroundColor: '#F14C01',
      height: 50,
      width: 110,
      borderRadius: 10,
      height: '85%', 
      borderBottomColor: '#FFE472', 
      borderBottomWidth: 2, 
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F58D34'
    },
    buttonWrapper: {
      height: '90%', 
      backgroundColor: '#C54319', 
      borderRadius: 10, 
      alignItems: 'flex-start',
       borderColor: '#692600', 
      borderWidth: 2
    },
    modalContainer: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    userModal: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      backgroundColor: '#F1B564',
      borderRadius: 10,
      borderColor: '#692600',
      
      borderWidth: 5,
      borderRadius: 10,
      width: '90%',
      height: '70%',
      padding: 6,
    }
});
export default HomeScreen;
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Platform, ImageBackground} from 'react-native';
import { auth } from '../config/firebase';
import { doc, getDoc, getDocFromCache  } from "firebase/firestore";
import { db } from '../config/firebase';
import AppLoading from 'expo-app-loading';
import { useFonts, Itim_400Regular } from '@expo-google-fonts/itim';
import * as Progress from 'react-native-progress';
const image = (require('../assets/images/home-bg.png'));

const HomeScreen = ({ navigation, route }) => {
  let [fontsLoaded] = useFonts({
    Itim_400Regular,
  });

  let fontSize = 24;
  let paddingVertical = 6;

    let user = route.params.user;
    const uid = user.uid
    const docRef = doc(db, "users", uid);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState();
    const [progress, setProgress] = useState(0);

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
            <View style={styles.headerContainer}>
              <View style={{flex: 1}}></View>
              <View style={styles.headerBottomBar}></View>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontFamily: 'Itim_400Regular', fontSize: 30, marginRight: 10}}>Year 1</Text>
                <Progress.Bar progress={ progress } width={250} height={15} borderRadius={15} color='#A4E860' unfilledColor='gray' borderColor='#692600' borderWidth={3}/>
              </View>
            </View>

            {/*  <Text>Welcome {currentUser.email}</Text>
              <Text>UID: {currentUser.uid}</Text>
              <Text>name: {currentUser.username}</Text>
              <Text>age: {currentUser.age}</Text>
              <Text>balance: {currentUser.balance}</Text>
              <Text>daily_login_streak: {currentUser.daily_login_streak}</Text>
              <Text>gender: {currentUser.gender}</Text>
              <Text>health: {currentUser.health}/100</Text>
              <Text>jobs: {currentUser.jobs}</Text>
              <Text>skills: {currentUser.skills}</Text>
              <Text>happiness: {currentUser.happiness}/100</Text>
              */}

              <Pressable onPress={signOut}>
                <Text>Sign Out</Text>
              </Pressable>

              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <View style={{backgroundColor: 'blue'}}></View>
                <View style={{flexDirection: 'column', backgroundColor: 'blue'}}>
                  <View></View>
                  <View></View>
                </View>
                <View style={{backgroundColor: 'blue'}}></View>
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
      height: 100,
      width: '100%',
      flexDirection: 'column',
      backgroundColor: '#7D5E46',
      
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
      
    }
});
export default HomeScreen;
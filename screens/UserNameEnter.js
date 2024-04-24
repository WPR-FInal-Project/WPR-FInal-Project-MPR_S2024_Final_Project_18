import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase.js";
import { auth } from '../config/firebase.js';
import { Picker } from '@react-native-picker/picker';

import { useFonts, Itim_400Regular } from '@expo-google-fonts/itim';


const UserNameEnter = ({navigation, route}) => {
    
    const uid = route.params.uid;
    const docRef = doc(db, "users", uid);
    const [username, setUsername] = useState(route.params.username);
    const [gender, setGender] = useState("male");
    useEffect(() => {
        const fetchData = async () => {
          const user = await getUser();
          if (user.username !== "" && user.username !== undefined) {
            navigation.navigate('Home', {uid: uid});
          } 
        };
        fetchData();
    }, []);

      
    const handleUsernameSubmit = async () => {
        if (username !== '') {
            try {
                await setDoc(doc(db, 'users', uid), { username, gender }, { merge: true });
                const user = await getUser();
                navigation.navigate('Home', { uid: uid });
            } catch (error) {
                console.error("Error updating username: ", error);
            }
        }
    };

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

        let [fontsLoaded] = useFonts({
            Itim_400Regular,
          });
          if (!fontsLoaded) {
            return <></>;
          } else {
        return (
    (<View style={styles.container}>
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Enter your username</Text>
            <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
                placeholder="Username"
            />
            <Picker
                selectedValue={gender}
                onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                style={styles.inputGender}
                >
                <Picker.Item label="Male"  style={{fontSize: 20,fontFamily: 'Itim_400Regular'}} value="male" />
                <Picker.Item label="Female" style={{fontSize: 20,fontFamily: 'Itim_400Regular'}} value="female"/>
                </Picker>
                <View style={styles.BottomButtons}>
                  <View style={styles.buttonWrapper}>
                    <Pressable style={styles.button} onPress={handleUsernameSubmit}>
                    <Text style={{color: 'white', fontSize: 30, fontFamily: 'Itim_400Regular'}}>Submit</Text>
                    </Pressable>
                  </View>
                </View>
            </View>
        </View>))
};}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#51330B',
        
         
          backgroundColor: '#EFE0BD',
          padding: 10,
        
          
    },
    inputContainer: {
        display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      backgroundColor: '#F1B564',
      borderRadius: 10,
      borderColor: '#692600',
      
      borderWidth: 5,
      borderRadius: 10,
      width: '90%',
      height: 400,
      padding: 6,
    },
    title: {
        marginBottom: 16,
        color: 'white', 
        fontSize: 30,
        fontFamily: 'Itim_400Regular',
    },
    text: {
        fontFamily: 'Itim_400Regular',
        fontSize: 23,
        color: '#51330B',
        marginBottom: 10,
      },
    input: {
        fontFamily: 'Itim_400Regular',
        height: 80,
        borderWidth: 1,
        fontSize: 30,
        width: '90%',
        color: '#692600',
        marginBottom: 16,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent  : 'center',
    },
    inputGender: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
    },
    BottomButtons: {
        
        marginTop: 50,
        height: 80,
        
        width: '33.33%',
        alignItems: 'center',
       
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
      buttonWrapper: {
        height: '90%', 
        backgroundColor: '#C54319', 
        borderRadius: 10, 
        alignItems: 'flex-start',
         borderColor: '#692600', 
        borderWidth: 2
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
      inputGender: {
        height: 40,
        
        borderColor: 'gray',
        borderRadius: 10,
        justifyContent: 'center',
        width: '90%',
        marginBottom: 16,
        
      },
});

export default UserNameEnter;
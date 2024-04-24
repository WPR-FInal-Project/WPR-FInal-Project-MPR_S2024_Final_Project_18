import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { auth } from '../config/firebase';
import { db } from "../config/firebase.js";
import { doc, getDoc, collection, query, where, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from 'firebase/auth';
const image = (require('../assets/images/bg.jpeg'));

// Login Screen
const LoginScreen = ({navigation}) => {
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    useEffect(() =>{
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                console.log('user is signed in');
            } else {
                console.log('user is not signed in');
            }
        });

        return unsubscribe;
    }, []);


    const handleLogin = () => {
        if (email !== '' && password !== '') {
            // Sign in with email and password
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setEmailError(false);
                setPasswordError(false);

                // after login, check if user has username
                // function to get user data from firestore
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
                const user = userCredential.user;
                console.log('user login: ', user.email);
                
                // Get user data from firestore
                const docRef = doc(db, "users", user.uid);
                // function to Get user data from firestore
                const fetchData = async () => {
                    const userData = await getUser();
                    console.log('user login data: ', userData);
                    // if user has username, navigate to home screen
                    if (userData.username !== "" && userData.username !== undefined) {
                        // check if user has logged in yesterday
                        if (new Date().getDate() - userData.last_login === 1) {
                            // if user has logged in yesterday, update daily login streak
                            await updateDoc(doc(db, 'users', userData.uid), { last_login: new Date().getDate(), daily_login_streak: userData.daily_login_streak + 1})
                            // navigate to home screen with daily reward enabled
                            navigation.navigate('Home', {uid: userData.uid, dailyEnabled: true});
                        } else if (new Date().getDate() - userData.last_login > 1){
                            // if user has not logged in for more than 1 day, reset daily login streak
                            await updateDoc(doc(db, 'users', userData), { daily_login_streak: 0});
                            navigation.navigate('Home', {uid: userData.uid, dailyEnabled: false});
                        } else {
                            // if user has logged in today, navigate to home screen with daily reward disabled
                            navigation.navigate('Home', {uid: userData.uid, dailyEnabled: false});
                        }
                    } else {
                         // if user does not have username, navigate to username screen
                      navigation.navigate('Username', {uid: userData.uid, username: userData.username});                
                    }
                  };
                  fetchData();
            })
            .catch((error) => {
                setEmailError(true);
                setPasswordError(true);
                
            });
        }
    }
    
    handleForgotPassword = () => {  
        // navigation.navigate('ForgotPassword');
    }
    return (
        // <KeyBoardAvoidingView behavior='padding' style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.loginText}>Login</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <Text style={{color: 'white', fontWeight: '600'}}>Don't have an account? <Text style={{color: '#F14C01'}} onPress={() => {navigation.navigate('Register')}}>Register</Text></Text>
                </View>
                <View  style={[styles.inputView, {borderColor: emailError ? '#F14C01' : 'white'}]}>
                    <Feather name='user' size={20} color={emailError ? '#F14C01' : 'black'}/>
                    <TextInput 
                    placeholder='Email' 
                    style={styles.input} 
                    value={email}
                    onChangeText={text => {setEmail(text)}}
                    >
                    </TextInput>
                </View>

                <View style={[styles.inputView, {borderColor: passwordError ? '#F14C01' : 'white'}]}>
                    <Feather name='lock' size={20} color={passwordError ? '#F14C01' : 'black'}/>

                    <TextInput 
                    placeholder='Password' 
                    style={styles.input} 
                    value={password}
                    onChangeText={text => {setPassword(text)}}
                    secureTextEntry={isPasswordHidden}
                    >
                    </TextInput>
                    <Text onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
                        {isPasswordHidden ? 'Show' : 'Hide'}
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button}
                >
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>Login</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text onPress={() => {handleForgotPassword()}} style={{color: "#F14C01", fontWeight: '600', fontSize: 15}}>Forgot Password?</Text>
            </View>
            </View>
            

            {/* // </KeyBoardAvoidingView> */}
        </ImageBackground>

    );
};

const styles = StyleSheet.create({
    container: {
        
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        color: 'white',
        fontSize: 30,
        marginBottom: 30,
        fontWeight: 'bold',
    },
    inputView:{
        flexDirection: 'row',
        alignItems: 'center',
        width: 300,
        height: 60,
        borderWidth: 1,
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 10,
        borderRadius: 10,
    },
    inputContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 10,
        height: 400,
        padding: 20,
        
        
    },
    input: {
        height: 50,
        fontSize: 20,
        borderWidth: 1,
        borderColor: 'white',
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#F14C01',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
    },
});

export default LoginScreen;
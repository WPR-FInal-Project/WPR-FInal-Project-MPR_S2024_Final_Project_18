import { set } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
const image = (require('../assets/images/bg.jpeg'));

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
        setEmailError(email === '');
        setPasswordError(password === '');
        
        if (email !== '' && password !== '') {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('user login: ', user.email);
                navigation.navigate('Username', {user: user});                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
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
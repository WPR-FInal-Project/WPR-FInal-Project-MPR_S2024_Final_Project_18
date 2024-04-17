import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase.js";
import { auth } from '../config/firebase.js';


const UserNameEnter = ({navigation, route}) => {
    let user = route.params.user;
    const uid = user.uid
    const docRef = doc(db, "users", uid);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(user.username);
    const [gender, setGender] = useState("male");
    useEffect(() => {
        const fetchData = async () => {
          const user = await getUser();
          if (user.username !== "" && user.username !== undefined) {
            navigation.navigate('Home', {user: user});
          } else {
            setLoading(false);
          }
        };
        fetchData();
    }, []);

      
    const handleUsernameSubmit = async () => {
        if (username !== '') {
            try {
                await setDoc(doc(db, 'users', uid), { username, gender }, { merge: true });
                const user = await getUser();
                navigation.navigate('Home', { user: user });
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
    return (
        (loading ? (

            <View></View>
        ) : (<View style={styles.container}>
            <Text style={styles.title}>Enter your username</Text>
            <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
                placeholder="Username"
            />
            {/* <Picker
                selectedValue={gender}
                onValueChange={(itemValue) => setGender(itemValue)}
                style={styles.inputGender}
            >
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
            </Picker> */}

            <Button title="Submit" onPress={handleUsernameSubmit} />    
        </View>))
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8,
    },
    inputGender: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
    }
});

export default UserNameEnter;
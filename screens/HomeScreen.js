import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { auth } from '../config/firebase';
import { doc, getDoc, getDocFromCache  } from "firebase/firestore";
import { db } from '../config/firebase';

const HomeScreen = ({ navigation, route }) => {
    let user = route.params.user;
    console.log("user: ", user)
    const uid = user.uid
    const docRef = doc(db, "users", uid);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const fetchData = async () => {
          const user = await getUser();
          setCurrentUser(user);
          setLoading(false);
          console.log(user)
          }
        fetchData();
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
      

      return (
        <View style={styles.container}>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <>
              <Text>Home Screen</Text>
              <Text>Welcome {currentUser.email}</Text>
              <Text>UID: {currentUser.uid}</Text>
              <Text>name: {currentUser.username}</Text>
              <Text>age: {currentUser.age}</Text>

              <Pressable onPress={signOut}>
                <Text>Sign Out</Text>
              </Pressable>
            </>
          )}
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default HomeScreen;
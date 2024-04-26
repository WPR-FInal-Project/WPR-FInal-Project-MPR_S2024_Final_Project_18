import React, {useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Pressable, Alert, } from 'react-native';
import { db, userCollection, skillCollection } from '../config/firebase';
import {doc, docs, getDoc} from "firebase/firestore"
import SubjectsData from '../data/SubjectsData';
import firebase from 'firebase/compat/app';


const SchoolScreen = ({UserLearnedSubjects, route}) => {
    const navigation = useNavigation();
    const [userAge, setUserAge] = useState(null);
    const [filteredSkills, setFilteredSkills] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const user = route.params.user;
    const skills = route.params.skills;

    console.log('User:', user);
    console.log('Skills:', skills);
    //fetch the user age
    useEffect(() => {
        // const fetchUserData = async () => {
        //     try{
        //         const userData = await db.collection('users').doc(uid).get();
        //         const age = userData.data().age;
        //         setUserAge(age);
        //     }catch(error){
        //         console.log('Error fetching user data:', error);
        //     }
        // };
        // fetchUserData();
        const fetchUserData = async () => {
            try{
                const userData = await userCollection.age;
            }catch(error){
                console.log('Error fetching user data:', error);
            }
        }
    }, []);
    //fetch subjects data
    useEffect(() => {
        setSubjects(SubjectsData);
    }, []);

    //fetch skills from Firebase & filter based on the subjects the user has learned
    useEffect(() => {
        if(userAge >= 5 && userAge < 18){
            const fetchSkills = async () => {
                try{
                    const skillsSnapshot = await db.collection('skills').get();
                    const skills = skillsSnapshot.docs.map(doc => doc.data());

                    //Filter skills based on the subjects the user has learned
                    const filteredSkills = skills.filter(skill =>{
                        return UserLearnedSubjects.includes(skill.requiredSubjects);
                    })
                    setFilteredSkills(filteredSkills);
                }catch(error){
                    console.error('Error fetching skills:', error);
                }
            };
            fetchSkills();
        }
    }, [userAge, UserLearnedSubjects]);

    //Handle selecting a subject or skill
    const handleSelect = async (item, cost, duration) => {
        if(userAge >= 5 && userAge < 18){
            console.log(`Selected subject: ${item.name}`);

            //Learning a subject
            try{
                // deduct the cost of the subject from the user's balance
                await 
                db.collection('users').doc(uid).update({
                    balance: firebase.firestore.FieldValue.increment(-item.cost),
                    age: firebase.firestore.FieldValue.increment(item.duration)
                });
                console.log(`Subject ${item.name} learned successfully`);
            }catch (error){
                console.error('Error learning subject:', error);
            }
        }else if(userAge >= 18){
            console.log(`Selected skill: ${item.name}`);
            if(UserLearnedSubjects.includes(item.requiredSubjects)){
                try{
                    //add the skill to the skill array
                    await db.collection('users').doc(uid).update({
                        skills: firebase.firestore.FieldValue.arrayUnion(item.name),
                        age: firebase.firestore.FieldValue.increment(item.duration)
                    });
                    console.log(`Skill ${item.name} learned successfully`);
                }catch(error){
                    console.error('Error learning skill:', error);
                }
            }else{
                console.log(`Cannot learn skill ${item.name} without completing required subject`);
            }
        }
    }

    //render subjects or skills based on users age
    const renderItems = () => {
        if(userAge < 3){
            Alert.alert('Uh oh!', 'There is nothing to learn now, you need to grow.');
            navigation.goBack();
            return;
            
        }else if(userAge >= 5 && userAge < 18){
            return subjects.map(subject => (
                <Pressable
                key={subject.id}
                title ={subject.name}
                onPress={() => handleSelect (subject, subject.cost)}
                />
            ));
        }else if(userAge >= 18){
            return filteredSkills.map(skill => (
                <Pressable
                key = {skill.id}
                title = {skill.name}
                onPress={() => handleSelect(skill, 0)} // skill cost is not passed
                />
            ))
        }
    }
    return (
        <View style={styles.container}>
            <Text>School Screen</Text>
            <View>
            {renderItems()}
            </View>
            
        </View>



    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default SchoolScreen;
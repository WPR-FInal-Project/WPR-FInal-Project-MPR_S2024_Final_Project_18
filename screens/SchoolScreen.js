import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Pressable, Alert, } from 'react-native';
import { db, userCollection, skillCollection } from '../config/firebase';
import { doc, docs, getDoc, updateDoc } from "firebase/firestore"
import subjectData from '../data/SubjectsData';
import firebase from 'firebase/compat/app';
import { Entypo } from '@expo/vector-icons';
import { set } from 'firebase/database';


const SchoolScreen = ({ UserLearnedSubjects , route }) => {
    const navigation = useNavigation();
    const [userAge, setUserAge] = useState(0);
    const [filteredSkills, setFilteredSkills] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const user = route.params.user;
    const skills = route.params.skills;
    const uid = route.params.uid; 

    console.log('User:', user);
    console.log('Skills:', skills);
    console.log("Current userAge:", userAge);

    // userAge = user.age;
    useEffect(() => {
        if(user && user.age !== undefined){
            setUserAge(user.age)
        };
    }, [user]);
   
    //handle subject selection
    const handleSelectSubject= (subject) => {
        setSelectedSubject(subject);
    };

    //handle learning a subject
    const handleLearnSubject = async () => {
        try{
            if(selectedSubject){
                if(userAge < 5){
                    Alert.alert('Oops!', 'You need to grow a bit more before you can start learning.');
                    return;
                };
            }
                //check prerequisites
                const prerequisites = selectedSubject.prerequisites;
                if (prerequisites && prerequisites.length > 0){
                    const missingPrerequisites = prerequisites.filter(subject => !skills.includes(subject));
                    if(missingPrerequisites.length > 0){
                        Alert.alert('Oops!', `You need to complete ${missingPrerequisites.join(', ')} before you can learn ${selectedSubject.name}.`);
                        return;
                    }
                }
                //learn the subject
                const updatedSkills = [...skills, selectedSubject.name];
                const updatedAge = userAge + selectedSubject.duration

                //update skills and user age
                await updateDoc(doc(db, 'users', uid),{
                    skills: updatedSkills,
                    age: updatedAge,
                });

                //clear the selected subject
                setSelectedSubject(null);

                //update user age
                setUserAge(updatedAge)
        }
        catch(error){
            console.error('Error handling choosing subject: ', error)
    }

    }



    // function goBack(){
    //     navigation.navigate('Home', {uid: uid});
    // } property uid does not exist

    function goBack(){
        navigation.goBack();
        return;
    }
    return (

        <View>

            <View style={styles.backBtnContainer} >
                <Pressable 
                onPress={goBack}>
                    <Entypo name="back" size={40} color="black" />
                </Pressable>
            </View>
            <View style={styles.container}>
                <Text>School Screen</Text>
                <View>
                {userAge >= 5 && (
                    <View>
                        <Text style={styles.heading}>Select a subject:</Text>
                        <View style={styles.levelContainer}>
                            <Text style={styles.levelHeading}>Primary School</Text>
                            {subjectData.primarySchool.subjects.map(subject => (
                                <Pressable key={subject.id} onPress={() => handleSelectSubject(subject)}  style={styles.subjectButton}>
                                    <Text style={styles.subjectButtonText}>{subject.name}</Text>
                                </Pressable>
                            ))}
                        </View>

                        <View style={styles.levelContainer}>
                        <Text style={styles.levelHeading}>Secondary School</Text>
                            {subjectData.secondarySchool.subjects.map(subject => (
                                <Pressable key={subject.id} onPress={() => handleSelectSubject(subject)} style={styles.subjectButton} >
                                    <Text style={styles.subjectButtonText}>{subject.name}</Text>
                                </Pressable>
                            ))}
                        </View>

                        <View style={styles.levelContainer}>
                        <Text style={styles.levelHeading}>High School</Text>
                            {subjectData.highSchool.subjects.map(subject => (
                                <Pressable key={subject.id} onPress={() => handleSelectSubject(subject)} style={styles.subjectButton}>
                                    <Text style={styles.subjectButtonText}>{subject.name}</Text>
                                </Pressable>
                            ))}
                        </View>
                        {selectedSubject && (
                            <Pressable onPress={handleLearnSubject} style={styles.learnButton}>
                                <Text style={styles.learnButtonText}>Learn {selectedSubject.name}</Text>
                            </Pressable>
                        )}
                    </View>
                )}
                </View>
                

            </View>
        </View>




    );
};
const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backBtnContainer:{
        justifyContent: 'center',
        alignItems:'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        backgroundColor: 'orange',
        padding: 0,
        marginTop: 50,
        marginRight: 50,
        marginLeft: 20,
        width: '20%',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    levelContainer: {
        marginBottom: 20,
    },
    levelHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subjectButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    subjectButtonText: {
        color: '#FFF',
        fontSize: 16,
    },
    learnButton: {
        backgroundColor: '#2196F3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    learnButtonText: {
        color: '#FFF',
        fontSize: 16,
    },
});
export default SchoolScreen;
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Pressable, Alert, ImageBackground} from 'react-native';
import { db, userCollection, skillCollection } from '../config/firebase';
import { doc, docs, getDoc, updateDoc } from "firebase/firestore"
import subjectData from '../data/SubjectsData';
import GoBackButton from '../components/GoBackButton';
import firebase from 'firebase/compat/app';
import { Entypo } from '@expo/vector-icons';
import { set } from 'firebase/database';
import { useFonts, Itim_400Regular } from '@expo-google-fonts/itim';

const image = (require('../assets/images/school.jpg'));


const SchoolScreen = ({ navigation, route }) => {
    let [fontsLoaded] = useFonts({
        Itim_400Regular,
      });

    const [userAge, setUserAge] = useState(route.params.user.age);
    const [filteredSkills, setFilteredSkills] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const skills = route.params.skills;
    const uid = route.params.uid; 

    

    // userAge = user.age;
    
   
    //handle subject selection
    const handleSelectSubject= (subject) => {
        console.log('Selected subject: ', subject);
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
                console.log('Updated skills: ', updatedSkills);
                //update skills and user age
                // await updateDoc(doc(db, 'users', uid),{
                //     skills: updatedSkills,
                // });

                //clear the selected subject
                setSelectedSubject(null);

                //update user age
        }
        catch(error){
            console.error('Error handling choosing subject: ', error)
    }

    }



    function goBack(){
        navigation.navigate('Home', {uid: uid});
    } 

    
    if (!fontsLoaded) {
        return <View />;
      } else {
        return (
            <ImageBackground source={image} resizeMode="cover" style={styles.container}>
                
            <View style={styles.backBtnContainer} >
                <GoBackButton 
                onPress={goBack}>
                </GoBackButton>
            </View>
            <View style={styles.userInfoContainer}>
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
         </ImageBackground>  
    );
}};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    textContainer: {
        backgroundColor: '#51330B',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 10,
        width: 220,
        alignItems: 'center',
        justifyContent: 'center',
      },
      userInfoContainer: {
        borderColor: "#3B2105",
            borderWidth: 2,
          backgroundColor: '#EFE0BD',
          padding: 10,
        width: '80%',
          marginTop: 8,
          borderRadius: 6,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          alignItems: 'center',
        justifyContent: 'center',
    },
    backBtnContainer:{
        justifyContent: 'center',
        alignItems:'center',
        borderColor: 'black',
        borderRadius: 8,
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
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ImageBackground, FlatList, Platform} from 'react-native';
import { db } from '../config/firebase';
import { doc, getDoc, collection, query, where, getDocs, setDoc, updateDoc } from "firebase/firestore";
import subjectData from '../data/SubjectsData';
import GoBackButton from '../components/GoBackButton';
import { Entypo } from '@expo/vector-icons';
import ButtonOrange from '../components/ButtonOrange';
import ResultModal from '../components/ResultModal';
import Header from '../components/Header';
import SkillLearnModal from '../components/SkillLearnModal';
import { useFonts, Itim_400Regular } from '@expo-google-fonts/itim';

const image = (require('../assets/images/school.jpg'));


const SchoolScreen = ({ navigation, route }) => {
    let [fontsLoaded] = useFonts({
        Itim_400Regular,
      });
      
    const [confirmSkillLearnVisible, setConfirmSkillLearnVisible] = useState(false);
    const [resultModalVisible, setResultModalVisible] = useState(false);
    const age = route.params.userAge;

    const [skillId, setSkillId] = useState(0);
    const [skillName, setSkillName] = useState('');
    const [skillCost, setSkillcost] = useState(0);

    const [skills, setSkills] = useState([]);
    const [userSkills, setUserSkills] = useState(route.params.skills);
    const uid = route.params.uid; 

    const [balance, setBalance] = useState(route.params.balance);
    const [health, setHealth] = useState(route.params.health);
    const [happiness, setHappiness] = useState(route.params.happiness);

    const [currentSubject, setCurrentSubject] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [answerChosen, setAnswerChosen] = useState(null);
    const [result, setResult] = useState(''); 
    
    
        const toggleResultModal = () => {
            setResultModalVisible(!resultModalVisible);
        };

        const toggleConfirmSkillLearnModalVisible = () => {
            setConfirmSkillLearnVisible(!confirmSkillLearnVisible);
        };
    
        useEffect(() => {
            const fetchSkills = async () => {
                const skillsCollection = collection(db, 'skills');
                const skillsSnapshot = await getDocs(skillsCollection);
                const skillsList = skillsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                skillsSnapshot.docs.map(doc => console.log(doc.data()));

                setSkills(skillsList);
            };
            fetchSkills();
            userInfoFetch();
        }, [balance]);

        

        const userInfoFetch = async () => {
            try {
                const userDocRef = doc(db, 'users', uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    setHappiness(userData.happiness);
                    setHealth(userData.health);
                    setBalance(userData.balance);
                    setUserSkills(userData.skills);
                } else {
                    console.error("User document does not exist");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };


    const selectSubject = () => {
        let subjects = [];
        if (age < 12) {
          subjects = subjectData.primarySchool.subjects;
        } else if (age >= 12 && age < 16) {
          subjects = subjectData.secondarySchool.subjects;
        } else {
          subjects = subjectData.highSchool.subjects;
        }
    
        const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
        setCurrentSubject(randomSubject);
      };

      const selectQuestion = () => {
        selectSubject();
        if (currentSubject) {
          const questions = currentSubject.questions;
          const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
          setCurrentQuestion(randomQuestion);
        }
      };
    
      // Function to handle answer selection
      
        const handleAnswer = (answer) => {
            setAnswerChosen(answer);
            setResultModalVisible(true);
            if (currentQuestion) {
              const isCorrect = answer === currentQuestion.answer;
              if (isCorrect) {
                // Logic for correct answer
                setResult('Correct answer!');
                // You can update the user's progress, give feedback, etc.
              } else {
                // Logic for incorrect answer
                setResult('Incorrect answer!');
                // You can provide feedback, deduct points, etc.
              }
            } else {
              // Handle the case when there's no current question
              console.log('No question selected!');
            }
          };    
          
          const learnSkill = async (skillId) => {
            try {
                // Retrieve the skill information based on skillId
                const skillRef = doc(db, 'skills', skillId);
                const skillDocSnap = await getDoc(skillRef);
        
                if (skillDocSnap.exists()) {
                    const skillData = skillDocSnap.data();
                    const skillCost = skillData.cost;
        
                    // Check if the user has enough balance to learn the skill
                    if (balance >= skillCost) {
                        // Deduct the cost of the skill from the user's balance
                        const newBalance = balance - skillCost;
        
                        // Update the user's balance in the Firestore database
                        await updateDoc(doc(db, 'users', uid), { balance: newBalance });
        
                        // Add the skill to the user's skills list
                        await updateDoc(doc(db, 'users', uid), { skills: [...userSkills, skillId] });
        
                        // Update the local state to reflect the change in user's skills
                        setUserSkills([...userSkills, skillId]);
                        setBalance(newBalance);
        
                        // Optionally, you can provide feedback to the user indicating successful skill learning
                        console.log('Skill learned successfully!');
                    } else {
                        console.log('Insufficient balance to learn this skill.');
                        // Optionally, you can display a message to the user indicating insufficient balance
                    }
                } else {
                    console.log('Skill not found.');
                    // Handle the case where the skill with the provided ID does not exist
                }
            } catch (error) {
                console.error('Error learning skill:', error);
                // Handle any errors that occur during the skill learning process
            }
        };

        const checkSkillExists = (skillId) => {
            // Check if the skillId exists in the userSkills array
            return userSkills.includes(skillId);
            // Update the state with the boolean value indicating if the skill exists
            
        };
    const goBack = () => {
        navigation.navigate('Home', {uid: uid});
    }
    
    if (!fontsLoaded) {
        return <View />;
      } else {
        return (
            <ImageBackground source={image} resizeMode="cover" style={styles.container}>
                
                <ResultModal
                isVisible={resultModalVisible}
                toggleFunction={toggleResultModal}
                result={result}/>
                
                <SkillLearnModal
                    isVisible={confirmSkillLearnVisible}
                    toggleFunction={toggleConfirmSkillLearnModalVisible}
                    name={skillName}
                    cost={skillCost}
                    
                    disable={balance < skillCost || checkSkillExists(skillId)}
                    confirmFunction={() => learnSkill(skillId)}
                />
                <Header 
                balance={balance}
                health={health}
                happiness={happiness}/>

                <View style={{ width: '95%', marginTop: 10}}>
                    <GoBackButton 
                    onPress={goBack}/> 
                </View>

                <View style={styles.userInfoContainer}>
                <Text style={{color: '#51330B', fontSize: 30, fontFamily: 'Itim_400Regular'}}>Welcome to School!</Text>
                    <View>      
                        {age < 18 && (
                            <>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
                                <ButtonOrange disabled={false} onPress={selectQuestion}>
                                    <Text style={{color: 'white', fontSize: 25, fontFamily: 'Itim_400Regular'}}>Question</Text>
                                </ButtonOrange >
                            </View>
                            {currentQuestion && (
                                <View style={{flexDirection:'column', alignItems: 'center',height: 400, padding: 10, borderColor: "#3B2105",
                                borderWidth: 4, borderRadius: 6}}>
                                    <View style={[styles.textContainer,{flex: 1}]}>
                                        <Text style={styles.text}>{currentQuestion.question}</Text>
                                    </View>
                                        <View style={{flexDirection: 'row'}}>
                                            <ButtonOrange disabled={false} onPress={() => handleAnswer(true)}>
                                                <Text style={{color: 'white', fontSize: 28, fontFamily: 'Itim_400Regular'}}>True</Text>
                                            </ButtonOrange >
                                            <View style={{width: 40}}></View>
                                            <ButtonOrange disabled={false} onPress={() => handleAnswer(false)}>
                                                <Text style={{color: 'white', fontSize: 28, fontFamily: 'Itim_400Regular'}}>False</Text>
                                            </ButtonOrange>
                                        </View>
                                </View>
                            )}
                            </>
                        )}
                        {age >= 18 && (
                            
                            <View style={styles.skillsContainer}>
                                <View style={{ height: 60, borderRadius: 6, backgroundColor: '#3B2105', alignItems: 'center', justifyContent: 'center', marginBottom: 30, width: '85%' }}>
                                    <Text style={{ color: '#EFE0BD', fontSize: 35, fontFamily: 'Itim_400Regular' }}>Learn a Skill: </Text>
                                </View>
                                <View style={{flexDirection: 'column', width: '95%', gap: Platform.OS === 'ios' ? 5 : null, maxHeight: 400, borderWidth: 4, borderRadius: 6, borderColor: '#51330B', padding: 10}}>

                                    <FlatList
                                        data={skills}
                                        keyExtractor={(item, index) => item.id.toString()}
                                        renderItem={({ item }) => (
                                            <Pressable style={styles.skillItem} onPress={() => {
                                            toggleConfirmSkillLearnModalVisible();
                                            setSkillId(item.id);
                                            setSkillName(item.name)
                                            setSkillcost(item.cost)}}>
                                                <Text style={{ fontFamily: 'Itim_400Regular', fontSize: 25, color: 'black', marginBottom: 5 }}>
                                                    {item.name}
                                                </Text>
                                            </Pressable>
                                        )}
                                    />
                                </View>
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
        width: 330,
        alignItems: 'center',
        justifyContent: 'center',
      },
      userInfoContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '95%',
        padding : 10,
        paddingTop: 30,
        borderColor: "#3B2105",
            borderWidth: 2,
          backgroundColor: '#EFE0BD',
          padding: 10,
            height: '70%',
          marginTop: 8,
          borderRadius: 6,
          marginTop: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
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
    text: {
        fontFamily: 'Itim_400Regular',
        fontSize: 26,
        color: '#EFE0BD',
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
    skillsContainer:{
        width: 350,
        alignItems: 'center',
    },
    skillItem: {
        padding: 10,
        borderWidth: 4,
        height: 60,
        marginBottom: 10,
        width: '100%',
        padding : 10,
        borderColor: "#3B2105",
            borderWidth: 2,
          backgroundColor: '#EFE0BD',
          padding: 10,
          borderRadius: 6,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
    }
    
});
export default SchoolScreen;
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ImageBackground, Platform, FlatList } from 'react-native';
import { doc, getDoc, collection, query, where, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { useFonts, Itim_400Regular } from '@expo-google-fonts/itim';
import Header from '../components/Header';
import Entypo from 'react-native-vector-icons/Entypo';
import { db } from '../config/firebase';
import ButtonOrange from '../components/ButtonOrange';
import { set } from 'firebase/database';
import GoBackButton from '../components/GoBackButton';
import JobApplyModal from '../components/JobApplyModal';

const image = (require('../assets/images/restaurant.jpg'));


const RestaurantScreen = ({ navigation, route }) => {
    const [jobs, setJobs] = useState([]);
    const [confirmJobApplyVisible, setConfirmJobApplyVisible ] = useState(false);
    const [userSkills, setUserSkills] = useState(route.params.skills);
    const [jobId, setJobId] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [jobSalary, setJobSalary] = useState(0);
    const [jobHealthImpact, setJobHealthImpact] = useState(0);
    const [requiredSkills, setRequiredSkills] = useState([]);
    const [description, setDescription] = useState('');
    const [balance, setBalance] = useState(0);
    const [health, setHealth] = useState(0);
    const [happiness, setHappiness] = useState(0);  

    
    const uid = route.params.uid; 
    
    const toggleConfirmJobModalVisible = () => {
        setConfirmJobApplyVisible(!confirmJobApplyVisible);
        
      }
  
    useEffect(() => {
        const fetchJobs = async () => {
            const jobsCollection = collection(db, 'jobs');
            const jobSnapshot = await getDocs(jobsCollection);
            const jobList = jobSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            setJobs(jobList);
            

        };
        fetchJobs();
        userInfoFetch(); // Fetch relationship data when component mounts

    }, [balance]);

    

    const handleApplyJob = async (jobId) => {
        
            updateDoc(doc(db, 'users', uid), {
                job: jobId,
            });
          
        // try {
        //     // Determine the index of the NPC in the npcs array
        //     const npcIndex = npcs.findIndex(npc => npc.id === id);
        //     if (npcIndex === -1) {
        //         console.error(`NPC with id: ${id} not found`);
        //         return;
        //     }
    
        //     // Update the user's relationship attribute based on the NPC name
        //     const updatedRelationship = [...relationship]; // Create a copy of the relationship array
        //     updatedRelationship[npcIndex] = updatedRelationship[npcIndex] + 1; // Increment the relationship value
        //     await updateDoc(doc(db, 'users', uid), {
        //         relationship: updatedRelationship,
        //         happiness: happiness + 10,
        //         balance: balance - 10,
        //     });
    
        //     // Update the state to reflect the changes
        //     setRelationship(updatedRelationship);
        //     setBalance(balance - 10);
        //     setHappiness(happiness + 10);
    
        //     console.log(`Relationship with NPC ${id} updated successfully`);
        // } catch (error) {
        //     console.error("Error updating relationship:", error);
        // }
    };

    const checkSkillsMatch = (requiredSkills, userSkills) => {
        
        // Convert userSkills to a Set for faster lookup
        const userSkillsSet = new Set(userSkills.map(skill => skill.name));
    
        // Iterate over the requiredSkills for the job
        for (const requiredSkill of requiredSkills) {
            // Check if the requiredSkill exists in the userSkillsSet
            if (!userSkillsSet.has(requiredSkill)) {
                // If any required skill is missing, return false
                return false;
            }
        }
        // If all required skills are found, return true
        return true;
    };

    function formatSkills(skills) {
        let formattedSkills = '';
        skills.forEach((skill, index) => {
            formattedSkills += skill;
            if (index !== skills.length - 1) {
                formattedSkills += ', ';
            }
        });
        return formattedSkills;
    }
    const userInfoFetch = async () => {
        try {
            // Fetch the user document from Firestore
            const userDocRef = doc(db, 'users', uid);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                // if (userData.skills) {
                //     // If relationship data exists in the user document, set it in the state
                //     setRelationship(userData.relationship);

                // } else {
                //     // If relationship data does not exist, initialize it with default values
                //     const defaultRelationship = [0, 0, 0]; // Assuming 3 NPCs
                //     setRelationship(defaultRelationship);
                // }
                setHappiness(userData.happiness);
                setHealth(userData.health);
                setBalance(userData.balance);
            } else {
                console.error("User document does not exist");
            }
        } catch (error) {
            console.error("Error fetching relationship data:", error);
        }
    };

    const goBack = () => {
        navigation.navigate('Home', {uid: uid});
    }
    let [fontsLoaded] = useFonts({
        Itim_400Regular,
      });
      if (!fontsLoaded) {
        return <></>;
      } else {
    return (
        <ImageBackground source={image} resizeMode="cover" style={styles.container}>
            <Header 
            balance={balance}
            health={health}
            happiness={happiness}/>

            <JobApplyModal
            toggleFunction={toggleConfirmJobModalVisible}
            isVisible={confirmJobApplyVisible}
            confirmFunction={() => handleApplyJob(jobId)}
            jobTitle={jobTitle}
            salary={jobSalary}
            health_impact={jobHealthImpact}
            requiredSkills={formatSkills(requiredSkills)}
            desc={description}
            disable={!checkSkillsMatch(requiredSkills, userSkills)}
            />

            <View style={{ width: '95%', marginTop: 10 }}>
            <GoBackButton 
            onPress={goBack}/>  
            {/* <View style={styles.skillsContainer}>
            <View><Text style={[styles.text, {color: '#51330B'}]}>Your skills: </Text></View>

                </View>  */}
            </View>
            
            <View style={styles.jobsAllContainer}>
                <View  style={{
                                height: 60,
                                borderRadius: 6,
                                backgroundColor: '#3B2105',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: 30,
                                width: '85%', }}>

                    <Text style={{color: '#EFE0BD', fontSize: 35, fontFamily: 'Itim_400Regular'}}>Apply for job: </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    {/* <View>
                        <View style={styles.loveLevel}> 
                        <Entypo name="heart" size={24} color="white" />
                            <Text style={{color: 'white', fontSize: 30, fontFamily: 'Itim_400Regular', marginLeft: 10}}>{relationship[0]}</Text>
                        </View>
                        <View style={styles.imageContainer}>
                        <Image source={aliceImg} resizeMode='contain' style={styles.image}></Image>
                        </View>
                    </View>

                    <View>
                        <View style={styles.loveLevel}>
                            <Entypo name="heart" size={24} color="white" />
                            <Text style={{color: 'white', fontSize: 30, fontFamily: 'Itim_400Regular', marginLeft: 10}}>{relationship[1]}</Text>
                        </View>
                        <View style={styles.imageContainer}>
                            <Image source={rachelImg} resizeMode='contain' style={styles.image}></Image>
                        </View>
                    </View>

                    <View>
                        <View style={styles.loveLevel}>
                            <Entypo name="heart" size={24} color="white" />
                            <Text style={{color: 'white', fontSize: 30, fontFamily: 'Itim_400Regular', marginLeft: 10}}>{relationship[2]}</Text>
                        </View>
                        <View style={styles.imageContainer}>
                        <Image source={bobImg} resizeMode='contain' style={styles.image}></Image>
                        </View>
                    </View> */}
                    
                </View>
                <View style={{flexDirection: 'column', width: '95%', gap: Platform.OS === 'ios' ? 5 : null, maxHeight: 400, borderWidth: 4, borderRadius: 6, borderColor: '#51330B', padding: 10}}>
                <FlatList
                    data={jobs}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={({ item }) => (
                    <Pressable style={styles.jobItem} 
                    onPress={() => {toggleConfirmJobModalVisible();
                        setJobTitle(item.title);
                        setJobId(item.id);
                        setJobHealthImpact(item.health_impact);
                        setJobSalary(item.salary);
                        setDescription(item.description);
                        setRequiredSkills(item.required_skills);
                        
                        }}>
                        <Text style={{
                            fontFamily: 'Itim_400Regular',
                            fontSize: 25,
                            color: 'black',
                            marginBottom: 5,
                        }}>
                            {item.title}
                        </Text>
                    </Pressable>
                    )}
                />
                </View>
            </View >
        </ImageBackground>
    );
};
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    jobItem: {
        padding: 10,
        borderWidth: 4,
        height: 80,
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
    },
    loveLevel:{
        flexDirection: 'row',
        borderColor: "#3B2105",
        borderWidth: 4,
        backgroundColor: '#5C3933',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
          width: 110,
          borderRadius: 6,
    },
    text: {
        fontFamily: 'Itim_400Regular',
        fontSize: 23,
        color: '#EFE0BD',
    },
    skillsContainer: {
        flex: 1,
        marginTop: 8,
        marginLeft: 10,
        padding : 10,
        borderColor: "#3B2105",
            borderWidth: 4,
          backgroundColor: '#EFE0BD',
          padding: 10,
            height: 100,
          borderRadius: 6,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5
    },
    jobsAllContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '95%',
        padding : 10,
        paddingTop: 30,
        borderColor: "#3B2105",
            borderWidth: 2,
          backgroundColor: '#EFE0BD',
          padding: 10,
            height: '65%',
          marginTop: 8,
          borderRadius: 6,
          marginTop: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
    },
    imageContainer: {
        borderColor: "#3B2105",
        borderWidth: 4,
          backgroundColor: '#EFE0BD',
        
          marginTop: 8,
          borderRadius: 6,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        width: 110,
        height: 110,
        borderRadius: 10,
        marginHorizontal: 6,
        alignItems: 'center',

        overflow: 'hidden',
    }, 
    image: {
        width: '110%',
        height: '110%',
    }

});


export default RestaurantScreen;
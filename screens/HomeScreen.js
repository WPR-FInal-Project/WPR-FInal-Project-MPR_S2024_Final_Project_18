import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ImageBackground} from 'react-native';
import { auth } from '../config/firebase';
import { doc, getDoc, collection, query, where, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../config/firebase';
import { useFonts, Itim_400Regular } from '@expo-google-fonts/itim';
import * as Progress from 'react-native-progress';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from "react-native-modal";
import UserInfoModal from '../components/UserInfoModal';
import DailyRewardModal from '../components/DailyRewardModal';
import ButtonOrange from '../components/ButtonOrange';
import Header from '../components/Header';
import LongLabel from '../components/LongLabel';
import SkipFiveModal from '../components/SkipFiveModal';
import ResetModal from '../components/ResetModal';
import ReachEighteenModal from '../components/ReachEighteenModal';
import { set } from 'firebase/database';

const image = (require('../assets/images/home-bg.png'));

const HomeScreen = ({ navigation, route }) => {
  let [fontsLoaded] = useFonts({
    Itim_400Regular,
  });
    
    const uid = route.params.uid
    const usersDocRef = doc(db, "users", uid);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState({});
    const [skills, setSkills] = useState([]);
    const [progress, setProgress] = useState(0);

    const [userModalVisible, setUserModalVisible] = useState(false);
    const [dailyRewardModalVisible, setDailyRewardModalVisible] = useState(route.params.dailyEnabled);
    const [skipFiveVisible, setSkipFiveVisible] = useState(false);
    const [resetModalVisible, setResetModalVisible] = useState(false);
    const [reachEighteenVisible, setReachEighteenVisible] = useState(false);

    const [age, setAge] = useState(0);
    const [dailyRewardEnabled, setDailyRewardEnabled] = useState(route.params.dailyEnabled);
    const [balance, setBalance] = useState(0);
    const [health, setHealth] = useState(100);
    const [happiness, setHappiness] = useState(100);
    const [job, setJob] = useState({});
    const [house, setHouse] = useState({});
    const [relationship, setRelationship] = useState([]);
    const [healthImpact, setHealthImpact] = useState(0);
    const [salary, setSalary] = useState(0);
    const toggleUserModal = () => {
      setUserModalVisible(!userModalVisible);
    };

    const toggleResetModal = () => {
      setResetModalVisible(!resetModalVisible);
    }

    const toggleDailyRewardModal = () => {
      setDailyRewardModalVisible(!dailyRewardModalVisible);
      const handleDailyReward = () => {
        if (dailyRewardEnabled) {
          updateDoc(doc(db, 'users', uid), { balance: currentUser.balance + 100 });
          setDailyRewardEnabled(false);
          setBalance(currentUser.balance + 100);
        } 
      };
      handleDailyReward();
    }

    const toggleSkipToFiveModal = () => {
      setSkipFiveVisible(!skipFiveVisible);
    }

    const toggleReachEighteenModal = () => {
      setReachEighteenVisible(!reachEighteenVisible);
    } 

    useEffect(() => {
      // Refresh expenses whenever the screen focus changes
      const unsubscribe = navigation.addListener('focus', () => {
          const fetchData = async () => {
          setSkills([]);
          const user = await getUser();
          setCurrentUser(user);
          setAge(user.age);
          setBalance(user.balance);
          setHealth(user.health);
          setHappiness(user.happiness);
          setLoading(false);
          setHouse(user.house);
        }
        fetchData();
      });

      return unsubscribe;
  }, [navigation]);

    // retrieve user data from firestore, each time the attribute change
    useEffect(() => {
        const fetchData = async () => {
          setSkills([]);
          const user = await getUser();
          setCurrentUser(user);
          setAge(user.age);
          setBalance(user.balance);
          setHealth(user.health);
          setHappiness(user.happiness);
          setLoading(false);
          setHouse(user.house);
        }
        fetchData();
    }, [age, balance, health]);

    // update age every 12 minutes
    useEffect(() => {
      const duration =  12 * 1 * 1000; // 1 minute in milliseconds
      const intervalTime = 100; // Update frequency in milliseconds
      const steps = duration / intervalTime; // Total number of steps
      let step = 0; // Current step
    
      const interval = setInterval(async () => {
        step++;
        if (step >= steps) {
          step = 0; // Reset step to 0 when it reaches the total steps
          try {
            setAge(prevAge => {
              const newAge = prevAge + 1;
              updateDoc(doc(db, 'users', uid), { age: newAge });
              if (newAge === 80){
                setResetModalVisible(true);
                handleReset();
              } else if (newAge === 18) {
                setReachEighteenVisible(true);
                handleReachEighteen();
              }
              return newAge;
            });
            
          } catch (error) {
            console.error("Error updating username: ", error);
          }
          
        }

        setProgress(step / steps); // Calculate progress percentage
      }, intervalTime);
    
      return () => clearInterval(interval);
    }, []);

    // retrieve skills data from firestore
    useEffect(() => {
      const fetchData = async () => {
        if (currentUser && currentUser.skills) { // Check if currentUser and skills exist
        
          // Get all skills from the user's skills array
        const newSkills = await Promise.all(currentUser.skills.map(getSkill));
        
        //  Filter out skills that already exist in the skills array
        const filteredNewSkills = newSkills.filter(skill => {
          return !skills.some(existingSkill => existingSkill.id === skill.id);
        });
        setSkills(prevSkills => [...prevSkills, ...filteredNewSkills]);

        const job = await getJob(currentUser.job);
        const house = await getHouse(currentUser.house);
        setHouse(house);
        setJob(job);
        setSalary(job.salary);
        setHealthImpact(job.health_impact);
        // Add new skills to the skills array
      };
    }
      fetchData();
    }, [currentUser, skills]);

    useEffect(() => {
      const duration = 60 * 1000; // 1 minute in milliseconds
      const intervalTime = 1000; // Update frequency in milliseconds
      const steps = duration / intervalTime; // Total number of steps
      let step = 0; // Current step
    
      const interval = setInterval(() => {
        step++;
        if (step >= steps) {
          step = 0; // Reset step to 0 when it reaches the total steps
          // Perform the balance and health update here
          updateBalanceAndHealth();
        }
      }, intervalTime);
    
      return () => clearInterval(interval);
    }, [job, house]);
    
    const updateBalanceAndHealth = async () => {
      try {
        // Update balance by adding the salary
        await updateDoc(doc(db, 'users', uid), {
          balance: balance + salary - house.rental_rate,
        });

        setBalance(prevBalance => prevBalance + salary - house.rental_rate);
        
        // Update health by subtracting the health impact
        await updateDoc(doc(db, 'users', uid), {
          health: health - healthImpact + house.health_impact,
        });
        setHealth(prevHealth => prevHealth - healthImpact + house.health_impact);

        await updateDoc(doc(db, 'users', uid), {
          happiness: happiness + house.happiness_impact,
        });
        setHealth(prevHappiness => prevHappiness + house.happiness_impact);

      } catch (error) {
        console.error('Error updating balance and health:', error);
      }
    };
  
    // function to get user data from firestore
    async function getUser() {
      const docSnap = await getDoc(usersDocRef)
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    }

    // function to get skill data from firestore by skillId
    async function getSkill(skillId) {
      if (skillId === undefined) {
        throw new Error("Skill ID is undefined");
      }
      const skillDocRef = doc(db, "skills", skillId.toString());
      const skillDoc = await getDoc(skillDocRef);
      if (skillDoc.exists()) {
        return skillDoc.data();
      } else {
        console.log("No such document!");
        throw new Error(`No document with ID ${skillId}`);
      }
    }

    async function getJob(jobId) {
      if (jobId === undefined) {
        throw new Error("Job ID is undefined");
      }
      const JobDoc = await getDoc(doc(db, "jobs", jobId.toString()));
      if (JobDoc.exists()) {
        return JobDoc.data();
      } else {
        console.log("No such document!");
        throw new Error(`No document with ID ${jobId}`);
      }
    }

    async function getHouse(houseId) {
      if (houseId === undefined) {
        throw new Error("House ID is undefined");
      }
      const HouseDoc = await getDoc(doc(db, "Houses", houseId.toString()));
      if (HouseDoc.exists()) {
        return HouseDoc.data();
      } else {
        console.log("No such document!");
        throw new Error(`No document with ID ${houseId}`);
      }
    }

    // function to update user data in firestore
    const signOut = () => {
        auth.signOut().then(() => {
          console.log('User signed out!');
          navigation.navigate('Login');
        }).catch((error) => {
          console.error('Sign Out Error', error);
        });
    };

    // function to skip to age 5
    const skipToFive = () => {
      if (age < 5){
        updateDoc(doc(db, 'users', uid), { age: 5 });
        setAge(5);
      }
    }
    
    const handleReset = () => {
      updateDoc(doc(db, 'users', uid), {
            balance: 0,
            age: 0,
            skills: [],
            job: 0,
            health: 100,
            happiness: 100,
            relationship: [0,0,0],
            house: 0,
      });
      setAge(0);
    }

    const handleReachEighteen = async () => {
      const user = await getUser();
      updateDoc(doc(db, 'users', uid), {
        balance: user.balance + 10000,
      });
      setDoc(doc(db, 'users', uid), { 
        relationship: [0,0,0],
        house: 0
      }, { merge: true });
      setBalance(user.balance + 10000);
      setRelationship(user.relationship);
      setHouse(0);
    }
    if (!fontsLoaded) {
      return <View />;
    } else {
      return (
        <ImageBackground source={image} resizeMode="cover" style={styles.container}>
        {loading ? (
            <Text>Loading...</Text>
          ) : (
            <>
            <Modal isVisible={userModalVisible} style={styles.modalContainer}>
              <UserInfoModal 
              job={job.title}
              currentUser={currentUser} 
              skills={skills} 
              toggleUserModal={toggleUserModal} 
              signOut={signOut}/>
            </Modal> 

            <SkipFiveModal 
            isVisible={skipFiveVisible} 
            toggleFunction={toggleSkipToFiveModal}
            confirmFunction={skipToFive}/>
               
            <DailyRewardModal isVisible={dailyRewardModalVisible} 
            toggleFunction={toggleDailyRewardModal} 
            streak={currentUser.daily_login_streak}/>

            <ResetModal 
            isVisible={resetModalVisible} 
            toggleFunction={toggleResetModal}
            confirmFunction={handleReset}/>

            <ReachEighteenModal isVisible={reachEighteenVisible} 
            toggleFunction={toggleReachEighteenModal} 
            />

            <Header 
            balance={balance}
            health={health}
            happiness={happiness}/>

            <View style={styles.progressBarContainer}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 0}}>
                <Text style={{fontFamily: 'Itim_400Regular', fontSize: 30, marginRight: 10}}> year { currentUser.age }</Text>
                <Progress.Bar progress={ progress } width={250} height={15} borderRadius={15} color='#A4E860' unfilledColor='gray' borderColor='#692600' borderWidth={3}/>
              </View>
            </View>
            

              <View style={styles.buildingContainer}>
                <View style={styles.building}>
                  <Pressable onPress={() => navigation.navigate('Restaurant', {relationship: relationship, uid: uid, skills: skills})}
                  disabled={age < 18}
                  style={{height: "100%", width: 200, alignSelf: 'flex-end', marginLeft: 200}}>
                  <LongLabel label='Restaurant' enable={age >= 18}/>
                        
                  </Pressable>
                </View>

                <View style={styles.building}>
                  <Pressable onPress={() => 
                  navigation.navigate('School', {user: currentUser, skills: skills})}
                  
                  style={{height: "100%", width: 180}} >
                  <LongLabel label='School' enable={true}/>
                        
                  </Pressable>
                </View>

                <View style={styles.building}>
                  <Pressable onPress={() => navigation.navigate('RentalHouse', {uid: uid})}
                    style={{height: "100%", width: 180}} />
                  <Pressable onPress={() => navigation.navigate('Work', {uid: uid, skills: skills})}
                  disabled={age < 18}
                    style={{height: "100%", width: 200, alignSelf: 'flex-end', marginLeft: 20}}>
                      <LongLabel label='Office' enable={age >= 18}/>
                        
                  </Pressable>
                </View>

                <View style={styles.building}>
                  <Pressable onPress={() => navigation.navigate('RentalHouse', {uid: uid})}
                  disabled={age < 18}
                  style={{height: "100%", width: 180}} >
                    <LongLabel label='House' enable={age >= 18}/>
                  </Pressable>

                <View style={styles.coderImg}>
                  <Image
                  resizeMode="cover"
                  style={{height: "100%", width: "100%"}}
                  source={require('../assets/images/coder.gif')}/>
                </View>
                  
                </View>
              </View>

              <View style={styles.BottomButtonsContainer}>
                <ButtonOrange onPress={toggleResetModal} disabled={false}>
                  <Entypo name="loop" size={40} color="white" />
                </ButtonOrange>

                <ButtonOrange onPress={toggleUserModal} disabled={false}>
                  <FontAwesome name="user-circle-o" size={40} color="white" />
                </ButtonOrange>

                <ButtonOrange onPress={toggleSkipToFiveModal} disabled={age >= 5}>
                  <Ionicons name={'play-skip-forward-circle'} size={40} color="white"></Ionicons>
                </ButtonOrange>
              </View>
            </>
          )}
        </ImageBackground>
      );}
}

const styles = StyleSheet.create({
    container: {
        
        flex: 1,
        alignItems: 'center',
    },
    
    progressBarContainer: {
      marginTop: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      width: '97%',
      flexDirection: 'column',
      backgroundColor: '#F1B564',
      borderRadius: 10,
      borderColor: '#692600',
      borderWidth: 3,
    },
    bottomBar:{
       
      backgroundColor: '#BC3B25', 
      height: 20, 
      borderColor: '#692600',
      width: '100%', 
      borderBottomLeftRadius: 7, 
      borderBottomRightRadius: 7,
      borderBottomColor: 'none',
    },
    buildingContainer: {
      display: 'flex',
      height: "65%",
      width: '100%',
      flexDirection: 'column',
      
    },
    building: {
      height: "25%",
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
    },
    BottomButtonsContainer: {
      flex: 1,
      width: '100%',
      flexDirection: 'row',
      paddingBottom: 20
    },
    modalContainer: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    coderImg: {
      width: "45%", 
      borderWidth: 3,
       height: "100%",
      borderRadius: 10, 
      marginLeft: 25,
      overflow: 'hidden'
    }
});
export default HomeScreen;
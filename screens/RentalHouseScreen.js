import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ImageBackground, Platform } from 'react-native';
import { doc, getDoc, collection, query, where, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { useFonts, Itim_400Regular } from '@expo-google-fonts/itim';
import Header from '../components/Header';
import Entypo from 'react-native-vector-icons/Entypo';
import ConfirmHouseModal from '../components/ConfirmHouseModal';
import { db } from '../config/firebase';
import ButtonOrange from '../components/ButtonOrange';
import { set } from 'firebase/database';
import GoBackButton from '../components/GoBackButton';
const houseOne = (require('../assets/images/levelOne.jpg'));
const houseTwo = (require('../assets/images/levelTwo.jpg'));
const houseThree = (require('../assets/images/levelThree.jpg'));
const image = (require('../assets/images/restaurant.jpg'));


const RentalHouseScreen = ({ navigation, route }) => {
    const [houses, setHouses] = useState([]);
    const [confirmHouseModalVisible, setConfirmHouseModalVisible ] = useState(false);
    const [houseTitle, setHouseTitle] = useState(''); // [Rachel, Alice, Bob
    const [houseId, setHouseId] = useState('');
    const [price, setPrice] = useState(0);
    const [healthImpact, setHealthImpact] = useState(0);
    const [happinessImpact, setHappinessImpact] = useState(0);
    const [balance, setBalance] = useState(0);
    const [health, setHealth] = useState(0);
    const [happiness, setHappiness] = useState(0);  
    
    const uid = route.params.uid; 
    
    const toggleConfirmHouseModalVisible = () => {
        setConfirmHouseModalVisible(!confirmHouseModalVisible);
        
      }
  
    useEffect(() => {
        const fetchHouses = async () => {
            const houseCollection = collection(db, 'Houses');
            const houseSnapshot = await getDocs(houseCollection);
            const houseList = houseSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setHouses(houseList);

        };
        fetchHouses();
        userInfoFetch(); 

    }, [balance]);

    

    const handleRentHouse = async (houseId) => {
        updateDoc(doc(db, 'users', uid), {
            house: houseId,
        });
        // try {
        //     // Determine the index of the NPC in the npcs array
        //     const houseIndex = houses.findIndex(house => house.id === id);
        //     if (houseIndex === -1) {
        //         console.error(`house with id: ${id} not found`);
        //         return;
        //     }
    
        //     // Update the user's relationship attribute based on the NPC name
        //     const updatedRelationship = [...relationship]; // Create a copy of the relationship array
        //     updatedRelationship[npcIndex] = updatedRelationship[npcIndex] + 1; // Increment the relationship value
        //     await updateDoc(doc(db, 'users', uid), {
        //         house: 
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

            <ConfirmHouseModal
            toggleFunction={toggleConfirmHouseModalVisible}
            isVisible={confirmHouseModalVisible}
            confirmFunction={() => handleRentHouse(houseId)}
            houseTitle={houseTitle}
            price={price}
            balance={balance}
            health={healthImpact}
            happiness={happinessImpact}
            
            />
            <View style={{ width: '95%', marginTop: 10}}>
            <GoBackButton 
            onPress={goBack}/>   
            </View>
            
            <View style={styles.imagesAllContainer}>
            <Text style={{color: '#51330B', fontSize: 30, fontFamily: 'Itim_400Regular', marginBottom: 30}}>Rent a house</Text>

                <View style={{flexDirection: 'row'}}>
                    <View>
                        <View style={styles.loveLevel}> 
                            <Text style={{color: 'white', fontSize: 30, fontFamily: 'Itim_400Regular'}}>Level 1</Text>
                        </View>
                        <View style={styles.imageContainer}>
                        <Image source={houseOne} resizeMode='cover' style={styles.image}></Image>
                        </View>
                    </View>

                    <View>
                        <View style={styles.loveLevel}>
                            <Text style={{color: 'white', fontSize: 30, fontFamily: 'Itim_400Regular'}}>Level 2</Text>
                        </View>
                        <View style={styles.imageContainer}>
                            <Image source={houseTwo} resizeMode='cover' style={styles.image}></Image>
                        </View>
                    </View>

                    <View>
                        <View style={styles.loveLevel}>
                            <Text style={{color: 'white', fontSize: 30, fontFamily: 'Itim_400Regular'}}>Level 3</Text>
                        </View>
                        <View style={styles.imageContainer}>
                        <Image source={houseThree} resizeMode='cover' style={styles.image}></Image>
                        </View>
                    </View>
                    
                </View>
                <View style={{flexDirection: 'row', gap: Platform.OS === 'ios' ? 5 : null}}>
                {houses.slice(1).map((house, index) =>{
                    return (
                    <ButtonOrange
                        key={house.id}
                        disabled={false}
                        onPress={() => {
                            toggleConfirmHouseModalVisible();
                            setHouseTitle(house.title);
                            setHouseId(house.id);
                            setPrice(house.rental_rate);
                            setHappinessImpact(house.happiness_impact);
                            setHealthImpact(house.health_impact)}}>
                        <Text style={{color: 'white', fontSize: 28, fontFamily: 'Itim_400Regular'}}>Rent</Text>
                    </ButtonOrange>
                )}
                )}
                </View>
                <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
                    <ButtonOrange
                        onPress={() => {
                            console.log(houses[0].title)
                            toggleConfirmHouseModalVisible();
                            setHouseTitle(houses[0].title);
                            setHouseId(houses[0].id);
                            setPrice(houses[0].rental_rate);
                            setHappinessImpact(houses[0].happiness_impact);
                            setHealthImpact(houses[0].health_impact)}}
                            disabled={false}
                            >
                        <Text style={{color: 'white', fontSize: 25, fontFamily: 'Itim_400Regular'}}>Homeless</Text>
                    </ButtonOrange>
                </View>
            </View>
            
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
    npcItem: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
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
    imagesAllContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '95%',
        borderColor: "#3B2105",
            borderWidth: 2,
          backgroundColor: '#EFE0BD',
          padding: 10,
            height: '55%',
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


export default RentalHouseScreen;
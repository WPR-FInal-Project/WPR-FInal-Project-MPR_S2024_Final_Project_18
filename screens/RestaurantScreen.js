import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ImageBackground, Platform } from 'react-native';
import { doc, getDoc, collection, query, where, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { useFonts, Itim_400Regular } from '@expo-google-fonts/itim';
import Header from '../components/Header';
import Entypo from 'react-native-vector-icons/Entypo';
import ConfirmDateModal from '../components/ConfirmDateModal';
import { db } from '../config/firebase';
import ButtonOrange from '../components/ButtonOrange';
import { set } from 'firebase/database';
import GoBackButton from '../components/GoBackButton';
const bobImg = (require('../assets/images/bob.jpeg'));
const aliceImg = (require('../assets/images/alice.jpg'));
const rachelImg = (require('../assets/images/rachel.jpeg'));
const image = (require('../assets/images/restaurant.jpg'));


const RestaurantScreen = ({ navigation, route }) => {
    const [npcs, setNpcs] = useState([]);
    const [confirmDateModalVisible, setConfirmDateModalVisible ] = useState(false);
    const [npcName, setNpcName] = useState(''); // [Rachel, Alice, Bob
    const [npcId, setNpcId] = useState('');
    const [relationship, setRelationship] = useState([route.params[0]?.Rachel || 0, route.params[1]?.Alice || 0, route.params[2]?.Bob || 0]);
    const [balance, setBalance] = useState(0);
    const [health, setHealth] = useState(0);
    const [happiness, setHappiness] = useState(0);  
    
    const uid = route.params.uid; 
    
    const toggleConfirmDateModalVisible = () => {
        setConfirmDateModalVisible(!confirmDateModalVisible);
        
      }
  
    useEffect(() => {
        const fetchNpcs = async () => {
            const npcCollection = collection(db, 'NPCs');
            const npcSnapshot = await getDocs(npcCollection);
            const npcList = npcSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setNpcs(npcList);
        };
        fetchNpcs();
        relationshipFetch(); // Fetch relationship data when component mounts

    }, [balance]);

    

    const handleDateWithNpc = async (id) => {
        try {
            // Determine the index of the NPC in the npcs array
            const npcIndex = npcs.findIndex(npc => npc.id === id);
            if (npcIndex === -1) {
                console.error(`NPC with id: ${id} not found`);
                return;
            }
    
            // Update the user's relationship attribute based on the NPC name
            const updatedRelationship = [...relationship]; // Create a copy of the relationship array
            updatedRelationship[npcIndex] = updatedRelationship[npcIndex] + 1; // Increment the relationship value
            await updateDoc(doc(db, 'users', uid), {
                relationship: updatedRelationship,
                happiness: happiness + 10,
                balance: balance - 10,
            });
    
            // Update the state to reflect the changes
            setRelationship(updatedRelationship);
            setBalance(balance - 10);
            setHappiness(happiness + 10);
    
            console.log(`Relationship with NPC ${id} updated successfully`);
        } catch (error) {
            console.error("Error updating relationship:", error);
        }
    };

    const relationshipFetch = async () => {
        try {
            // Fetch the user document from Firestore
            const userDocRef = doc(db, 'users', uid);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                if (userData.relationship) {
                    // If relationship data exists in the user document, set it in the state
                    setRelationship(userData.relationship);

                } else {
                    // If relationship data does not exist, initialize it with default values
                    const defaultRelationship = [0, 0, 0]; // Assuming 3 NPCs
                    setRelationship(defaultRelationship);
                }
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

            <ConfirmDateModal
            toggleFunction={toggleConfirmDateModalVisible}
            isVisible={confirmDateModalVisible}
            confirmFunction={() => handleDateWithNpc(npcId)}
            npcName={npcName}
            />
            <View style={{ width: '95%', marginTop: 10}}>
            <GoBackButton 
            onPress={goBack}/>   
            </View>
            
            <View style={styles.imagesAllContainer}>
            <Text style={{color: '#51330B', fontSize: 30, fontFamily: 'Itim_400Regular', marginBottom: 30}}>You want to date with?</Text>

                <View style={{flexDirection: 'row'}}>
                    <View>
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
                    </View>
                    
                </View>
                <View style={{flexDirection: 'row', gap: Platform.OS === 'ios' ? 5 : null}}>
                    {npcs.map(npc => (
                        <ButtonOrange
                            key={npc.id}
                            disabled={false}
                            onPress={() => {
                                toggleConfirmDateModalVisible();
                                setNpcName(npc.name);
                                setNpcId(npc.id)}}>
                            <Text style={{color: 'white', fontSize: 28, fontFamily: 'Itim_400Regular'}}>{npc.name}</Text>
                        </ButtonOrange>
                    ))}
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
        justifyContent: 'center',
        alignItems: 'center',
        width: '95%',
        borderColor: "#3B2105",
            borderWidth: 2,
          backgroundColor: '#EFE0BD',
          padding: 10,
            height: '40%',
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
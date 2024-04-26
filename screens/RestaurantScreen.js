import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { doc, getDoc, collection, query, where, getDocs, setDoc, updateDoc } from "firebase/firestore";

import { db } from '../config/firebase';
const bobImg = (require('../assets/images/bob.jpeg'));
const aliceImg = (require('../assets/images/alice.jpg'));
const rachelImg = (require('../assets/images/rachel.jpeg'));



const RestaurantScreen = ({ navigation, route }) => {
    const [npcs, setNpcs] = useState([]);
    const [rachelRelationship, setRachelRelationship] = useState(route.params[0]?.Rachel || 0);
    const [aliceRelationship, setAliceRelationship] = useState(route.params[1]?.Alice || 0);
    const [bobRelationship, setBobRelationship] = useState(route.params[2]?.Bob || 0);
    const [relationship, setRelationship] = useState([rachelRelationship, aliceRelationship, bobRelationship]);
    const uid = route.params.uid;   
    useEffect(() => {
        const fetchNpcs = async () => {
            const npcCollection = collection(db, 'NPCs');
            const npcSnapshot = await getDocs(npcCollection);
            const npcList = npcSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setNpcs(npcList);
        };
        fetchNpcs();
    }, []);

    const handleDateWithNpc = async (npcName) => {
        try {
            // Determine the index of the NPC in the npcs array
            const npcIndex = npcs.findIndex(npc => npc.name === npcName);
            if (npcIndex === -1) {
                console.error(`NPC with name ${npcName} not found`);
                return;
            }
    
            // Update the user's relationship attribute based on the NPC name
            const updatedRelationship = [...relationship]; // Create a copy of the relationship array
            updatedRelationship[npcIndex] = updatedRelationship[npcIndex] + 1; // Increment the relationship value
            await updateDoc(doc(db, 'users', uid), {
                relationship: updatedRelationship
            });
    
            // Update the state to reflect the changes
            setRelationship(updatedRelationship);
    
            console.log(`Relationship with NPC ${npcName} updated successfully`);
        } catch (error) {
            console.error("Error updating relationship:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Choose an NPC to Date With:</Text>
            <View style={styles.imagesAllContainer}>
                <View style={styles.imageContainer}>
                <Image source={aliceImg} resizeMode='contain' style={styles.image}></Image>

                </View>
                <View style={styles.imageContainer}>
                <Image source={bobImg} resizeMode='contain' style={styles.image}></Image>

                </View>
                <View style={styles.imageContainer}>
                <Image source={rachelImg} resizeMode='contain' style={styles.image}></Image>

                </View>
                

            </View>
            {npcs.map(npc => (
                <Pressable
                    key={npc.id}
                    style={styles.npcItem}
                    onPress={() => handleDateWithNpc(npc.name)}>
                    <Text>{npc.name}</Text>
                </Pressable>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    npcItem: {
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    imagesAllContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 10,
    },
    imageContainer: {
        width: '30%',
        height: 110,
        borderRadius: 10,
        alignItems: 'center',

        overflow: 'hidden',
    }, 
    image: {
        width: '110%',
        height: '110%',
    }
});

export default RestaurantScreen;
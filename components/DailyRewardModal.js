import { child } from 'firebase/database';
import React from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import Modal from "react-native-modal";
import { useFonts, Itim_400Regular } from '@expo-google-fonts/itim';

const DailyRewardModal = ({ streak, isVisible, toggleFunction }) => {
  let [fontsLoaded] = useFonts({
    Itim_400Regular,
  });
  if (!fontsLoaded) {
    return <></>;
  } else {
return (
    <Modal isVisible={isVisible} style={styles.modalContainer}>
      
      <View style={styles.modal}>
      <Text style={{fontFamily: 'Itim_400Regular', fontSize: 35, color: 'white', fontWeight: '600'}}>Congratulation!</Text>    

        <View style={styles.userInfoContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>login streak: {streak} </Text>
            </View>
        </View>

        <View style={styles.userInfoContainer}>
            <View><Text style={[styles.text, {color: '#51330B'}]}>Reward</Text></View>

            <View style={styles.textContainer}>
              <Text style={styles.text}>+100 gold</Text>
            </View>
        </View>
                  
                  <View style={[styles.BottomButtons, {alignSelf: 'center'}]}>
                    <View style={[styles.buttonWrapper]}>
                      <Pressable style={styles.button} onPress={toggleFunction}>
                        <Text style={{color: 'white', fontSize: 30, fontFamily: 'Itim_400Regular'}}>Close</Text>
                      </Pressable>
                    </View>
                  </View>
      </View>
    </Modal>
);
}
};

const styles = StyleSheet.create({
    BottomButtons: {
        height: 70,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
              shadowOffset: {
                  width: 0,
                  height: 6,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,
              elevation: 40,
              zIndex:999,
      },
      button:{ 
        backgroundColor: '#F14C01',
        borderBottomWidth: 2, 
        alignItems: 'center',
        width: 110,
        borderRadius: 10,
        justifyContent: 'center',
        height: '85%', 
        borderBottomColor: '#FFE472', 
        backgroundColor: '#F58D34'
      },
      buttonWrapper: {
        height: '90%', 
        backgroundColor: '#C54319', 
        borderRadius: 10, 
         borderColor: '#692600', 
        borderWidth: 2
      },
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
        textContainer: {
        backgroundColor: '#51330B',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 10,
        width: 210,
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        fontFamily: 'Itim_400Regular',
        fontSize: 26,
        color: '#EFE0BD',
        
      },
      userInfoContainer: {
        borderColor: "#3B2105",
            borderWidth: 2,
          backgroundColor: '#EFE0BD',
          padding: 10,
        
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
    modalContainer: {
      justifyContent: 'center',
      alignItems: 'center'
      
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      backgroundColor: '#F1B564',
      borderRadius: 10,
      borderColor: '#692600',
      
      borderWidth: 5,
      borderRadius: 10,
      width: '90%',
      height: '60%',
      padding: 6,
      alignItems: 'center',
        justifyContent: 'center',
    }
      
});
export default DailyRewardModal;
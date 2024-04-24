import { child } from 'firebase/database';
import React from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import Modal from "react-native-modal";
import { useFonts, Itim_400Regular } from '@expo-google-fonts/itim';
import ButtonOrange from './ButtonOrange';
const SkipFiveModal = ({ isVisible, toggleFunction, confirmFunction }) => {
  let [fontsLoaded] = useFonts({
    Itim_400Regular,
  });
  if (!fontsLoaded) {
    return <></>;
  } else {
return (
    <Modal isVisible={isVisible} style={styles.modalContainer}>
      
      <View style={styles.modal}>

        <View style={styles.userInfoContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>You will skip to year 5 </Text>
            </View>
        </View>

        <View style={[styles.BottomButtons, {alignSelf: 'center'}]}>
                <ButtonOrange onPress={toggleFunction} disabled={false}>
                    <Text style={{color: 'white', fontSize: 30, fontFamily: 'Itim_400Regular'}}>Close</Text>
                  </ButtonOrange>
                  <View style={{width: 30}}></View>
                  <ButtonOrange onPress={() => {
                    confirmFunction();
                    toggleFunction()
                  }} disabled={false}>
                    <Text style={{color: 'white', fontSize: 30, fontFamily: 'Itim_400Regular'}}>Skip</Text>

                  </ButtonOrange>     
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
        flexDirection: 'row',
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
        width: 220,
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        fontFamily: 'Itim_400Regular',
        fontSize: 32,
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
      height: '40%',
      padding: 6,
      alignItems: 'center',
        justifyContent: 'center',
    }
      
});
export default SkipFiveModal;
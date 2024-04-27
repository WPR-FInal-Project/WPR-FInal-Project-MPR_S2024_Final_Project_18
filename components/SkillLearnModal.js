import { child } from 'firebase/database';
import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import Modal from "react-native-modal";
import { useFonts, Itim_400Regular } from '@expo-google-fonts/itim';
import ButtonOrange from './ButtonOrange';
const SkillLearnModal = ({ isVisible, toggleFunction, confirmFunction, name, cost, disable,}) => {
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
      <Text style={[styles.text, {color: '#51330B', fontSize: 25}]}>Learn {name}? </Text>
      </View>
        <View style={styles.userInfoContainer}>

            <View style={styles.textContainer}>
                <View style={styles.textContainer}>
                <Text style={styles.text}>Tution Fee:  {cost} </Text>

                </View>
                

            </View>
        </View>
        <View style={[styles.BottomButtons, {alignSelf: 'center', justifyContent:'flex-end', flex: 1, marginBottom: 20}]}>
                <ButtonOrange onPress={toggleFunction} disabled={false}>
                    <Text style={{color: 'white', fontSize: 30, fontFamily: 'Itim_400Regular'}}>No</Text>
                  </ButtonOrange>
                  <View style={{width: 30}}></View>
                  <ButtonOrange onPress={() => {
                    confirmFunction();
                    toggleFunction()
                  }} disabled={disable}>
                    <Text style={{color: 'white', fontSize: 30, fontFamily: 'Itim_400Regular'}}>Yes</Text>

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
        
        padding: Platform.OS === 'ios' ? 8 : 4,
        borderRadius: 10,
        width: '95%',
        alignItems: 'center',
        
      },
      text: {
        fontFamily: 'Itim_400Regular',
        fontSize: 22,
        color: '#EFE0BD',
        
      },
      userInfoContainer: {
        borderColor: "#3B2105",
            borderWidth: 2,
          backgroundColor: '#EFE0BD',
          padding: 10,
            width: '95%',
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
      width: '95%',
      height: '40%',
      padding: 6,
      
    }
      
});
export default SkillLearnModal;
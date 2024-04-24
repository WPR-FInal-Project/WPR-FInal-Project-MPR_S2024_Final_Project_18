import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
const ButtonOrange = ( { children, onPress, disabled}) => {
    return (
        <View style={styles.BottomButtons}>
                  <View style={[styles.buttonWrapper, {backgroundColor: disabled === false ? '#C54319' : 'gray' }]}>
                    <Pressable style={[styles.button, 
                        {backgroundColor: disabled === false ? '#F58D34' : 'gray',
                        borderBottomColor: disabled === false ? '#FFE472' : 'white'}]} onPress={onPress} disabled={disabled}>
                      {children}
                    </Pressable>
                  </View>
                </View>
    );
};

const styles = StyleSheet.create({
    BottomButtons: {
        height: 80,
        
        width: '33.33%',
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'flex-end',
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
        height: 50,
        width: 110,
        borderRadius: 10,
        height: '85%', 
        borderBottomColor: '#FFE472', 
        borderBottomWidth: 2, 
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F58D34'
      },
      buttonWrapper: {
        height: '90%', 
        backgroundColor: '#C54319', 
        borderRadius: 10, 
        alignItems: 'flex-start',
         borderColor: '#692600', 
        borderWidth: 2
      },
    });
export default ButtonOrange;
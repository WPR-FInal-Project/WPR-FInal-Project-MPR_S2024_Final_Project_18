import React from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
const LongLabel = ( { label, enable }) => {
    return (
        <View style={styles.BottomButtons}>
                  <View style={[styles.buttonWrapper, {backgroundColor: enable === true ? '#C54319' : 'gray' }]}>
                    <View style={[styles.button, 
                        {backgroundColor: enable === true ? '#F58D34' : 'gray',
                        borderBottomColor: enable === true ? '#FFE472' : 'white'}]} >
                        <Text style={{color: 'white', fontSize: 25, fontFamily: 'Itim_400Regular'}}>{label}</Text>
                    </View>
                  </View>
                </View>
    );
};

const styles = StyleSheet.create({
    BottomButtons: {
        height: 80,
        width: '33.33%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'flex-start',
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
        height: 30,
        width: 130,
        borderRadius: 10,
        height: '85%', 
        borderBottomColor: '#FFE472', 
        borderBottomWidth: 2, 
        alignItems: 'center',
        justifyContent: 'center',
        
      },
      buttonWrapper: {
        height: '60%', 
        backgroundColor: '#C54319', 
        borderRadius: 10, 
        alignItems: 'flex-start',
         borderColor: '#692600', 
        borderWidth: 2
      },
    });
export default LongLabel;
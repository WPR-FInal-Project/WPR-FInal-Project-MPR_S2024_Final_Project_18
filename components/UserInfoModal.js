import React from 'react';

import { View, Text, Pressable, StyleSheet, Modal } from 'react-native';
import UserInfo from './UserInfo';
const UserInfoModal = ({ userModalVisible, currentUser, skills, toggleUserModal, signOut, job}) => {
    return (
              <View style={styles.userModal}>
                <View style={[, {flex: 1}]}>
                  <Text style={{fontFamily: 'Itim_400Regular', fontSize: 35, color: 'white', fontWeight: '600'}}>User Information</Text>    
                  <UserInfo userInfo={currentUser} skills={skills} job={job}/>
                </View>

                <View style={{flexDirection: 'row', width: '100%', justifyContent:'center', marginBottom: 25}}>
                  <View style={[styles.BottomButtons, {alignSelf: 'center'}]}>
                    <View style={[styles.buttonWrapper, { marginRight: 30}]}>
                      <Pressable style={styles.button} onPress={() => {toggleUserModal()}}>
                        <Text style={{color: 'white', fontSize: 30, fontFamily: 'Itim_400Regular'}}>Close</Text>
                      </Pressable>
                    </View>
                  </View>
                  <View style={[styles.BottomButtons, {alignSelf: 'center'}]}>
                    <View style={[styles.buttonWrapper, {marginLeft: 30}]}>
                      <Pressable style={styles.button} onPress={signOut}>
                        <Text style={{color: 'white', fontSize: 30, fontFamily: 'Itim_400Regular'}}>Log out</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              
              </View>

    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignSelfc: 'center',
        justifyContent: 'center',
        alignItems: 'center'
      },
      userModal: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#F1B564',
        borderRadius: 10,
        borderColor: '#692600',
        
        borderWidth: 5,
        borderRadius: 10,
        width: '90%',
        height: '80%',
        padding: 6,
      },
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

export default UserInfoModal;
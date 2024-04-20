import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts, Itim_400Regular } from '@expo-google-fonts/itim';
import AppLoading from 'expo-app-loading';


const UserInfo = ( {userInfo} ) => {
    let [fontsLoaded] = useFonts({
        Itim_400Regular,
      });
      if (!fontsLoaded) {
        return <></>;
      } else {
    return (
        <View>
            <View style={styles.userInfoContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>age: {userInfo.age}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>balance: {userInfo.balance}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>gender: {userInfo.gender}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>jobs: {userInfo.jobs}</Text>
                </View>
                </View>

            <View style={styles.userInfoContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>skills: {userInfo.skills}</Text>
                </View>
            </View>
        </View>
    );
}
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      textContainer: {
        backgroundColor: '#51330B',
        justifyContent: 'center',
        paddingLeft: 10,
        height: 50
      },
      text: {
        fontFamily: 'Itim_400Regular',
        fontSize: 23,
        color: '#EFE0BD',
        marginBottom: 10,
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
    },
    
});


export default UserInfo;
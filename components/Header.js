import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import UpperBar from './UpperBar';

const Header = ({ balance, health, happiness}) => {
    return (
        <View style={styles.headerContainer}>
        <View style={styles.infomationContainer}>
            <View style={styles.balanceContainer}>
            <UpperBar/>
             <FontAwesome5 name="coins" size={35} color="yellow" style={styles.icons}/>     
             <Text style={{fontFamily: 'Itim_400Regular', fontSize: 23, color: 'white', fontWeight: '600'}}>{balance}</Text>
            </View>
            
            <View style={styles.healthContainer}>
            <UpperBar/>
              <MaterialCommunityIcons name="heart-multiple" size={35} color="#F73653" style={styles.icons}/>     
              <Text style={{fontFamily: 'Itim_400Regular', fontSize: 23, color: 'white', fontWeight: '600'}}>{health}</Text>
            </View>

            <View style={styles.happinessContainer}>
            <UpperBar/>
              <MaterialCommunityIcons name="emoticon-happy" size={35} color="yellow" style={styles.icons}/>     
              <Text style={{fontFamily: 'Itim_400Regular', fontSize: 23, color: 'white', fontWeight: '600'}}>{happiness}</Text>
            </View>
          </View>

        <View style={styles.headerBottomBar}></View>
      </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 110,
        width: '100%',
        flexDirection: 'column',
        backgroundColor: '#7D5E46',
        
      },
      infomationContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        marginTop: 50,
        paddingLeft: 10,
        justifyContent: 'center',
      },
      icons: {
        position: 'absolute',
        left: -14,
        
      },
      balanceContainer:{
        width: 100,
        height: 40,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#5C3933',
        borderRadius: 10,
        borderColor: '#331101',
        borderWidth: 2,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      },
      healthContainer:{
        width: 100,
        height: 40,
        marginHorizontal: 25,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#5C3933',
        borderRadius: 10,
        borderColor: '#331101',
        borderWidth: 2,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      },
      happinessContainer:{
        
        width: 100,
        height: 40,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#5C3933',
        borderRadius: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderColor: '#331101',
        borderWidth: 2,
      },
      headerBottomBar: {
        backgroundColor: '#362505', 
        height: 13, 
        width: '100%', 
        borderTopColor: '#A37A64',
        borderWidth: 3,
      },
});
export default Header;
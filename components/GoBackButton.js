import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const GoBackButton = ( {onPress} ) => {
    return (
        <View style={styles.userInfoContainer}>
            <Pressable onPress={onPress}>
            <Ionicons name="chevron-back" size={40} color="black" />
            </Pressable>
        </View>
    );
};

styles = StyleSheet.create({
userInfoContainer: {
        borderColor: "#3B2105",
            borderWidth: 4,
          backgroundColor: '#EFE0BD',
          padding: 10,
            width: 70,
          marginTop: 8,
          borderRadius: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          alignItems: 'center',
        justifyContent: 'center',
    },
});

export default GoBackButton;
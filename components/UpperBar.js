import React from 'react';

import { View } from 'react-native';
const UpperBar = () => {
    return (
        <View style={{backgroundColor: '#362505', 
                        height: 6, 
                        width: '100%',
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,
                        alignSelf: 'flex-start', 
                        borderTopColor: '#2A1A12',
                        }}></View>
    );
};

export default UpperBar;
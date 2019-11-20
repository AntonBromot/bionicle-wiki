import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const SomeComponent = () => (
    <TouchableOpacity onPress={() => console.log("pressedd")}>
        <View style={{width: "100%", height: "100%"}}></View>
    </TouchableOpacity>
)

export default SomeComponent

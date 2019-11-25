import React, { useState, useCallback} from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import { NativeModules } from 'react-native';

const promisifyBlob = func => new Promise( ( res ) => {
    func( data => res(data) )
} )

const toogleCallback = async ( isOn, updateStatus ) => {
    const IsOnChange =  await promisifyBlob( NativeModules.Bulb.toggleOn )
    console.log("now", isOn, IsOnChange)
    updateStatus()
}

const updateStatusCallback = async setIsOn => {
    const isOnStatus =  await promisifyBlob( NativeModules.Bulb.getStatus )
    setIsOn( isOnStatus )
}

const NativeComponent = () => {
    const [ isOn, setIsOn ] = useState( false ),
          updateStatus = useCallback( () => updateStatusCallback( setIsOn ) ),
          toggle = useCallback( () => toogleCallback( isOn, updateStatus ), [isOn] )

    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Simple RN bridge example</Text>
            <Text> Bulb is { isOn ? "ON": "OFF"}</Text>
            <Button onPress={ toggle } title={ isOn ? "Turn OFF" : "Turn ON"  } color="#FF6347"/>
        </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

export default NativeComponent

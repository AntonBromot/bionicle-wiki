import {Animated, StyleSheet, Text, ScrollView, View, PanResponder} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { PureComponent } from "react";

import Draggable from "../components/Draggable"
import SomeComponent from "../components/SomeComponent"
import { IconBacked } from "./styles"
import {WINDOW_HEIGHT} from '../../../../../constants/metcrics';

export default class Screen extends PureComponent {

    state = {
        dropZone: new Animated.Value(0),
        dropZonePosition: null,
        scrollEnabled: true
    }

    dropZoneChange = ( forShow, newPosition, scrollEnabled ) => {
        const { dropZone, dropZonePosition } = this.state,
            dropZoneConfig = { toValue: forShow ? 150 : 0, duration: 600 },
            animation = Animated.timing( dropZone, dropZoneConfig ).start

        console.log("dropZoneChange", forShow, newPosition, scrollEnabled)

        this.setState({ scrollEnabled, dropZonePosition: newPosition || dropZonePosition }, animation  )
    }

    render() {
        const { dropZone, dropZonePosition, scrollEnabled } = this.state,
            dropZoneHeight = dropZone.interpolate({ inputRange: [ 0, 150 ], outputRange: [ 0, 150 ], extrapolate: 'clamp' }),
            dropZoneOpacity = dropZone.interpolate({ inputRange: [0, 150], outputRange: [0, 1], extrapolate: 'clamp' }),
            dropZoneStyles = { ...dropZonePosition, height: dropZoneHeight, opacity: dropZoneOpacity };

        return (
            <View style={styles.mainContainer}>
                <Animated.View style={[ styles.animatedHeaderContainer, dropZoneStyles ]}>
                   <IconBacked name="trash" />
                </Animated.View>
                <ScrollView contentContainerStyle={ { position: "relative" }} scrollEnabled={scrollEnabled} style={styles.row}  >
                    { Array.from( Array( 30 ), (_, i) => i ).map( (item, ind) =>
                        <Draggable key={ind} dropZoneChange={ this.dropZoneChange } >
                            <SomeComponent/>
                        </Draggable>
                    ) }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    animatedHeaderContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5,
        backgroundColor: "rgba(0, 0, 0, .8)"
    },
    mainContainer: {
        flex: 1
    },
    row: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap"
    }
});



/*import * as React from 'react';
import { connect } from 'react-redux'
import {compose, lifecycle, withHandlers, withStateHandlers, withReducer, withContext } from 'recompose';


import { View, Animated, Image, Easing } from 'react-native'


const Custom = props => {
    console.log("this", this)

    const spin = this.spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    return (
        <View style={{ flex: 1}}>
            <Animated.Image
                style={{ width: 227, height: 200, transform: [{ rotate: spin }] }}
                source={{uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png'}}
            />
        </View>
    )
}

const enchant = compose(
    withContext(
        this.spinValue = new Animated.Value(0),
        () => this.spinValue
    ),
    withHandlers({
        spin: props => ( cb ) => {
            console.log("inside spin")
            this.spinValue.setValue(0)
            Animated.timing( this.spinValue,{ toValue: 1, duration: 8000, easing: Easing.linear } ).start( () => cb(cb) )
        }
    }),
    lifecycle({
        componentDidMount () {
            const { spin } = this.props

            console.log("componentDidMount", spin)

            spin( spin )
        }
    }),

)

export default enchant(Custom)
*/

import React from 'react';
import { StyleSheet, View, Text, Dimensions, Animated, PanResponder } from 'react-native';

export default function Drag() {
    const pan = React.useRef(new Animated.ValueXY());

    const isDropZone = React.useCallback((gesture) => {
        console.log(gesture.y0 )
        return true
    }, );




    const panResponder = React.useMemo(() => PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([null, { dx  : pan.current.x, dy  : pan.current.y }], ),
        onPanResponderRelease: (e, gesture) => {
            isDropZone(gesture) && Animated.spring( pan.current,{toValue:{x:0,y:0}}  ).start();
        }
    }), []);

    return (
        <View style={styles.mainContainer}>

            <View style={styles.draggableContainer}>
                <Animated.View {...panResponder.panHandlers} style={[pan.current.getLayout(), styles.circle]}>
                    <Text style={styles.text}>Drag me!</Text>
                </Animated.View>
            </View>
        </View>
    );
}

let CIRCLE_RADIUS = 36;
let Window = Dimensions.get('window');
let styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    dropZone: {
        height  : 100,
        backgroundColor:'#2c3e50'
    },
    text        : {
        marginTop   : 25,
        marginLeft  : 5,
        marginRight : 5,
        textAlign   : 'center',
        color       : '#fff'
    },
    draggableContainer: {
        position    : 'absolute',
        top         : Window.height/2 - CIRCLE_RADIUS,
        left        : Window.width/2 - CIRCLE_RADIUS,
    },
    circle: {
        backgroundColor     : '#1abc9c',
        width               : CIRCLE_RADIUS*2,
        height              : CIRCLE_RADIUS*2,
        borderRadius        : CIRCLE_RADIUS
    }
});

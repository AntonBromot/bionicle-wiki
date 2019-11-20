import * as React from 'react';
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

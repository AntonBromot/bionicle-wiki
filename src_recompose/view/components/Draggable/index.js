import React, { Component } from "react";
import {Animated, Easing, PanResponder, StyleSheet} from 'react-native';
import {WINDOW_HEIGHT} from '../../../constants/metcrics';

export default class Draggable extends Component {
    state = {
        isDragging: false,
        pan: new Animated.ValueXY(),
        opacity: new Animated.Value(1),
        visible: true,
        spinValue: new Animated.Value(0),
    }

    panResponder = PanResponder.create({
        onStartShouldSetPanResponder: ( e, g ) => true,
        onMoveShouldSetPanResponderCapture: (e, g) => g.dx !== 0 && g.dy !== 0,
        onShouldBlockNativeResponder: () => false,
        onPanResponderMove: Animated.event([ null, { dx: this.state.pan.x, dy: this.state.pan.y } ]),
        onPanResponderGrant: ( e, g ) => {
            const dropZonePosition = WINDOW_HEIGHT / 2 < g.y0 ? { top: 0 } : { bottom: 0 },
                  { dropZoneChange } = this.props;

            this.setState({ isDragging: true }, this.spinOnDrag )

            dropZoneChange( true, dropZonePosition, false )
        },
        onPanResponderTerminate: () => {
            const { pan } = this.state,
                { dropZoneChange } = this.props,
                animatedGoBackConf = { toValue: {x: 0, y: 0}, friction: 5 };

            this.setState({ isDragging: false })

            Animated.spring( pan, animatedGoBackConf ).start()


            dropZoneChange( false, null, true )
        },
        onPanResponderRelease: (e, g) => {
            const { opacity, pan } = this.state,
                { dropZoneChange, onDragSuccess } = this.props,
                dropZonePosition = WINDOW_HEIGHT / 2 > g.y0 ? { top: 0 } : { bottom: 0 },
                inDropArea =  this.isDropArea(g, dropZonePosition),
                dragSuccessCallback = () => this.setState({ visible: false, isDragging: false }, onDragSuccess ),
                dragBackCallback = () => this.setState({ isDragging: false }),
                animatedGoBackConf = { toValue: {x: 0, y: 0}, friction: 5 }

            if ( !inDropArea ) Animated.spring(pan, animatedGoBackConf ).start( dragBackCallback )
            else Animated.timing( opacity, {toValue: 0, duration: 1000}).start( dragSuccessCallback )

            dropZoneChange( false, null, true )
        }
    })

    spinOnDrag = () => {
        const { spinValue, isDragging } = this.state

        if ( !isDragging ) return Animated.timing( spinValue ).stop()

        const runTimer = ( toValue, duration ) => Animated.timing( spinValue, { toValue, duration, easing: Easing.linear })

        Animated.sequence(
            [ runTimer(1.0, 100), runTimer(-1.0, 150), runTimer(0, 100) ]
        ).start( this.spinOnDrag )
    }


    componentDidMount() {
        const { pan } = this.state
        this._val = { x: 0, y: 0 }
        pan.addListener( value => this._val = value);
    }

    isDropArea = ( gesture, position ) =>  {
        const isTop = position.hasOwnProperty( "top" ),
            { moveY } = gesture;

        return isTop ? moveY > WINDOW_HEIGHT - 150 : moveY < 150;
    }

    render() {
        const { pan, opacity, isDragging, visible, spinValue } = this.state,
            { children } = this.props,
            spin = spinValue.interpolate({ inputRange: [-1, 0, 1], outputRange: [ '-0.1rad', '0rad', '0.1rad' ] }),
            panStyle = { transform: [ ...pan.getTranslateTransform(), { rotate: spin }], opacity },
            allStyles = [ panStyle, { zIndex: isDragging ? 100 : 0, ...( !visible && { display: "none" } ) } ]

        return (
            <Animated.View  { ...this.panResponder.panHandlers } style={ allStyles } >
                { children }
            </Animated.View>
        )
    }

}

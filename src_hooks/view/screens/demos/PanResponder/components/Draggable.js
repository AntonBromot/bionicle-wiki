import React, { Component } from "react";
import {Animated, PanResponder, StyleSheet} from 'react-native';
import {WINDOW_HEIGHT} from '../../../../../constants/metcrics';

export default class Draggable extends Component {
    state = {
        isDragging: false,
        pan: new Animated.ValueXY(),
        opacity: new Animated.Value(1),
    }

    panResponder = PanResponder.create({
        onStartShouldSetPanResponder: ( e, g ) => true,
        onMoveShouldSetPanResponderCapture: (e, g) => g.dx !== 0 && g.dy !== 0,
        onShouldBlockNativeResponder: () => false,
        onPanResponderMove: Animated.event([ null, { dx: this.state.pan.x, dy: this.state.pan.y } ]),
        onPanResponderGrant: ( e, g ) => {
            const dropZonePosition = WINDOW_HEIGHT / 2 < g.y0 ? { top: 0 } : { bottom: 0 },
                 { dropZoneChange } = this.props;

            this.setState({ isDragging: true })

            dropZoneChange( true, dropZonePosition, false )
        },
        onPanResponderTerminate: () => {
            const { opacity, pan } = this.state,
                { dropZoneChange } = this.props;

            Animated.spring(pan, { toValue: {x: 0, y: 0}, friction: 5 }).start()
            this.setState({ isDragging: false })

            dropZoneChange( false, null, true )
        },
        onPanResponderRelease: (e, g) => {
            const { opacity, pan } = this.state,
                { dropZoneChange } = this.props,
                dropZonePosition = WINDOW_HEIGHT / 2 > g.y0 ? { top: 0 } : { bottom: 0 },
                inDropArea =  this.isDropArea(g, dropZonePosition)

            if ( !inDropArea ) Animated.spring(pan, { toValue: {x: 0, y: 0}, friction: 5 }).start()
            else Animated.timing( opacity, {toValue: 0, duration: 1000}).start()

            this.setState({ isDragging: false })

            dropZoneChange( false, null, true )
        }
    })

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
        const { pan, opacity, isDragging } = this.state,
            { children } = this.props,
            panStyle = { transform: pan.getTranslateTransform(), opacity },
            allStyles = [ panStyle, styles.circle, { zIndex: isDragging ? 100 : 0 } ]

        return (
            <Animated.View { ...this.panResponder.panHandlers } style={ allStyles } >
                { children }
            </Animated.View>
        )
    }

}


const styles = StyleSheet.create({
    circle: {
        margin: 10,
        backgroundColor: "skyblue",
        width: 30 * 2,
        height: 30 * 2,
        borderRadius: 30,
        position: "relative",
        zIndex: 1000
    }
});

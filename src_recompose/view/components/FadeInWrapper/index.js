import React, { PureComponent } from 'react';
import { Animated } from 'react-native';

export default class FadeInWrapper extends PureComponent {

    state = { fadeOpacity: new Animated.Value(0) }

    componentDidMount() {
        const { duration, delay } = this.props;
        this.runAnimation( duration, delay )
    }

    runAnimation = ( duration = 500, delay = 0 ) => {
        const { fadeOpacity } = this.state,
              config = { toValue: 1, duration, delay, useNativeDriver: true },
              animation = Animated.timing( fadeOpacity, config )

        animation.start()
    }

    render() {
        const { fadeOpacity } = this.state,
              { children } = this.props

        return <Animated.View style={{ opacity: fadeOpacity }}>{ children }</Animated.View>
    }
}

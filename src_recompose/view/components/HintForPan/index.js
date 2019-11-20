import React, { PureComponent } from 'react'
import { Animated } from "react-native"

import { HintIcon, HintText, HintContainer } from './styles'

const ASSETS = {
    text1: "Drag item for",
    text2: "more EFFECT"
}

export default class HintForPanComponent extends PureComponent {
    state = {
        opacity: new Animated.Value(1),
        visible: true
    }

    componentDidMount() {
        const { opacity } = this.state
        Animated.timing( opacity, { toValue: 0, duration: 2000, delay: 2000 }).start( this.hide )
    }

    hide = () => this.setState({  visible: false })

    render() {
        const { opacity, visible } = this.state

        return (
            <HintContainer style={{ opacity,  transform: [{ rotate: "30deg" }],  ...( !visible && { display: 'none' } ) }} >
                <HintText>{ ASSETS.text1 }</HintText>
                <HintIcon name="share" />
                <HintText>{ ASSETS.text2 }</HintText>
            </HintContainer>
        )
    }
}

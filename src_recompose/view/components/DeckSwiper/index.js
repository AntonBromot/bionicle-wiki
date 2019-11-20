import React, { PureComponent } from "react"
import { Animated, PanResponder } from "react-native"
import PropTypes from 'prop-types';

import { DeckContainer, ImageComp, ViewContainer, AnimatedView, ImageContainer, TextContainer, DescriptText, TitleText, PageNumber } from "./styles"
import { WINDOW_HEIGHT } from "../../../constants/metcrics"

export default class DeckSwiper extends PureComponent {
    static propTypes = {
        data: PropTypes.array
    }

    state = {
        currentIndex: 0,
        position: new Animated.ValueXY(),
        swipedCardPosition: new Animated.ValueXY({x: 0, y: -WINDOW_HEIGHT })
    }

    PanResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {
            const { currentIndex, position, swipedCardPosition } = this.state

            if ( gestureState.dy > 0 && ( currentIndex > 0 ) ) swipedCardPosition.setValue({ x:0, y: -WINDOW_HEIGHT + gestureState.dy })
            else position.setValue({ y: gestureState.dy })
        },
        onPanResponderRelease: (evt, gestureState) => {
            const { currentIndex, swipedCardPosition, position } = this.state,
                  { data } = this.props,
                  notLastItem = data.length-1 !== currentIndex

            if ( currentIndex > 0 && gestureState.dy > 50 && gestureState.vy > 0.7  ) {
                const config = { toValue: ({ x: 0, y: 0 }), duration: 400 },
                    cb = () => {
                        this.setState({ currentIndex: currentIndex - 1 })
                        swipedCardPosition.setValue({ x: 0, y: -WINDOW_HEIGHT })
                    }

                Animated.timing( swipedCardPosition, config ).start( cb )
            } else if ( notLastItem && -gestureState.dy > 50 && -gestureState.vy > 0.7 ) {
                const config = { toValue: ({ x: 0, y: -WINDOW_HEIGHT }), duration: 400 },
                    cb = () => {
                        this.setState({ currentIndex: currentIndex + 1 })
                        position.setValue({ x: 0, y: 0 })
                    }

                Animated.timing( position, config ).start( cb )
            } else {
                this.setState({ scrollAvaliable: true })
                Animated.parallel([
                    Animated.spring( position, { toValue: ({ x: 0, y: 0 }) }),
                    Animated.spring( swipedCardPosition, { toValue: ({ x: 0, y: -WINDOW_HEIGHT  }) })
                ]).start()

            }
        }
    })

    renderMainPart = ({ uri, title, text }, padding, pageNumber) => (
        <ViewContainer { ...{ padding } }>
            <ImageContainer>
                <PageNumber style={{ transform: [{ rotate: "30deg" }] }}>#{ pageNumber }</PageNumber>
                <ImageComp source={{ uri }} />
            </ImageContainer>
            <TextContainer>
                <TitleText>{ title || "" }</TitleText>
                <DescriptText>{ text }</DescriptText>
            </TextContainer>
        </ViewContainer>
    )

    renderArticles = legend => legend.map( ( item, index ) => {
        const { currentIndex, swipedCardPosition, position } = this.state,
              { padding } = this.props,
              mainPart = this.renderMainPart( item, padding, index+1 );

        if ( index === currentIndex - 1 ) return (
            <AnimatedView key={index} style={{top: swipedCardPosition.getLayout().top}} {...this.PanResponder.panHandlers} >
                { mainPart }
            </AnimatedView>
        )

        if ( index < currentIndex)  return null

        if ( index === currentIndex ) return (
            <AnimatedView key={index} style={{top: position.getLayout().top}} {...this.PanResponder.panHandlers} >
                { mainPart }
            </AnimatedView>
        )

        return <AnimatedView key={index}>{ mainPart }</AnimatedView>

    }).reverse()

    render() {
        const { data } = this.props

        return (
            <DeckContainer>
                { this.renderArticles( data ) }
            </DeckContainer>
        )
    }
}



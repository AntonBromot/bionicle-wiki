import React, { useState, useRef, useMemo, memo } from "react"
import { Animated, PanResponder } from "react-native"

import { DeckContainer, ImageComp, ViewContainer, AnimatedView, ImageContainer, TextContainer, DescriptText, TitleText, PageNumber } from "./styles"
import { WINDOW_HEIGHT } from "../../../constants/metcrics"

const MainPart = memo(({ item: { uri, title, text }, padding, pageNumber} ) => (
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
))

const renderArticles = ({ legend, currentIndex, swipedCardPosition, panResponder, padding, position }) => legend.map( ( item, index ) => {
    const mainPart = <MainPart { ...{ item, padding, pageNumber: index+1 } } />

    if ( index === currentIndex - 1 ) return (
        <AnimatedView key={index} style={{top: swipedCardPosition.getLayout().top}} {...panResponder.panHandlers} >
            { mainPart }
        </AnimatedView>
    )

    if ( index < currentIndex) return null

    if ( index === currentIndex ) return (
        <AnimatedView key={index} style={{top: position.getLayout().top}} {...panResponder.panHandlers} >
            { mainPart }
        </AnimatedView>
    )

    return <AnimatedView key={index}>{ mainPart }</AnimatedView>
})

const DeckSwiper = ({ data, padding }) => {
    const [ currentIndex, setCurrentIndex ] = useState(0),
          position = useRef( new Animated.ValueXY() ).current,
          swipedCardPosition = useRef( new Animated.ValueXY({x: 0, y: -WINDOW_HEIGHT }) ).current

    const panResponder = useMemo(() => PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {
            if ( gestureState.dy > 0 && ( currentIndex > 0 ) ) swipedCardPosition.setValue({ x:0, y: -WINDOW_HEIGHT + gestureState.dy })
            else position.setValue({ y: gestureState.dy })
        },
        onPanResponderRelease: (evt, gestureState) => {
            const notLastItem = data.length-1 !== currentIndex

            if ( currentIndex > 0 && gestureState.dy > 50 && gestureState.vy > 0.7  ) {
                const config = { toValue: ({ x: 0, y: 0 }), duration: 400 },
                    cb = () => {
                        setCurrentIndex( prevIndex => prevIndex - 1 )
                        swipedCardPosition.setValue({ x: 0, y: -WINDOW_HEIGHT })
                    }

                Animated.timing( swipedCardPosition, config ).start( cb )
            } else if ( notLastItem && -gestureState.dy > 50 && -gestureState.vy > 0.7 ) {
                const config = { toValue: ({ x: 0, y: -WINDOW_HEIGHT }), duration: 400 },
                    cb = () => {
                        setCurrentIndex( prevIndex => prevIndex + 1 )
                        position.setValue({ x: 0, y: 0 })
                    }

                Animated.timing( position, config ).start( cb )
            } else {
                Animated.parallel([
                    Animated.spring( position, { toValue: ({ x: 0, y: 0 }) }),
                    Animated.spring( swipedCardPosition, { toValue: ({ x: 0, y: -WINDOW_HEIGHT  }) })
                ]).start()

            }
        }
    }), [currentIndex])

    return (
            <DeckContainer>
                { renderArticles({ legend: data, currentIndex, swipedCardPosition, panResponder, padding, position } ).reverse() }
            </DeckContainer>
    )
}

export default DeckSwiper


import * as React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';

import FadeInWrapper from '../FadeInWrapper';
import { AnimatedImage, AnimatedLegendText, AnimatedLegendTextContainer, LegendLinkContainer, LegendText } from './styles';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 50;

const ASSETS = {
    titleText: "Become the legend now!"
}

const LegendLink = ({ scrollYAnimatedValue, legend: { id, legendImg, legendTitle }, goToLegend }) => {
    const headerHeight = scrollYAnimatedValue.interpolate( {
            inputRange: [0, 80],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp',
            useNativeDriver: true
        }),
        imageOpacity = scrollYAnimatedValue.interpolate({
            inputRange: [0, 40, 80],
            outputRange: [1, 0.5, 0.3],
            extrapolate: 'clamp',
            useNativeDriver: true
        }),
        textContainerPositionTop = scrollYAnimatedValue.interpolate({
            inputRange: [0, 40, 80],
            outputRange: [0, 3, 6],
            extrapolate: 'clamp',
            useNativeDriver: true
        }),
        textTranslatePosition = scrollYAnimatedValue.interpolate({
            inputRange: [0, 80],
            outputRange: [0, 300],
            extrapolate: 'clamp',
            useNativeDriver: true
        }),
        textTranslateOpacity = scrollYAnimatedValue.interpolate({
            inputRange: [0, 60],
            outputRange: [1, 0],
            extrapolate: 'clamp',
            useNativeDriver: true
        })

    return (
        <LegendLinkContainer>
            <TouchableOpacity onPress={ () => goToLegend( id, legendTitle ) }>
                <FadeInWrapper>
                    <AnimatedImage style={{ height: headerHeight, opacity: imageOpacity } } source={{ uri: legendImg }} />
                </FadeInWrapper>
                <AnimatedLegendTextContainer style={{ top: textContainerPositionTop }}>
                    <LegendText>{ legendTitle }</LegendText>
                    <AnimatedLegendText style={{ opacity: textTranslateOpacity, transform:[{ translateX: textTranslatePosition }] }}>
                        { ASSETS.titleText}
                    </AnimatedLegendText>
                </AnimatedLegendTextContainer>
            </TouchableOpacity>
        </LegendLinkContainer>
    )
}

LegendLink.propTypes = {
    scrollYAnimatedValue: PropTypes.object,
    legend: PropTypes.object,
    goToLegend: PropTypes.func,
}

export default LegendLink

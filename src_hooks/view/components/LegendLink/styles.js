import styled from 'styled-components';
import {Animated} from 'react-native';
import { CachedImage } from '../../../overridedLibraries/react-native-cached-image';

import {BLACK_COLOR, WHITE_COLOR, YELLOW_COLOR} from '../../../constants/colors';
import {LARGE_TEXT_SIZE, TITLE_TEXT_SIZE} from '../../../constants/metcrics';

const AnimatedCachedImage = Animated.createAnimatedComponent(CachedImage);

export const LegendLinkContainer = styled(Animated.View)`
    background-color: ${ BLACK_COLOR };
`

export const AnimatedImage = styled(AnimatedCachedImage)`
    resize-mode: cover;
`

export const AnimatedLegendTextContainer = styled(Animated.View)`
    position: absolute;
    left: 15px;
`

export const LegendText = styled.Text`
    font-size: ${ LARGE_TEXT_SIZE };
    color: ${ WHITE_COLOR };
    font-weight: bold;
`

export const AnimatedLegendText = styled(Animated.Text)`
    font-size: ${ TITLE_TEXT_SIZE };
    color: ${ YELLOW_COLOR };
    font-weight: bold;
`

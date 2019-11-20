import styled from 'styled-components';
import { Animated } from "react-native"
import { CachedImage } from '../../../overridedLibraries/react-native-cached-image';

import { BLACK_COLOR, WHITE_COLOR, YELLOW_COLOR } from "../../../constants/colors"
import { WINDOW_HEIGHT, WINDOW_WIDTH, SIMPLE_TEXT_SIZE, TITLE_TEXT_SIZE, GIANT_TEXT_SIZE } from "../../../constants/metcrics"

export const DeckContainer = styled.View`
    flex: 1;
`

export const ViewContainer = styled.View`
    position: absolute;
    width: ${ props => props?.padding ?  WINDOW_WIDTH - props.padding * 2  : WINDOW_WIDTH };
    height: ${ props => props?.padding ?  WINDOW_HEIGHT - props.padding * 6  : WINDOW_HEIGHT };
    background-color: ${WHITE_COLOR};
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid ${YELLOW_COLOR};
    margin: 0;
    padding: 0;
`

export const ImageContainer = styled.View`
    flex: 2;
    background-color: ${BLACK_COLOR};
`

export const PageNumber = styled.Text`
   position: absolute;
   top: 10px;
   right: 10px;
   font-size: ${GIANT_TEXT_SIZE};
   font-weight: bold;
   color: ${YELLOW_COLOR};
   z-index: 100;
`

export const TextContainer = styled.View`
    flex: 3;
    padding: 5px;
`

export const ImageComp = styled(CachedImage)`
    width: 100%;
    height: 100%;
    resize-mode: cover;
`

export const DescriptText = styled.Text`
    font-size: ${SIMPLE_TEXT_SIZE};
`

export const TitleText = styled.Text`
    font-size: ${TITLE_TEXT_SIZE};
    color: ${YELLOW_COLOR};
`

export const AnimatedView = styled(Animated.View)``

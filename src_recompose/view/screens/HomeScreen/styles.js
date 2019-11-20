import styled from 'styled-components';
import { StyleSheet, Dimensions } from "react-native"

import { WINDOW_HEIGHT, WINDOW_WIDTH, HOME_TEXT_SIZE } from '../../../constants/metcrics';
import { YELLOW_COLOR, WHITE_COLOR, BLACK_COLOR } from '../../../constants/colors';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`

export const  MainText = styled.Text`
    font-size: ${ HOME_TEXT_SIZE };
    color: ${ WHITE_COLOR };
    font-weight: bold;
    letter-spacing: 2px;
    text-transform: uppercase;
    width: ${ WINDOW_WIDTH / 1.4 }; 
`

export const YellowText = styled(MainText)`
    color: ${ YELLOW_COLOR };
`

export const videoStyles = StyleSheet.create({
    backgroundVideo: {
        backgroundColor: BLACK_COLOR ,
        height: WINDOW_HEIGHT,
        position: "absolute",
        top: 0,
        left: 0,
        alignItems: "stretch",
        bottom: 0,
        right: 0
    }
});

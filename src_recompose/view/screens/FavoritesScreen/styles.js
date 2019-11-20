import styled from 'styled-components';
import { Animated } from "react-native"
import { WHITE_COLOR, YELLOW_COLOR } from "../../../constants/colors"
import { LARGE_TEXT_SIZE, BUTTON_TEXT_SIZE } from '../../../constants/metcrics';

export const Container = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 10px 0 10px;
    width: 100%;
    height: 100%;
`

export const AnimatedHeaderContainer = styled(Animated.View)`
    position: absolute;
    left: 0;
    right: 0;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, .8);
`

export const ImageBackground = styled.ImageBackground`
    flex: 1;
    width: 100%;
    height: 100%;
`

export const ItemsContainer = styled.View`
    padding-bottom: 30px;
`

export const YearContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    margin: 20px 0 0 0;
`

export const YearText = styled.Text`
    font-size: ${ LARGE_TEXT_SIZE };
    font-weight: bold;
    color: ${ YELLOW_COLOR };
    width: 120px;
    height: 50px;
    padding: 0 0 0 15px;
`

export const YearContainerWithText = styled.View`
    align-items: flex-start;
    justify-content: center;
    padding: 0 20px 0 20px;
    width: 65%;
    height: 100%;
    background-color: ${ YELLOW_COLOR };
`

export const YearTextInContainer = styled.Text`
    font-size: ${ LARGE_TEXT_SIZE };
    color: ${ WHITE_COLOR };
    font-weight: bold;
`

export const TypeContainer = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    margin: 0 0 15px 0;
`

export const TypeText = styled.Text`
    font-size: ${ BUTTON_TEXT_SIZE };
    font-weight: bold;
    color: ${ WHITE_COLOR };
    width: 25%;
    padding: 0 0 0 15px;
`

export const TypeContainerWithText = styled.View`
    align-items: flex-end;
    justify-content: center;
    padding: 0 20px 0 20px;
    width: 75%;
    height: 100%;
    background-color: ${ WHITE_COLOR };
`

export const TypeTextInContainer = styled.Text`
    font-size: ${ BUTTON_TEXT_SIZE };
    color: ${ YELLOW_COLOR };
    font-weight: bold;
`

export const TextForEmpty = styled.Text`
    margin-top: 30px;
    font-size: ${ LARGE_TEXT_SIZE };
    color: ${ WHITE_COLOR };
    font-weight: bold;
     text-align: center;
`

export const TextLink = styled.Text`
    font-size: ${ LARGE_TEXT_SIZE };
    color: ${ YELLOW_COLOR };
    font-weight: bold;
`







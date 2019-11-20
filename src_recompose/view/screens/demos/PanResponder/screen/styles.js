import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';

import { WHITE_COLOR, YELLOW_COLOR, HEADER_COLOR,  } from "../../../../../constants/colors"
import {TITLE_TEXT_SIZE, LARGE_TEXT_SIZE, BUTTON_TEXT_SIZE} from '../../../../../constants/metcrics';

export const IconBacked = styled(Icon)`
    font-size: 40px;
    color: ${HEADER_COLOR};
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
    flex: 1;
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
    width: 35%;
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







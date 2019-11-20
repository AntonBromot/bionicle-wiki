import styled from 'styled-components';

import { YELLOW_COLOR, WHITE_COLOR } from "../../../constants/colors"
import { LARGE_TEXT_SIZE, HOME_TEXT_SIZE } from "../../../constants/metcrics"

export const CardContainer = styled.View`
    width: 100%;
    border-radius: 14px;
    margin-bottom: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
    height: 200px;
    overflow: hidden; 
`

export const ImageBackground = styled.ImageBackground`
    width: 100%;
    height: 100%;
     padding: 50px 20px;
`

export const Title = styled.Text`
	color: ${ WHITE_COLOR };
	font-size: ${ LARGE_TEXT_SIZE };
	font-weight: bold;
`

export const SubTitle = styled.Text`
	color: ${ YELLOW_COLOR };
	font-size: ${ HOME_TEXT_SIZE };
	font-weight: bold;
`

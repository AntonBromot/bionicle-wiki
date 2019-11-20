import styled from 'styled-components';
import { CachedImage } from '../../../overridedLibraries/react-native-cached-image';

import { DEEP_GRAY_COLOR, LIGHT_GRAY_COLOR} from "../../../constants/colors"

export const CardContainer = styled.View`
   width: 100%;
   background: #F7F7F7;
   border-radius: 14px;
   margin-bottom: 20px;
   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
`

export const Cover = styled.View`
	width: 100%;
	height: 180px;
	border-top-left-radius: 14px;
	border-top-right-radius: 14px;
	overflow: hidden;
`

export const CardImage = styled(CachedImage)`
	width: 100%;
	height: 100%;
`

export const Content = styled.View`
    padding-top: 5px;
	flex-direction: column;
	align-items: center;
	height: 60px;
	
`

export const Title = styled.Text`
	color: ${ DEEP_GRAY_COLOR };
	font-size: 20px;
	font-weight: 600;
`

export const Year = styled.Text`
	color: ${ LIGHT_GRAY_COLOR };
	font-size: 15px;
	font-weight: 600;
	margin-top: 4px;
`

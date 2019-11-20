import styled from "styled-components"
import { Platform } from 'react-native'

import { SIMPLE_TEXT_SIZE } from '../../../constants/metcrics';
import { WHITE_COLOR, BLACK_COLOR } from '../../../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

export const SearchBarContainer = styled.View`
    padding: 0 15px;
    align-items: center;
    justify-content: center;
    height: 52px;
    background-color: ${ BLACK_COLOR }
`

export const SearchInputWrapper = styled.View`
   flex-direction: row;
   align-items: center;
   height: 36px;
   
   width: 100%;
   border-radius: 20px;
   background-color: rgba(255, 255, 255, 0.2)
`

export const SearchIcon = styled(Icon)`
  font-size: 20px;
  padding: 5px 10px;
  color: ${ WHITE_COLOR }; 
`

export const SearchInput = styled.TextInput`
   width: 100%;
   height: 100%;
   color: ${ WHITE_COLOR };
   font-size: ${ SIMPLE_TEXT_SIZE };
   ${ Platform.OS === 'android' && 
      "position: relative;" +
      " top: 2px;"
   }
`

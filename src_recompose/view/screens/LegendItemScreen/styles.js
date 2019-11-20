import styled from 'styled-components';

export const Container = styled.View`
    flex: 1;
    padding: ${ props => props?.padding || 0 }px ;
`

export const ImageBackground = styled.ImageBackground`
    width: 100%;
    height: 100%;
`

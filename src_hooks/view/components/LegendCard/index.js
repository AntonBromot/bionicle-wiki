import React from 'react'

import { CardContainer, SubTitle, ImageBackground, Title } from './styles'
import PropTypes from 'prop-types';

const ASSETS = {
    titleText: "Legend Of"
}

const LegendCard = ({ legendImg, legendTitle }) => (
    <CardContainer >
        <ImageBackground source={ { uri: legendImg } }>
            <Title>{ ASSETS.titleText }</Title>
            <SubTitle>{ legendTitle }</SubTitle>
        </ImageBackground>
    </CardContainer>
)

LegendCard.propTypes = {
    legendImg: PropTypes.string,
    legendTitle: PropTypes.string,
}

export default LegendCard

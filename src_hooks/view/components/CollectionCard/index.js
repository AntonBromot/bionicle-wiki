import React from 'react'
import PropTypes from 'prop-types';

import { CardContainer, CardImage, Cover, Content, Title, Year } from './styles'

const CollectionCard = ({ src, title, year }) => (
    <CardContainer >
        <Cover>
            <CardImage source={ { uri: src} } />
        </Cover>
        <Content>
            <Title>{ title }</Title>
            <Year>{ year }</Year>
        </Content>
    </CardContainer>
)

CollectionCard.propTypes = {
    src: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.string
}

export default CollectionCard

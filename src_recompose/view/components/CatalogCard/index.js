import React from 'react'
import PropTypes from 'prop-types';

import { CardContainer, CardImage, Cover, Content, Title, Year } from './styles'
import FavoriteIcon from "../../components/FavoriteIcon"

const CatalogCard = ({ mainImage, hierarchy, name, id, showFavoriteIcon }) => (
     <CardContainer >
          <Cover>
               <CardImage source={ { uri: mainImage} } />
               { showFavoriteIcon &&  <FavoriteIcon { ...{ id } } /> }
          </Cover>
          <Content>
               <Title>{ name }</Title>
               <Year>{ hierarchy }</Year>
          </Content>
     </CardContainer>
)

CatalogCard.defaultProps = {
    showFavoriteIcon: false
}

CatalogCard.propTypes = {
    mainImage: PropTypes.string,
    hierarchy: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.number,
    showFavoriteIcon: PropTypes.bool,
}

export default CatalogCard

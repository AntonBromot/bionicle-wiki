import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import { FavoriteIcon } from './styles'
import { setFavorite, removeFavorite } from '../../../store/actions/favoritesActions';

const FavoriteIconComponent = ({ id, favorites: { favoritesIds }, setFavorite, removeFavorite }) => {
    const isFavorite = favoritesIds.includes( id ),
          iconProps = {
              name: isFavorite ? "heart" : "heart-o",
              onPress: () => isFavorite ? removeFavorite( id ) : setFavorite( id )
          }

    return <FavoriteIcon { ...iconProps } />
}

const mapStateToProps = ({ favorites }) => ({ favorites })

const mapDispatchToProps = dispatch => ({
    setFavorite: ( id, callback ) => dispatch( setFavorite( id, callback ) ),
    removeFavorite: ( id, callback ) =>  dispatch( removeFavorite( id, callback ) )
})

FavoriteIconComponent.propTypes = {
    id: PropTypes.number,
    favorites: PropTypes.object,
    setFavorite: PropTypes.func,
    removeFavorite: PropTypes.func,
}

export default connect( mapStateToProps, mapDispatchToProps )(FavoriteIconComponent)

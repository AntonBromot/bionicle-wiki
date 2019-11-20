import React, { useCallback, useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import { ScrollView, TouchableOpacity, RefreshControl } from 'react-native';

import CollectionCard from '../../components/CollectionCard';
import { getCollectionsByYears } from '../../../store/actions/collectionsActions'
import IMAGES from '../../../resources/images'
import FadeInWrapper from "../../components/FadeInWrapper"
import { Container, ImageBackground } from './styles'
import PropTypes from 'prop-types';

const RenderCards = ({ cards, handler }) => cards.map( ( item, index ) => {
        const duration = 600,
              delay = index * 1000;

        return (
            <FadeInWrapper { ...{ duration, delay }} key={ index }>
                <TouchableOpacity onPress={ () => handler( item.year, item.legendId ) } >
                    <CollectionCard { ...item } />
                </TouchableOpacity>
            </FadeInWrapper>
        )
})

const CollectionsScreen = ({ collections: { collectionsByYear, fetching }, getCollectionsByYears, navigation  }) => {
    const goToCollection = useCallback(  ( year, legendId ) => { navigation.navigate("Collect", { year, legendId }) }, [] ),
          memoComponents = useMemo( () => <RenderCards { ...{ cards: collectionsByYear, handler: goToCollection }} /> , [collectionsByYear])

    useEffect(()=> { getCollectionsByYears( f=>f ) }, [])

    return (
        <ImageBackground source={ IMAGES.collectionsBackground } >
            <ScrollView contentContainerStyle={{ paddingVertical: 30 }} refreshControl={
                <RefreshControl refreshing={ fetching } onRefresh={ () => getCollectionsByYears( f=>f ) } />
            }>
                <Container >
                   { memoComponents }
                </Container>
            </ScrollView>
        </ImageBackground>
    )
}

const mapStateToProps = ({ collections }) => ({ collections })

const mapDispatchToProps = dispatch => ({
    getCollectionsByYears: ( callback ) => dispatch( getCollectionsByYears( callback ) )
})

CollectionsScreen.propTypes = {
    collections: PropTypes.object,
    getCollectionsByYears: PropTypes.func,
    goToCollection: PropTypes.func,
}

export default connect( mapStateToProps, mapDispatchToProps )( CollectionsScreen )

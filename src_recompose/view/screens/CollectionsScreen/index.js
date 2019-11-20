import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import {compose, lifecycle, withHandlers } from 'recompose';

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


const CollectionsScreen = ({ collections: { collectionsByYear, fetching }, getCollectionsByYears, goToCollection }) => (
        <ImageBackground source={ IMAGES.collectionsBackground } >
            <ScrollView contentContainerStyle={{ paddingVertical: 30 }} refreshControl={
                <RefreshControl refreshing={ fetching } onRefresh={ () => getCollectionsByYears( f=>f ) } />
            }>
                <Container >
                    <RenderCards { ...{ cards: collectionsByYear, handler: goToCollection }} />
                </Container>
            </ScrollView>
        </ImageBackground>

)

const mapStateToProps = ({ collections }) => ({ collections })

const mapDispatchToProps = dispatch => ({
    getCollectionsByYears: ( callback ) => dispatch( getCollectionsByYears( callback ) )
})

const enhange = compose(
    connect( mapStateToProps, mapDispatchToProps ),
    lifecycle({
        componentDidMount() {
            const { getCollectionsByYears } = this.props
            getCollectionsByYears( f=>f )
        }
    }),
    withHandlers({
        goToCollection: ({ navigation }) => ( year, legendId ) => navigation.navigate("Collect", { year, legendId })
    }),
)

CollectionsScreen.propTypes = {
    collections: PropTypes.object,
    getCollectionsByYears: PropTypes.func,
    goToCollection: PropTypes.func,
}

export default enhange( CollectionsScreen )

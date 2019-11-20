import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import {compose, lifecycle, withHandlers } from 'recompose';
import PropTypes from 'prop-types';

import LegendCard from '../../components/LegendCard';
import { getLegends } from '../../../store/actions/legendsAction'
import IMAGES from '../../../resources/images'
import FadeInWrapper from "../../components/FadeInWrapper"
import { Container, ImageBackground } from './styles'

const RenderCards = ({ cards, handler }) => cards.map( ( item, index ) => {
    const duration = 600,
        delay = index * 1000;

    return (
        <FadeInWrapper { ...{ duration, delay }} key={ index }>
            <TouchableOpacity onPress={ () => handler( item.id, item.legendTitle ) } >
                <LegendCard { ...item } />
            </TouchableOpacity>
        </FadeInWrapper>
    )
})

const LegendsScreen = ({ legends: { legends, fetching }, getLegends, goToLegend }) => (
    <ImageBackground source={ IMAGES.anotherBackground } >
        <ScrollView contentContainerStyle={{ paddingVertical: 30 }} refreshControl={
            <RefreshControl refreshing={ fetching } onRefresh={ () => getLegends( f=>f ) } />
        }>
            <Container >
                <RenderCards { ...{ cards: legends, handler: goToLegend }} />
            </Container>
        </ScrollView>
    </ImageBackground>
)

const mapStateToProps = ({ legends }) => ({ legends })

const mapDispatchToProps = dispatch => ({
    getLegends: ( callback ) => dispatch( getLegends( callback ) )
})

const enhange = compose(
    connect( mapStateToProps, mapDispatchToProps ),
    lifecycle({
        componentDidMount() {
            const { getLegends } = this.props;
            getLegends( f=>f )
        }
    }),
    withHandlers({
        goToLegend: ({ navigation }) => ( legendId, legendTitle )=> navigation.navigate("LegendItem", { legendId, legendTitle })
    }),
)

LegendsScreen.propTypes = {
    legends: PropTypes.object,
    getLegends: PropTypes.func,
    goToLegend: PropTypes.func,
}

export default enhange( LegendsScreen )

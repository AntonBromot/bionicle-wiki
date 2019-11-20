import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {RefreshControl, ScrollView} from 'react-native';
import PropTypes from 'prop-types';

import DeckSwiper from '../../components/DeckSwiper';
import { getLegendById } from '../../../store/actions/legendsAction'
import IMAGES from '../../../resources/images'
import { Container, ImageBackground } from './styles'
import HintForPan from '../../components/HintForPan';

const EmptyScrollView = ({ fetching }) => <ScrollView contentContainerStyle={{ paddingVertical: 30 }} refreshControl={
    <RefreshControl refreshing={ fetching } />
}/>

const LegendItemScreen = ({ getLegendById, legends: { legends, fetching }, navigation: { state: { params } } }) => {
    const { legendId } = params,
          legend = legends.find( ({id}) => id === legendId ),
          padding = 20,
          hasNoData = fetching || !legend?.legendData

    useEffect( () => { getLegendById( legendId, f=>f ) }, [] )

    return (
        <ImageBackground source={ IMAGES.anotherBackground } >
            <Container { ...{ padding } }>
                { !hasNoData && <HintForPan /> }
                { hasNoData ? <EmptyScrollView fetching /> : <DeckSwiper { ...{ data: legend.legendData, padding } } /> }
            </Container>
        </ImageBackground>
    )
}

const mapStateToProps = ({ legends }) => ({ legends })

const mapDispatchToProps = dispatch => ({
    getLegendById: ( legendId, callback ) => dispatch( getLegendById( legendId, callback ) )
})

LegendItemScreen.navigationOptions = ({ navigation: { getParam } }) => ({
    title: `${ getParam("legendTitle")} Legend`
});

LegendItemScreen.propTypes = {
    legends: PropTypes.object,
    navigation: PropTypes.object,
    getLegendById: PropTypes.func,
}

export default connect( mapStateToProps, mapDispatchToProps )( LegendItemScreen )

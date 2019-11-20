import React from 'react'
import { connect } from 'react-redux'
import {compose, lifecycle, setStatic } from 'recompose';
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

const LegendItemScreen = ({ legends: { legends, fetching }, navigation: { state: { params } } }) => {
    const { legendId } = params,
          legend = legends.find( ({id}) => id === legendId ),
          padding = 20,
          hasNoData = fetching || !legend?.legendData

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

const enhange = compose(
    connect( mapStateToProps, mapDispatchToProps ),
    setStatic(
        "navigationOptions",
        ({ navigation: { state: { params } } }) => ({ title: `${ params.legendTitle} Legend` })
    ),
    lifecycle({
        componentDidMount() {
            const { getLegendById, navigation: { state: { params } } } = this.props;
            getLegendById( params.legendId, f=>f )
        }
    })
)

LegendItemScreen.propTypes = {
    legends: PropTypes.object,
    navigation: PropTypes.object,
}

export default enhange( LegendItemScreen )

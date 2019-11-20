import * as React from 'react';
import PropTypes from 'prop-types';
import { RefreshControl, TouchableOpacity } from 'react-native';

import { Container, ScrollView} from './styles';
import {compose, lifecycle } from 'recompose';
import {connect} from 'react-redux';
import {getCollectionByYear} from '../../../store/actions/collectActions';
import CatalogCard from '../CatalogCard';
import { withNavigation } from 'react-navigation';
import FadeInWrapper from '../FadeInWrapper';

const RenderCards = ({ data, handler}) => data.map( ( item, index ) =>
            <TouchableOpacity onPress={ handler } key={ index }>
                <CatalogCard { ...item } showFavoriteIcon />
            </TouchableOpacity>
)

const RenderCardsAnimated  = ({data, handler}) => data.map( ( item, index ) => {
    const duration = 600,
        delay = index * 600;

    return (
            <TouchableOpacity onPress={ handler } key={ index }>
                <FadeInWrapper { ...{ duration, delay }} >
                    <CatalogCard { ...item } showFavoriteIcon />
                </FadeInWrapper>
            </TouchableOpacity>

    )
})

const CollectionTabs = ({ collect: { collections, fetching }, onScroll, withAnimation, getCollectionByYear, type, navigation }) => {
    const { state: { params: { year } } } = navigation,
          renderData = collections[year]?.[type]?.data || [],
          CardsComponent = withAnimation ? RenderCardsAnimated : RenderCards

    return (
        <ScrollView onScroll={onScroll} refreshControl={
            <RefreshControl refreshing={ fetching }  onRefresh={ () => getCollectionByYear( year, type, f=>f ) } />
        }>
            <Container >
                 <CardsComponent { ...{ data: renderData } } />
            </Container>
        </ScrollView>

    )
}

const mapStateToProps = ({ collect }) => ({ collect })

const mapDispatchToProps = dispatch => ({
    getCollectionByYear: ( year, colType, callback ) => dispatch( getCollectionByYear(year, colType, callback) )
})

const enhange = compose(
    connect( mapStateToProps, mapDispatchToProps ),
    withNavigation,
    lifecycle({
        componentDidMount() {
            const { getCollectionByYear, type, navigation: { state: { params: { year } } } } = this.props
            getCollectionByYear( year, type, f=>f )
        },
        shouldComponentUpdate(nextProps) {
            const { collect: { collections, fetching }, type, navigation: { state: { params: { year } } } } = this.props,
                  prevUpdDate = collections[year]?.[type]?.updatedDate,
                  nextUpdDate = nextProps.collect.collections[year]?.[type]?.updatedDate;

            return ( prevUpdDate !== nextUpdDate ) || ( fetching !== nextProps.collect.fetching )
        }
    })
)

CollectionTabs.propTypes = {
    collect: PropTypes.object,
    onScroll: PropTypes.func,
    withAnimation: PropTypes.bool,
    getCollectionByYear: PropTypes.func,
    type: PropTypes.string,
    navigation: PropTypes.object
}

export default enhange( CollectionTabs )



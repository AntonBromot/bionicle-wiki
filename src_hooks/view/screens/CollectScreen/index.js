import React, { useState, memo, useRef, useCallback, useEffect } from 'react';
import {Animated, RefreshControl, View} from 'react-native';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { TabView,  TabBar } from 'react-native-tab-view';

import { ImageBackground, ScrollView } from "./styles"
import IMAGES from "../../../resources/images"
import { WINDOW_WIDTH, SIMPLE_TEXT_SIZE } from "../../../constants/metcrics"
import {YELLOW_COLOR, WHITE_COLOR} from '../../../constants/colors';
import { BIONICLE_TYPES } from "../../../constants/helpers"
import { getLegends } from '../../../store/actions/legendsAction'
import CollectionTab from '../../components/CollectionTab'
import LegendLink from '../../components/LegendLink'

const ROUTES = [
    { key: 'first', title: BIONICLE_TYPES["Toa"].name },
    { key: 'second', title: BIONICLE_TYPES["Enemy"].name },
    { key: 'fourth', title: BIONICLE_TYPES["Titan"].name },
    { key: 'third', title: BIONICLE_TYPES["Other"].name },
]

const LazyPlaceholder = () => (
    <ScrollView refreshControl={ <RefreshControl refreshing={ true } /> }/>
)

const renderTabBar = props => {
    const tabBarProps = {
        labelStyle: { fontSize: parseInt(SIMPLE_TEXT_SIZE) },
        indicatorStyle: { backgroundColor: YELLOW_COLOR },
        style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
        inactiveColor: WHITE_COLOR,
        activeColor: YELLOW_COLOR,
        ...props
    }

    return <TabBar { ...tabBarProps }/>
}

const renderScene = ({ route, jumpTo, scrollYAnimatedValue }) => {
    const onScroll = Animated.event( [{ nativeEvent: { contentOffset: { y: scrollYAnimatedValue } } }] )
    const tabs = {
        'first':   <CollectionTab type={ BIONICLE_TYPES["Toa"].type } jumpTo={jumpTo} onScroll={onScroll} withAnimation />,
        'second':  <CollectionTab type={ BIONICLE_TYPES["Enemy"].type } jumpTo={jumpTo} onScroll={f=>f} />,
        'fourth':  <CollectionTab type={ BIONICLE_TYPES["Titan"].type } jumpTo={jumpTo} onScroll={f=>f} />,
        'third':  <CollectionTab  type={ BIONICLE_TYPES["Other"].type } jumpTo={jumpTo} onScroll={f=>f} />
    }

    return tabs[route.key]
}

const CollectScreen = ({ navigation, legends, getLegends }) => {
    const [ index, setIndex ] = useState(0),
          [ routes ] = useState(ROUTES),
          scrollYAnimatedValue = useRef( new Animated.Value(0) ).current;

    const renderLazyPlaceholder = useCallback( ({ route }) => <LazyPlaceholder route={route} />, [] ),
          renderSceneMemo = useCallback( routeData => renderScene({ ...routeData, scrollYAnimatedValue }), [] ),
          goToLegend = useCallback( (legendId, legendTitle) => navigation.navigate("LegendItem", { legendId, legendTitle }), [] );

    const { state: { params: { year, legendId } } } = navigation,
        legend = legends.find( item => item.id === legendId ),
        tabViewProps = {
            navigationState: { index, routes, year },
            renderScene: renderSceneMemo,
            lazy: true,
            renderLazyPlaceholder,
            onIndexChange: setIndex,
            initialLayout:{ width: WINDOW_WIDTH },
            indicatorStyle: { backgroundColor: 'white' },
            renderTabBar,
        }

    useEffect( () => { getLegends(f=>f ) }, [])

    return (
        <ImageBackground source={ IMAGES.collectionsBackground } >
            { legend && <LegendLink { ...{ scrollYAnimatedValue, legend, goToLegend } } /> }
            <View style={ { flex:1 }}>
                <TabView { ...tabViewProps } />
            </View>
        </ImageBackground>
    )
}

const mapStateToProps = ({ collect, legends: { legends } }) => ({ collect, legends })

const mapDispatchToProps = dispatch => ({
    getLegends: callback => dispatch( getLegends(callback) )
})

CollectScreen.navigationOptions = ({ navigation: { getParam } }) => ({
        title: `${ getParam("year")} Collection`
})

CollectScreen.propTypes = {
    navigation: PropTypes.object,
    legends: PropTypes.array,
    getLegends: PropTypes.func
}

export default connect( mapStateToProps, mapDispatchToProps )( CollectScreen )

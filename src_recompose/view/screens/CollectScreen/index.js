import * as React from 'react';
import {Animated, RefreshControl, View} from 'react-native';
import { connect } from 'react-redux'
import { TabView,  TabBar } from 'react-native-tab-view';
import {compose, withHandlers, withStateHandlers, setStatic, lifecycle} from 'recompose';

import { ImageBackground, ScrollView } from "./styles"
import IMAGES from "../../../resources/images"
import { WINDOW_WIDTH, SIMPLE_TEXT_SIZE } from "../../../constants/metcrics"
import {YELLOW_COLOR, WHITE_COLOR} from '../../../constants/colors';
import { BIONICLE_TYPES } from "../../../constants/helpers"
import { getLegends } from '../../../store/actions/legendsAction'
import CollectionTab from '../../components/CollectionTab'
import LegendLink from '../../components/LegendLink'
import PropTypes from 'prop-types';

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

const CollectScreen = ({ onIndexChange, renderScene, scrollYAnimatedValue, index, routes, goToLegend, renderLazyPlaceholder, navigation, legends  }) => {
    const { state: { params: { year, legendId } } } = navigation,
          legend = legends.find( item => item.id === legendId ),
          tabViewProps = {
              navigationState: { index, routes, year },
              renderScene,
              lazy: true,
              renderLazyPlaceholder,
              onIndexChange,
              initialLayout:{ width: WINDOW_WIDTH },
              indicatorStyle: { backgroundColor: 'white' },
              renderTabBar,
          }

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

const enhange = compose(
    connect( mapStateToProps, mapDispatchToProps ),
    setStatic(
        "navigationOptions",
        ({ navigation: { state: { params } } }) => ({ title: `${ params.year } Collection` })
    ),
    lifecycle({
        componentDidMount() {
            const { getLegends } = this.props
            getLegends(f=>f )
        }
    }),
    withStateHandlers(
        { index: 0, routes: ROUTES, scrollYAnimatedValue: new Animated.Value(0) },
        { onIndexChange: ({ index }) => newIndex => ({ index: newIndex }) }
    ),
    withHandlers({
        renderLazyPlaceholder: props => ({ route }) => <LazyPlaceholder route={route} />,
        renderScene: ({scrollYAnimatedValue}) => routeData => renderScene({ ...routeData, scrollYAnimatedValue }),
        goToLegend: ({navigation}) => (legendId, legendTitle) => navigation.navigate("LegendItem", { legendId, legendTitle })
    }),
)

CollectScreen.propTypes = {
    onIndexChange: PropTypes.func,
    renderScene: PropTypes.func,
    scrollYAnimatedValue: PropTypes.object,
    index: PropTypes.number,
    routes: PropTypes.array,
    renderLazyPlaceholder: PropTypes.func,
    navigation: PropTypes.object,
    legends: PropTypes.array,
}

export default enhange( CollectScreen )

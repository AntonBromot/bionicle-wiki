import React from "react"
import { createStackNavigator } from 'react-navigation-stack';

import { NAVIGATION_DEFAULT_CONFIG } from '../../config/navigationDefaultConfig'
import LegendsScreen from '../../view/screens/LegendsScreen';
import {HeaderIcon} from '../../view/components/Header';

const LegendsRoutes = {
    Legends: {
        screen: LegendsScreen,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <HeaderIcon  { ...{ name: "align-left", onPress: navigation.toggleDrawer, side: "left" } } />,
            title: navigation.state.routeName
        })
    }
}

const LegendsNavigation = createStackNavigator( LegendsRoutes, NAVIGATION_DEFAULT_CONFIG );

export default LegendsNavigation;

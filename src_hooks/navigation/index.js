import React from "react"
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from "../view/screens/HomeScreen"
import Drawer from "./drawer"
import Collect from "../view/screens/CollectScreen"
import LegendItem from "../view/screens/LegendItemScreen"
import { NAVIGATION_DEFAULT_CONFIG } from '../config/navigationDefaultConfig'

const AppNavigator = createStackNavigator({
    HomeScreen: { screen: HomeScreen, navigationOptions: { header: null } },
    Drawer: { screen: Drawer, navigationOptions: { header: null } },
    Collect: { screen: Collect },
    LegendItem: { screen: LegendItem }
    }, NAVIGATION_DEFAULT_CONFIG
);

export default createAppContainer(AppNavigator);

import React from "react"
import { createStackNavigator } from 'react-navigation-stack';

import { NAVIGATION_DEFAULT_CONFIG } from '../../config/navigationDefaultConfig'
import CollectionsScreen from '../../view/screens/CollectionsScreen';
import { HeaderIcon } from "../../view/components/Header"


const CollectionsRoutes = {
    Collections:  {
        screen: CollectionsScreen,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <HeaderIcon  { ...{ name: "align-left", onPress: navigation.toggleDrawer, side: "left" } } />,
            title: navigation.state.routeName
        })
    },
}

const CollectionsNavigation = createStackNavigator( CollectionsRoutes, NAVIGATION_DEFAULT_CONFIG );

export default CollectionsNavigation;

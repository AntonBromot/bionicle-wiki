import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';

import CollectionsNavigation from "./CollectionsNavigation"
import FavoritesNavigation from "./FavoritesNavigation"
import LegendsNavigation from "./LegendsNavigation"
import { DRAWER_CONFIG } from '../../config/navigationDefaultConfig'


const DrawerRoutes = {
    Collections: CollectionsNavigation,
    Favorites:  FavoritesNavigation,
    Legends:  LegendsNavigation,
};

const Drawer = createDrawerNavigator( DrawerRoutes, DRAWER_CONFIG );


export default Drawer;

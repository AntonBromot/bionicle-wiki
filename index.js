/**
 * @format
 */

import {AppRegistry} from 'react-native';
import AppRecompose from './src_recompose/view/App';
import AppHooks from "./src_hooks/view/App"
import {name as appName} from './app.json';

const USE_HOOKS = true

AppRegistry.registerComponent( appName, () => USE_HOOKS ? AppHooks : AppRecompose );

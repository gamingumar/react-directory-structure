/*
 * File: index.js
 * Project: GU RN Starter Kit
 * File Created: Friday, 10th January 2020 7:15:58 pm
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Monday, 13th January 2020 11:51:53 pm
 * -----
 * Copyright 2020 - 2020 WhileGeek, https://umar.tech
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/Screens/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
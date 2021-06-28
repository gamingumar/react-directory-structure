/*
 * File: index.js
 * Project: GU RN Starter Kit
 * File Created: Friday, 10th January 2020 7:15:58 pm
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Monday, 28th June 2021 9:02:10 pm
 * -----
 * Copyright 2019 - 2021 WhileGeek, https://umar.tech
 */

import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

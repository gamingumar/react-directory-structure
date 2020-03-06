/*
 * File: index.tsx
 * Project: GU RN Starter Kit
 * File Created: Thursday, 27th February 2020 1:52:40 am
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Saturday, 7th March 2020 12:13:08 am
 * -----
 * Copyright 2019 - 2020 WhileGeek, https://umar.tech
 */

import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { Transition } from 'react-native-reanimated';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { SignInScreen } from '../Screens/Auth/SignInScreen';
import { SplashScreen } from '../Screens/SplashScreen';
import { RouteKeys } from './RouteKeys';
import { HomeScreen } from '../Screens/HomeScreen';

export const AppNavigation = createAppContainer(
  //@ts-ignore
  createAnimatedSwitchNavigator({
    Splash: SplashScreen,
    Auth: createStackNavigator(
      {
        [RouteKeys.SignIn]: SignInScreen,
      },
      {
        headerMode: 'none',
      },
    ),
    Home: HomeScreen
  }, {
    transition: (
      <Transition.Together>
        <Transition.In type="fade" durationMs={400} />
      </Transition.Together>
    ),
    initialRouteName: RouteKeys.SplashScreen
  }),
);

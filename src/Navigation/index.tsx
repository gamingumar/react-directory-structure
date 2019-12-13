import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import { Transition } from 'react-native-reanimated';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { RouteKeys } from './RouteKeys';


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
    // Welcome:
  }, {
    transition: (
      <Transition.Together>
        <Transition.In type="fade" durationMs={400} />
      </Transition.Together>
    ),
    initialRouteName: RouteKeys.SplashScreen
  }),
);

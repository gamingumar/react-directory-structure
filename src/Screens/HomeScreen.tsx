/*
 * File: HomeScreen.tsx
 * Project: GU RN Starter Kit
 * File Created: Monday, 30th December 2019 11:38:07 pm
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Wednesday, 15th January 2020 12:32:09 am
 * -----
 * Copyright 2019 - 2020 WhileGeek, https://umar.tech
 */

import React, {useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from '../Components/Text';
import { Colors } from '../Themes/Colors';
import { log } from '../Lib';
import { AppContext } from '../Context/AppContext';
import { useNavigation } from 'react-navigation-hooks';
import { RouteKeys } from '../Navigation/RouteKeys';
import { SafeContainer } from '../Components/SafeContainer';

export const HomeScreen: React.FC = () => {

  const {user} = useContext(AppContext);
  const {navigate} = useNavigation()

  //? This effect is called if user logs out from any authenticated screen.
  //? This effect must be inside the first screen after login
  useEffect(() => {
    log('DATA IN HOME: ', user);

    if (!user || !user.access_token) {
      // ? logout if no user
      setTimeout(() => {
        log('NAVIGATING TO LOGOUT...');
        navigate(RouteKeys.SplashScreen);
      }, 500);
    }
  }, [user]);
  return (
    <SafeContainer style={styles.container}>
      <Text>HomeScreen</Text>
    </SafeContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,

    alignItems: 'center',
    justifyContent: 'center'
  },
});
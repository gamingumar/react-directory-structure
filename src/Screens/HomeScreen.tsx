/*
 * File: HomeScreen.tsx
 * Project: GU RN Starter Kit
 * File Created: Monday, 30th December 2019 11:38:07 pm
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Saturday, 7th March 2020 12:12:41 am
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
import { Title } from 'react-native-paper';

export const HomeScreen: React.FC = () => {

  const {user, logout} = useContext(AppContext);
  const {navigate} = useNavigation()

  //? This effect is called if user logs out from any authenticated screen.
  //? This effect must be inside the first screen after login
  useEffect(() => {
    log('DATA IN HOME: ', user);

    if (!user) {
      // ? logout if no user
      setTimeout(() => {
        log('NAVIGATING TO LOGOUT...');
        navigate(RouteKeys.SplashScreen);
      }, 500);
    }
  }, [user]);
  return (
    <SafeContainer style={styles.container}>
      <Title onPress={() => logout()}>Logout</Title>
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
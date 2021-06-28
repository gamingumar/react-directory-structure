/*
 * File: HomeScreen.tsx
 * Project: GU RN Starter Kit
 * File Created: Monday, 30th December 2019 11:38:07 pm
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Monday, 28th June 2021 10:24:00 pm
 * -----
 * Copyright 2019 - 2021 WhileGeek, https://umar.tech
 */

import React, {useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import { Title } from 'react-native-paper';
import { Colors } from '../Themes/Colors';
import { SafeContainer } from '../Components/SafeContainer';
import { AppContext } from '../Services/AppContext';

export const HomeScreen: React.FC = () => {

  const {user, logout} = useContext(AppContext);
  
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
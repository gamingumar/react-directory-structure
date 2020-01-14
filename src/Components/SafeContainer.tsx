/*
 * File: SafeContainer.tsx
 * Project: GU RN Starter Kit
 * File Created: Wednesday, 15th January 2020 12:29:25 am
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Wednesday, 15th January 2020 12:32:40 am
 * -----
 * Copyright 2019 - 2020 WhileGeek, https://umar.tech
 */

/**
 * Screen container with safe area view
 */
import React from 'react';
import {SafeAreaView} from 'react-navigation';
import {useScreenOrientation} from '../Hooks';
import { Colors } from '../Themes/Colors';

interface ISafeContainer {
  style?: any;
  children?: any;
  safeFromTop?: boolean;
}
export const SafeContainer = (props:ISafeContainer) => {
  const {isLandscape} = useScreenOrientation();

  let top:"always"|"never" = props.safeFromTop ? "always" : "never";

  return (
    <SafeAreaView
      style={[styles.container, props.style]}
      forceInset={{
        top: isLandscape ? 'never' : top,
        bottom: 'never',
        horizontal: 'always',
      }}>
      {props.children}
    </SafeAreaView>
  );
};

SafeContainer.defaultProps = {
  safeFromTop: true
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
};

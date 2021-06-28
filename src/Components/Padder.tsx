/*
 * File: Padder.tsx
 * Project: https://github.com/gamingumar/react-directory-structure
 * File Created: Wednesday, 8th January 2020 9:44:44 pm
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Tuesday, 29th June 2021 12:08:11 am
 * -----
 * Copyright 2020 - 2021 WhileGeek, https://umar.tech
 */

import React from 'react';
import {View} from 'react-native';
import { vs, s } from 'react-native-size-matters';

interface IPadder {
  height?: number;
  width?: number;
  children?: any;
}
// A component for padding
export const Padder = (props: IPadder) => {

  let {height, width} = props;

  if (!height) {
    height = 5
  }
  if (!width) {
    width = 0
  }

  const paddingVertical = vs(height) / 2;
  const paddingHorizontal = s(width) / 2;
  
  return <View style={{paddingVertical, paddingHorizontal}}>{props.children}</View>;
};

Padder.defaultProps = {
  height: 5,
  width: 0,
};
/*
 * File: Loader.tsx
 * Project: Components
 * File Created: Saturday, 14th December 2019 2:25:05 am
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Monday, 6th January 2020 11:04:56 pm
 * -----
 * Copyright 2019 - 2020 WhileGeek, https://gamingumar.com
 */
import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

import {Colors} from '../Themes/Colors';
import {Text} from './Text';
import { ScaledSheet } from 'react-native-size-matters';

interface ILoaderProps {
  visible?: boolean;
  inModal?: boolean;
  size?: 'large' | 'small' | number;
  title?: string;
  opacity?: number;
  style?: object;
  loaderColor?: string;
}

/**
 * GU - Loader Component with overlay modal support
 *
 * @param {Object} props
 * @param {boolean} props.visible
 * @param {boolean} props.inModal
 * @param {'large' | 'small' | number} props.size
 * @param {number} props.opacity
 * @param {Object} props.style
 * @param {string} props.title
 * @param {string} props.loaderColor
 *
 */
export const Loader = (props: ILoaderProps) => {
  const {size, inModal, visible, opacity, style, title, loaderColor} = props;

  const loader = <ActivityIndicator color={loaderColor || Colors.grayBG} size={size} />;
  if (!inModal) {
    if (visible === true)
      return (
        <View style={{padding: 5, ...style}}>
          {loader}
          {title != '' && <Text style={[styles.titleStyleSmall]}>{title}</Text>}
        </View>
      );
  }
  return (
    <Modal
      isVisible={visible ? true : false}
      useNativeDriver
      hideModalContentWhileAnimating
      // onBackdropPress={this._onCloseCommentPopup}
      // onSwipe={this._onCloseCommentPopup}
      // avoidKeyboard
      style={{
        margin: 0,
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
      backdropOpacity={opacity}>
      {loader}
      {title !== '' && <Text style={styles.titleStyle}>{title}</Text>}
    </Modal>
  );
};

Loader.defaultProps = {
  visible: true,
  inModal: true,
  size: 'large',
  opacity: 0.8,
  title: '',
  style: {},
};

const styles = ScaledSheet.create({
  titleStyle: {
    fontSize: "15@ms0.3",
    color: Colors.grayBG,
  },
  titleStyleSmall: {
    fontSize: "12@ms0.3",
    color: Colors.grayBG,
  }
});

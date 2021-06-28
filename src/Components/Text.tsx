/*
 * File: Text.tsx
 * Project: https://github.com/gamingumar/react-directory-structure
 * File Created: Saturday, 14th December 2019 2:26:12 am
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Tuesday, 29th June 2021 12:08:11 am
 * -----
 * Copyright 2019 - 2021 WhileGeek, https://umar.tech
 */
import React from "react";
import { Text as RnText, TextProps } from "react-native";

interface IText extends TextProps {
  style?: object;
}

/**
 * GU Text - Text Component with some default shit
 *
 * @param {*} props
 */
export let Text: React.FC<IText> = props => {
  return (
    <RnText
      style={{ color: "blue", fontSize: 22 }}
      {...props}
      // maxFontSizeMultiplier={props.scale || 1.1}
    >
      {props.children}
    </RnText>
  );
};

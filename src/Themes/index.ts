/*
 * File: index.ts
 * Project: GU RN Starter Kit
 * File Created: Thursday, 27th February 2020 1:52:40 am
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Monday, 28th June 2021 9:53:26 pm
 * -----
 * Copyright 2019 - 2021 WhileGeek, https://umar.tech
 */

import { DefaultTheme } from "react-native-paper";
import {Colors} from "./Colors";
import {Fonts} from "./Fonts";
import {Images} from "./Images";

export const appTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primaryTint,
    accent: Colors.secondaryTint,
    
    "error": "#B00020",
    "surface": "#ffffff",
    "text": "#2B2B2B",
  },

};


export default {
  Colors,
  Fonts,
  Images
};

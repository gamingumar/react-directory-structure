/*
 * File: AppStyles.ts
 * Project: GU RN Starter Kit
 * File Created: Thursday, 27th February 2020 1:52:40 am
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Monday, 28th June 2021 8:58:55 pm
 * -----
 * Copyright 2019 - 2021 WhileGeek, https://umar.tech
 */

import { TextStyle, ViewStyle } from "react-native";
import { Colors } from "./Colors";

export const AppStyles = {
  centralize: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
  },
  shadow1: {
    shadowOpacity: 0.1,
    shadowOffset: {width: 1, height: 1},
    shadowColor: Colors.grayBG,
  },
  row: {
    flexDirection: "row" as "row",
    alignItems: "center" as "center",
    justifyContent: "space-between" as "space-between",
  }
}

/**
 * GU Lib - Shadow
 * @param elevation - Elevation shadow
 */
export function elevationShadowStyle(elevation:number, color:string = "black") {
  return {
    elevation,
    shadowColor: color,
    shadowOffset: { width: 0, height: 0.5 * elevation },
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * elevation
  };
}
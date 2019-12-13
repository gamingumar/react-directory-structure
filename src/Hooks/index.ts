import React, { useState, useEffect } from "react";
import { SCREEN_WIDTH, SCREEN_HEIGHT, log, getWidth, getHeight } from "../Lib";
import { Dimensions } from "react-native";

export interface IOrientation {
  isLandscape: boolean,
  isPortrait: boolean,
  orientation: "landscape" | "portrait",
  width: number,
  height: number
}

/**
 * GU - Get Screen Orientation Hook
 */
export function useScreenOrientation():IOrientation {

  const baseStyle = {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH
  }

  const landscape:IOrientation = {
    ...baseStyle,
    isLandscape: true,
    isPortrait: false,
    orientation: "landscape"
  }

  const portrait:IOrientation = {
    ...baseStyle,
    isLandscape: false,
    isPortrait: true,
    orientation: "portrait"
  }

  const [dimension, setDimension] = useState(SCREEN_WIDTH > SCREEN_HEIGHT ? landscape : portrait);

  // log('orientation: ', dimension);

  useEffect(() => {

    const _calculate = (e = null) => {
      let width = getWidth()
      let height = getHeight();

      if (e) {
        width = e.window.width;
        height = e.window.height;
      } 

      let orientation = portrait;

      if (width > height) {
        orientation = landscape;
      }

      orientation.height = height;
      orientation.width = width;

      setDimension(orientation);
    }

    _calculate();

    Dimensions.addEventListener("change", e => {
      _calculate(e);
    });
    return () => {
      Dimensions.removeEventListener("change", () => {
        log("cleared dimension event");
      });
    };
  }, []);

  return dimension;
}
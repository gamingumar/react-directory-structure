/*
 * File: Image.tsx
 * Project: Components
 * File Created: Saturday, 14th December 2019 2:24:19 am
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Monday, 6th January 2020 11:04:56 pm
 * -----
 * Copyright 2019 - 2020 WhileGeek, https://umar.tech
 */
import React from "react";
import { Image as RnImage, ImageSourcePropType, ImageProps } from "react-native";
import { isString } from "../Lib";
import { Config } from "../Config";

interface IImage extends ImageProps {
  source: ImageSourcePropType;
  cache?: boolean;
  style?: object;
}

/**
 * GU Image - Image Component with some default shit
 *
 * @param {Object} props - source can be url or actual image
 * @param {string|Object} props.source - image source
 * @param {Object} [props.style] - image style
 */
// export default function <IImage>Image(props) {
//   let { source } = props;

//   if (isString(source)) {
//     source = { uri: source, cache: Config.imageCache };
//   }
//   return <RnImage {...props} source={source} />;
// }



export const Image: React.FC<IImage> = (props) => {
  let { source, cache } = props;

  let defaultCache = cache ? "force-cache" : Config.imageCache
  
  if(cache === false) {
    defaultCache = "reload"
  }

  if (isString(source)) {
    if (source === '') {
      source = {}
    } else {
      source = { uri: source, cache: defaultCache };
    }
  }

  return <RnImage {...props} source={source} />;
}
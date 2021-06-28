/*
 * File: SafeContainer.tsx
 * Project: https://github.com/gamingumar/react-directory-structure
 * File Created: Wednesday, 15th January 2020 12:29:25 am
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Tuesday, 29th June 2021 12:08:11 am
 * -----
 * Copyright 2019 - 2021 WhileGeek, https://umar.tech
 */

/**
 * Screen container with safe area view
 */
 import React from "react";
 import { SafeAreaView, useSafeArea  } from "react-native-safe-area-context";
 import { useScreenOrientation } from "../Hooks";
 import { Colors } from "../Themes/Colors";
 import { View, ViewStyle, StatusBar } from "react-native";
 
 interface ISafeContainer {
   style?: ViewStyle;
   children?: any;
   safeVertical?: boolean;
   safeHorizontal?: boolean;
   safeFromTop?: boolean;
   safeFromBottom?: boolean;
   safeFromLeft?: boolean;
   safeFromRight?: boolean;
 }
 export const SafeContainer = (props: ISafeContainer) => {
   const { isLandscape } = useScreenOrientation();
 
   const insets = useSafeArea()
 
   // let top: "always" | "never" = props.safeFromTop ? "always" : "never";
   // let bottom: "always" | "never" = props.safeFromBottom ? "always" : "never";
 
   const {safeVertical, safeHorizontal, safeFromBottom, safeFromLeft, safeFromRight, safeFromTop} = props
 
   return (
     <View
       style={[styles.container, {
         flex: 1,
         paddingTop: (safeVertical && safeFromTop) ? insets.top : 0,
         paddingBottom: (safeVertical && safeFromBottom) ? insets.bottom : 0,
         paddingLeft: (safeHorizontal && safeFromLeft) ? insets.left : 0,
         paddingRight: (safeHorizontal && safeFromRight) ? insets.right : 0,
       }, props.style]}
       // edges=
       // forceInset={{
       //   top: isLandscape ? "never" : top,
       //   bottom: isLandscape ? "never" : bottom,
       //   horizontal: "always"
       // }}
     >
       <StatusBar backgroundColor={Colors.primaryTint} barStyle="dark-content" />
       {props.children}
     </View>
   );
 };
 
 SafeContainer.defaultProps = {
   safeFromTop: true,
   safeFromBottom: true,
   safeFromLeft: true,
   safeFromRight: true,
   safeVertical: true,
   safeHorizontal: true,
 };
 
 const styles = {
   container: {
     flex: 1,
     backgroundColor: Colors.white
   }
 };
 
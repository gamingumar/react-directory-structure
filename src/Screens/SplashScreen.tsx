/*
 * File: SplashScreen.tsx
 * Project: Screens
 * File Created: Saturday, 14th December 2019 2:02:36 am
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Saturday, 14th December 2019 2:02:37 am
 * -----
 * Copyright 2019 - 2019 WhileGeek, https://gamingumar.com
 */

import React, { useEffect, useContext, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import { log } from "../Lib";
import { Colors } from "../Themes/Colors";
import { Config } from "../Config";
import { AppContext } from "../Context";

 export const SplashScreen: React.FC = () => {
  log('*** RENDER *** : SPLASH SCREEN');

  const {navigate} = useNavigation();

  let navigateTimeout: any = null;

  const [loading, setLoading] = useState(true);

  const {
    user,
  } = useContext(AppContext);

  useEffect(() => {
    _getData();

  }, []);

  /**
   * Show loading while data is loading from App Storage
   */
  useEffect(() => {
    if (!loading) {
      _navigateForward();
    }
  }, [user, loading]);

  /**
   * Restore App Cart from AsyncStorage and set loading to false
   */
  const _getData = async () => {
    setLoading(false);
  }


  const _navigateForward = () => {
    let screen = Config.FIRST_SCREEN_AUTH_FAIL;

    
    if (user) {
      screen = Config.FIRST_SCREEN;
    }

    navigateTimeout = setTimeout(() => {
      navigate(screen);
    }, Config.SPLASH_DELAY);

    return () => {
      if (navigateTimeout) {
        log('cleaning navigate timeout..');
        clearTimeout(navigateTimeout);
      }
    };
  };


  return (
    <View style={styles.container}>
<Loader inModal={false} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white
  }
});

/*
 * File: App.tsx
 * Project: GU RN Starter Kit
 * File Created: Monday, 16th December 2019 6:24:45 pm
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Friday, 28th February 2020 12:40:19 am
 * -----
 * Copyright 2019 - 2020 WhileGeek, https://umar.tech
 */
import React, {Fragment, useEffect} from 'react';
import {StatusBar, YellowBox, View} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import {AppNavigation} from '../Navigation';
import {Colors} from '../Themes/Colors';
import {enableScreens} from 'react-native-screens';
import {AppProvider} from '../Services/AppContext';
import {SafeAreaView} from 'react-navigation';

import RNBootSplash from 'react-native-bootsplash';
import {DropDownAlertHolder} from '../Components/DropDownAlertHolder';
import {is_ios, is_android} from '../Lib';
import { Config } from '../Config';

enableScreens();

if (__DEV__) {
  import('../Config/ReactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  );
}

const App = () => {
  let init = async () => {
    try{
      // Icon.loadFont()

    } catch (e) {}
    // …do multiple async tasks
  };

  useEffect(() => {
    if (__DEV__) {
      YellowBox.ignoreWarnings(['Require cycle:']);
      console.disableYellowBox = Config.YELLOW_BOX_DISABLE; //TODO: SET THIS TO FALSE FOR DEBUG YELLOW BOX
    }

    init().finally(() => {
      // without fadeout: RNBootSplash.hide()
      RNBootSplash.hide({duration: 250});
    });
  }, []);

  return (
        <AppProvider>
          <AppNavigation />
          <DropdownAlert updateStatusBar={is_android} ref={ref => DropDownAlertHolder.setDropDown(ref)} />
        </AppProvider>
  );
};

export default App;


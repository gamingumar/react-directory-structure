/*
 * File: App.tsx
 * Project: Screens
 * File Created: Monday, 16th December 2019 6:24:45 pm
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Monday, 13th January 2020 11:53:18 pm
 * -----
 * Copyright 2019 - 2020 WhileGeek, https://umar.tech
 */
import React, {Fragment, useEffect} from 'react';
import {StatusBar, YellowBox, View} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import {AppNavigation} from '../Navigation';
import {Colors} from '../Themes/Colors';
import {useScreens} from 'react-native-screens';
import {AppProvider} from '../Context/AppContext';
import {SafeAreaView} from 'react-navigation';

import RNBootSplash from 'react-native-bootsplash';
import {DropDownAlertHolder} from '../Components/DropDownAlertHolder';
import {is_ios, is_android} from '../Lib';
import { Config } from '../Config';

useScreens();

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
      <SafeAreaView
        style={{flex: 1, backgroundColor: Colors.grayBG}}
        forceInset={{vertical: 'never', horizontal: 'never'}}
        >
        <AppProvider>
          <AppNavigation />
          <DropdownAlert updateStatusBar={is_android} ref={ref => DropDownAlertHolder.setDropDown(ref)} />
        </AppProvider>
      </SafeAreaView>
  );
};

export default App;


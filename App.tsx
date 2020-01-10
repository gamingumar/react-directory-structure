/*
 * File: App.tsx
 * Project: GU RN Starter Kit
 * File Created: Friday, 10th January 2020 7:15:58 pm
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Friday, 10th January 2020 7:16:59 pm
 * -----
 * Copyright 2020 - 2020 WhileGeek, https://umar.tech
 */

import React, {useEffect} from 'react';
import {YellowBox} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import {AppNavigation} from '../Navigation';
import {Colors} from '../Themes/Colors';
import {enableScreens} from 'react-native-screens';
import {AppProvider} from '../Context/AppContext';
import {SafeAreaView} from 'react-navigation';

import RNBootSplash from 'react-native-bootsplash';
import {DropDownHolder} from '../Components/DropDownHolder';
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
      <SafeAreaView
        style={{flex: 1, backgroundColor: Colors.grayBG}}
        forceInset={{vertical: 'never', horizontal: 'never'}}
        >
        <AppProvider>
          <AppNavigation />
          <DropdownAlert updateStatusBar={is_android} ref={ref => DropDownHolder.setDropDown(ref)} />
        </AppProvider>
      </SafeAreaView>
  );
};

export default App;
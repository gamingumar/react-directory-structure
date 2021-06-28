/*
 * File: App.tsx
 * Project: GU RN Starter Kit
 * File Created: Monday, 16th December 2019 6:24:45 pm
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Monday, 28th June 2021 9:53:26 pm
 * -----
 * Copyright 2019 - 2021 WhileGeek, https://umar.tech
 */
import React, { Fragment, useEffect } from "react";
import { StatusBar, YellowBox, View } from "react-native";
import DropdownAlert from "react-native-dropdownalert";
import { Provider as PaperProvider } from "react-native-paper";
import { AppNavigation } from "../Navigation";
import { Colors } from "../Themes/Colors";
import { enableScreens } from "react-native-screens";
import { AppProvider } from "../Services/AppContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { DropDownAlertHolder } from "../Components/DropDownAlertHolder";
import { is_ios, is_android } from "../Lib";
import { Config } from "../Config";
import { appTheme } from "../Themes";

enableScreens();

if (__DEV__) {
  import("../Config/ReactotronConfig").then(() =>
    console.log("Reactotron Configured")
  );
}

const App = () => {
  let init = async () => {
    try {
      // Icon.loadFont()
    } catch (e) {}
    // …do multiple async tasks
  };

  useEffect(() => {
    

  }, []);

  return (
    <AppProvider>
      <PaperProvider theme={appTheme}>
      <SafeAreaProvider>
        <AppNavigation />
        <DropdownAlert
          updateStatusBar={is_android}
          ref={(ref) => DropDownAlertHolder.setDropDown(ref)}
        />
      </SafeAreaProvider>
      </PaperProvider>
    </AppProvider>
  );
};

export default App;

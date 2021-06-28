/*
 * File: index.tsx
 * Project: https://github.com/gamingumar/react-directory-structure
 * File Created: Thursday, 27th February 2020 1:52:40 am
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Tuesday, 29th June 2021 12:08:11 am
 * -----
 * Copyright 2019 - 2021 WhileGeek, https://umar.tech
 */

import React from 'react';
import { View, ViewStyle } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SignInScreen } from '../Screens/Auth/SignInScreen';
import { SignUpScreen } from '../Screens/Auth/SignUpScreen';
import { RouteKeys } from './RouteKeys';
import { HomeScreen } from '../Screens/HomeScreen';
import { storageGet } from '../Lib';
import { AppContext } from '../Services/AppContext';
import { ILoginResponse } from '../Services/Interfaces/AppInterface';
import { setGlobalUser } from '../Services/GlobalService';
import { Config } from '../Config';
import { Colors } from '../Themes/Colors';
import { Loader } from '../Components/Loader';

const Stack = createStackNavigator();

function NoAuthStack() {
  return (
    <Stack.Navigator
      // headerMode="none"
      screenOptions={{
        gestureEnabled: false,
      }}
    >
      <Stack.Screen
        name={RouteKeys.SignIn}
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RouteKeys.SignUp}
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      // headerMode="none"
      screenOptions={{
        gestureEnabled: false,
      }}
    >
      <Stack.Screen
        name={RouteKeys.Home}
        options={{ gestureEnabled: false, headerShown: false }}
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
}

export function AppNavigation() {
  let navigateTimeout: any = null;

  const [loading, setLoading] = React.useState(true);

  const { user, updateUser } = React.useContext(AppContext);

  React.useEffect(() => {
    _getData();
  }, []);

  /**
   * Restore App Data from AsyncStorage and set loading to false
   */
  const _getData = async () => {
    const userData: ILoginResponse = await storageGet("user");

    // if (userData) {
    updateUser(userData); // update data in context and storage
    // }

    // if (userData) {
    // this is to be used for all future api calls
    setGlobalUser(userData);
    // }

    // setLoading(false);

    navigateTimeout = setTimeout(() => {
      setLoading(false);
    }, Config.SPLASH_DELAY);
  };

  if (loading) {
    return (
      <View style={containerStyle}>
        <Loader inModal={false} loaderColor={Colors.grayBG} />
      </View>
    );
  }

  // return <SideDrawer />

  // return (
  //   <NavigationContainer>
  //     <AuthStack />
  //   </NavigationContainer>
  // );

  return (
    <NavigationContainer>
      {user ? <AuthStack /> : <NoAuthStack />}
    </NavigationContainer>
  );
}

const containerStyle: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: Colors.white,
};

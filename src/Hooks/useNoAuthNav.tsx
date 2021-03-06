/*
 * File: useNoAuthNav.tsx
 * Project: https://github.com/gamingumar/react-directory-structure
 * File Created: Monday, 28th June 2021 9:09:23 pm
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Tuesday, 29th June 2021 12:08:12 am
 * -----
 * Copyright 2019 - 2021 WhileGeek, https://umar.tech
 */


import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { RouteKeys } from "../Nav/RouteKeys";
import { AppContext } from "../Services/AppContext";

export function useNoAuthNav() {
  const data = React.useContext(AppContext);

  const navigation = useNavigation();

  // redirect to login screen
  if (!data.user) {
    navigation.navigate(RouteKeys.SignIn);
    return true;
  }

  return data;
}

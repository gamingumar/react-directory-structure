/*
 * File: GlobalService.ts
 * Project: https://github.com/gamingumar/react-directory-structure
 * File Created: Saturday, 14th December 2019 1:51:23 am
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Tuesday, 29th June 2021 12:08:11 am
 * -----
 * Copyright 2020 - 2021 WhileGeek, https://umar.tech
 */

import { ILoginResponse, IUser } from "./Interfaces/AppInterface";

export const logoutGlobal = () => {
  const logout = global.logout;

  if (typeof logout === "function") {
    logout();
  }
}

export const setGlobalLogout = (method = () => {}) => {
  return global.logout = method;
}

export const setGlobalUser = (user:IUser|ILoginResponse|null = null) => {
  return global.user = user;
}


export const getGlobalUser = () => {
  return global.user;
}
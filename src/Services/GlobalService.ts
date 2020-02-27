/*
 * File: GlobalService.ts
 * Project: GU RN Starter Kit
 * File Created: Saturday, 14th December 2019 1:51:23 am
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Friday, 28th February 2020 12:24:54 am
 * -----
 * Copyright 2020 - 2020 WhileGeek, https://umar.tech
 */

import { IUser } from "./Interfaces/AppInterface";

export const logoutGlobal = () => {
  const logout = global.logout;

  if (typeof logout === "function") {
    logout();
  }
}

export const setGlobalLogout = (method = () => {}) => {
  return global.logout = method;
}

export const setGlobalUser = (user:IUser|null = null) => {
  return global.user = user;
}


export const getGlobalUser = () => {
  return global.user;
}
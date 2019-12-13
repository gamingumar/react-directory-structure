/*
 * File: GlobalService.ts
 * Author: Umar Aamer (umaraamer@gmail.com)
 * 
 * Copyright 2019 - 2020 WhileGeek, https://gamingumar.com
 */


export const logoutGlobal = () => {
  const logout = global.logout;

  if (typeof logout === "function") {
    logout();
  }
}

export const setGlobalLogout = (method = () => {}) => {
  return global.logout = method;
}

export const setGlobalUserToken = (token:string|null = null) => {
  return global.apiToken = token;
}


export const getGlobalUserToken = () => {
  return global.apiToken;
}
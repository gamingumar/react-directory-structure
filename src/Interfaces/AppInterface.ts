/*
 * File: AppInterface.ts
 * Project: Interfaces
 * File Created: Saturday, 14th December 2019 1:15:15 am
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Monday, 6th January 2020 11:04:56 pm
 * -----
 * Copyright 2019 - 2020 WhileGeek, https://gamingumar.com
 */

export interface IAppContext {
  user: IUser | null;
  updateUser: Function;
}

// ? Data cache in storage interface
export type TStorageKeys = "user" | string;


export interface IUser {
  email:      string;
  api_token:  string|null;
}
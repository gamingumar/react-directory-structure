/*
 * File: AppInterface.ts
 * Project: GU RN Starter Kit
 * File Created: Saturday, 14th December 2019 1:15:15 am
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Friday, 28th February 2020 12:40:19 am
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
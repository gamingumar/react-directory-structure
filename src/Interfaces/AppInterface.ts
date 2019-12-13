/*
 * File: AppInterface.ts
 * Project: Interfaces
 * File Created: Saturday, 14th December 2019 1:15:15 am
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Saturday, 14th December 2019 1:15:15 am
 * -----
 * Copyright 2019 - 2019 WhileGeek, https://gamingumar.com
 */

export interface IAppContext {
}

// ? Data cache in storage interface
export type TStorageKeys = "user" | string;


export interface IUser {
  email:      string;
  api_token:  string|null;
}
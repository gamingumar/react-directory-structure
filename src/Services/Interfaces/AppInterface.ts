/*
 * File: AppInterface.ts
 * Project: https://github.com/gamingumar/react-directory-structure
 * File Created: Saturday, 14th December 2019 1:15:15 am
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Tuesday, 29th June 2021 12:08:11 am
 * -----
 * Copyright 2019 - 2021 WhileGeek, https://gamingumar.com
 */

export interface IAppContext {
  user: IUser | null;
  updateUser: Function;
}

// ? Data cache in storage interface
export type TStorageKeys = "user" | string;


export interface IUser {
  email:      string;
  fullName:   string;
  username:   string;
  phone:      string;
  photo:      string;
}

export interface IResetRequestPayload{
  email?:string
  phone?:string
}

export interface IResetPasswordPayload{
  code:string,
  password:string,
  confirm:string
  email?:string
  phone?:string
 }

 export interface ILoginResponse {
  ttl: number;
  user: IUser;
  accessToken: string;
}
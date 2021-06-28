
/*
 * File: AuthApi.ts
 * Project: https://github.com/gamingumar/react-directory-structure
 * File Created: Monday, 28th June 2021 8:51:33 pm
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Tuesday, 29th June 2021 12:08:11 am
 * -----
 * Copyright 2019 - 2021 WhileGeek, https://umar.tech
 */

import {
  ApiPost,
  ApiGet,
  ApiPut,
  ApiPatch,
  ApiUploadPost,
  ApiDelete,
  apiErrorResponse,
} from "../api-client";
import { log, _cloneDeep } from "../../Lib/";
import {
  IResetPasswordPayload,
  IResetRequestPayload,
  IUser,
} from "../Interfaces/AppInterface";

/**
 * Test server status
 */
const ApiPing = async () => {
  const data = await ApiGet(`auth/api-ping`);

  log("☁️ API PING RESPONSE: ", data);

  if (data.ok) {
    // storageUpdate("user", data.data)
  }

  return data;
};

interface IRegister {
  fullName: string;
  username: string;
  email: string;
  // phone: string,
  password: string | undefined | null;
}

/**
 * Register user / Create user account
 *
 * @param UserObj - IRegister User
 */
const Register = async (user: IRegister) => {
  const data = await ApiPost(`auth/signup`, {
    ...user,
    username: user.username === "" ? user.email : user.username,
    password: user.password ? user.password : "",
    photo: "",
  });

  log("☁️ Register RESPONSE: ", data);

  if (data.ok) {
    // storageUpdate("user", data.data)
  }

  return data;
};

/**
 * Login user with email and password
 * @param email - Email / Username / Phone
 * @param password - Password
 */
const Login = async (email: string, password: string) => {
  const data = await ApiPost(`auth/signin`, {
    username: email,
    password,
  });

  log("☁️ LOGIN RESPONSE: ", data);

  if (data.ok) {
    // storageUpdate("user", data.data)
  }

  return data;
};

/**
 * Update User Basic Profile email | phone | fullName
 */
const UpdateBasicProfile = async (profile: Partial<IUser>) => {
  const data = await ApiPatch(`auth/profile`, {
    email: profile.email,
    phone: profile.phone,
    fullName: profile.fullName,
    username: profile.username,
  });

  log("☁️ User Profile Update RESPONSE: ", data);

  return data;
};

/**
 * Upload User Profile Image
 */
const UploadAvatar = async (imageData: any) => {
  const data = await ApiUploadPost(`auth/upload`, imageData);

  log("☁️ User Pic upload RESPONSE: ", data);

  return data;
};


/**
 * Change Password
 *
 * @param oldPassword Old Password
 * @param password New Password
 */
const ChangePassword = async (oldPassword: string, password: string) => {
  const data = await ApiPatch(`auth/profile`, { oldPassword, password });

  log("☁️ CHANGE PASSWORD RESPONSE: ", data);

  return data;
};

/**
 * Forget Password / Reset Password Request
 *
 * @param payload IResetRequestPayload
 */
const ResetRequest = async (payload: IResetRequestPayload) => {
  const data = await ApiPost(`auth/forgot-password`, payload);

  log("☁️ RESET PASSWORD REQUEST RESPONSE: ", data);

  // if (data.ok) {
  // }

  return data;
};

/**
 * Reset Password
 * @param payload IResetPasswordPayload
 */
const ResetPassword = async (payload: IResetPasswordPayload) => {
  const { code, password, confirm, email, phone } = payload;
  const data = await ApiPatch(`auth/reset-password/${code}`, {
    email,
    password,
    confirm,
  });

  log("☁️ RESET PASSWORD RESPONSE: ", data);

  return data;
};


/**
 * !not implemented
 * Logout user
 */
const Logout = async () => {
  const data = await ApiPost(`user/logout`);

  log("☁️ LOGOUT RESPONSE: ", data);

  if (data.ok) {
    // storageUpdate("user", data.data)
  }

  return data;
};

export const AuthApi = {
  ApiPing,
  UpdateBasicProfile,
  UploadAvatar,
  ChangePassword,
  Register,
  Login,
  Logout
};

/*
 * File: index.ts
 * Project: https://github.com/gamingumar/react-directory-structure
 * File Created: Thursday, 27th February 2020 1:52:40 am
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Tuesday, 29th June 2021 1:15:04 am
 * -----
 * Copyright 2019 - 2021 WhileGeek, https://umar.tech
 */

import Constants from "expo-constants";
import { RouteKeys } from "../Navigation/RouteKeys";
const { manifest } = Constants;

import { version, apiLink } from "../../package.json";

// import DeviceInfo from 'react-native-device-info';

let hostIp =
  typeof manifest?.packagerOpts === `object` && manifest.packagerOpts.dev
    ? manifest.debuggerHost.split(`:`).shift()
    : "";

hostIp = hostIp !== "" ? "http://" + hostIp : ""; // doing this to connect to localhost server

enum EAppMode {
  PRODUCTION = "production",
  TEST = "test",
  LOCAL = "local",
}

const APP_MODE: EAppMode = EAppMode.TEST; //! CHANGE THIS TO CHANGE APP MODE

const links = {
  production: {
    api: "https://whilegeek.com/",
  },
  test: {
    api: "https://gamingumar.com/",
  },
  local: {
    api: hostIp?.concat(`:3002/`),
    web: hostIp?.concat(`:3000`),
  },
};

const IS_PRODUCTION = links["production"].api === links[APP_MODE].api;

const API_URL = links[APP_MODE].api;

export let Config = {
  APP_VERSION: `v${version} \nAPI Support: ${apiLink} \n${
    !IS_PRODUCTION ? `(TEST) ${API_URL}` : ""
  }`,
  YELLOW_BOX_DISABLE: false,

  SPLASH_DELAY: 0,

  API_URL, // !API,
  imageCache: "force-cache",

  LOGOUT_AFTER_SECONDS: 2592000, // 30 days * 86400

  LOGOUT_STATUS_LIST: [401, 403], //? LOGOUT if any of these status codes occur

  FIRST_SCREEN: RouteKeys.Home, //.Home //TODO: ONLY FOR DEBUG Home
  FIRST_SCREEN_AUTH_FAIL: RouteKeys.SignIn, //.SignIn

  DEMO_EMAIL: IS_PRODUCTION ? "" : "umaraamer@gmail.com",
  DEMO_PASSWORD: IS_PRODUCTION ? "" : "1234",

  IS_PRODUCTION,

  DUMMY_USER: {
    email: "umaraamer@gmail.com",
    fullName: "Umar Aamer",
    phone: "+923335251661",
    photo: "https://avatars.githubusercontent.com/u/5675313?v=4",
    username: "gamingumar",
  },
};

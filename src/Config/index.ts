/*
 * File: index.ts (Config)
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Tuesday, 10th December 2019 1:18:04 am
 * -----
 * Copyright 2019 - 2020 WhileGeek, https://gamingumar.com
 */

import { RouteKeys } from "../Navigation/RouteKeys";
import DeviceInfo from 'react-native-device-info';
import { version } from '../../package.json';

const TESTING_API = "";
const STAGING_API = "";
const PRODUCTION_API = "";

const IS_PRODUCTION = false; //! PRODUCTION OR BETA ************ false | TESTING_API | PRODUCTION_API

const API_URL = IS_PRODUCTION ? PRODUCTION_API : STAGING_API; //! TESTING_API | STAGING_API

const BUILD_CODES = IS_PRODUCTION ? '' : '[0-0]'; //? Android & iOS Build Numbers
export let Config = {

  APP_VERSION: `v${version} (${DeviceInfo.getReadableVersion()}) ${BUILD_CODES}`,
  YELLOW_BOX_DISABLE: false,

  SPLASH_DELAY: 0,

  API_URL, // !API,
  imageCache: "force-cache",

  FIRST_SCREEN: RouteKeys.Home, //.Home //TODO: ONLY FOR DEBUG Home
  FIRST_SCREEN_AUTH_FAIL: RouteKeys.SignIn, //.SignIn

  DEMO_EMAIL: IS_PRODUCTION ? "" : "umar@gamingumar.com",
  DEMO_PASSWORD: IS_PRODUCTION ? "" : "1234"
}
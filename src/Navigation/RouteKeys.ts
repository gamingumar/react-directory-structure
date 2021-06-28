/*
 * File: RouteKeys.ts
 * Project: GU RN Starter Kit
 * File Created: Thursday, 27th February 2020 1:52:40 am
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Monday, 28th June 2021 9:06:28 pm
 * -----
 * Copyright 2019 - 2021 WhileGeek, https://umar.tech
 */


/**
 * GU - App Route Keys
 */
export const RouteKeys = {
  SplashScreen: "Splash",
  SignIn: "SignIn",
  SignUp: "SignUp",
  Welcome: "Welcome",

  Home: "Home",
}

type TKeys = keyof typeof RouteKeys

export type TRouteType = typeof RouteKeys[TKeys]

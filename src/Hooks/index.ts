/*
 * File: index.ts
 * Project: GU RN Starter Kit
 * File Created: Thursday, 27th February 2020 1:52:40 am
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Monday, 28th June 2021 9:08:20 pm
 * -----
 * Copyright 2019 - 2021 WhileGeek, https://umar.tech
 */


import React, { useState, useEffect } from "react";
import { SCREEN_WIDTH, SCREEN_HEIGHT, log, getWidth, getHeight } from "../Lib";
import { Dimensions, Alert } from "react-native";
import * as Network from "expo-network";
import * as Location from 'expo-location';
import Constants from "expo-constants";
import { Config } from "../Config";
import { handleCatchError } from "../Lib/ErrorHandling";
const { manifest } = Constants;

export interface IOrientation {
  isLandscape: boolean,
  isPortrait: boolean,
  orientation: "landscape" | "portrait",
  width: number,
  height: number
}

/**
 * GU - Get Screen Orientation Hook
 */
export function useScreenOrientation():IOrientation {

  const baseStyle = {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH
  }

  const landscape:IOrientation = {
    ...baseStyle,
    isLandscape: true,
    isPortrait: false,
    orientation: "landscape"
  }

  const portrait:IOrientation = {
    ...baseStyle,
    isLandscape: false,
    isPortrait: true,
    orientation: "portrait"
  }

  const [dimension, setDimension] = useState(SCREEN_WIDTH > SCREEN_HEIGHT ? landscape : portrait);

  // log('orientation: ', dimension);

  useEffect(() => {

    const _calculate = (e = null) => {
      let width = getWidth()
      let height = getHeight();

      if (e) {
        width = e.window.width;
        height = e.window.height;
      } 

      let orientation = portrait;

      if (width > height) {
        orientation = landscape;
      }

      orientation.height = height;
      orientation.width = width;

      setDimension(orientation);
    }

    _calculate();

    Dimensions.addEventListener("change", e => {
      _calculate(e);
    });
    return () => {
      Dimensions.removeEventListener("change", () => {
        log("cleared dimension event");
      });
    };
  }, []);

  return dimension;
}

export function useNetwork() {

  const [localIp, setLocalIp] = useState('')

  const hostIp = (typeof manifest?.packagerOpts === `object`) && manifest?.packagerOpts.dev
  ? manifest?.debuggerHost.split(`:`).shift().concat(`:3000`)
  : `api.example.com`;

  useEffect(() => {
    _getLocalIp()
  }, [])

  const _getLocalIp = async () => {
    const ip = await Network.getIpAddressAsync();

    setLocalIp(ip)
  }

  return {localIp, hostIp}
}

export function useUserLocation() {

  const [location, setLocation] = useState(Config.DEFAULT_COORDINATES)

  const [loading, setLoading] = useState(true)

  const _fetchLocation = async () => {
    setLoading(true)
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        log('Permission to access location was denied');
      }
  
      let gps = await Location.getCurrentPositionAsync({});
  
      log("Location GOT: ", gps)
  
      if (gps) {
        setLocation({
          ...location,
          latitude: gps.coords.latitude,
          longitude: gps.coords.longitude,
        });
      }
    } catch(e) {
      handleCatchError(e)
    }
    setLoading(false)
  }

  useEffect(() => {
    try {
      _fetchLocation()
    } catch(e) {
      log(e.message)
      Alert.alert("Something went wrong while fetching location")
    }
  }, []);

  return {location, loadingLocation: loading}
}
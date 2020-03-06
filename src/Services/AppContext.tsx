/*
 * File: AppContext.tsx
 * Project: GU RN Starter Kit
 * File Created: Sunday, 14th July 2019 1:12:15 am
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Saturday, 7th March 2020 12:12:41 am
 * -----
 * Copyright 2019 - 2020 WhileGeek, https://umar.tech
 */

import React, {createContext, useState, useEffect} from 'react';
import {
  log,
  storageUpdate,
  storageGet,
  is_android,
  isAndroidEmulator,
  _cloneDeep,
} from '../Lib';
import AsyncStorage from '@react-native-community/async-storage';
import {setGlobalLogout, setGlobalUser} from './GlobalService';
import { IUser } from './Interfaces/AppInterface';


interface IAppContext {
  logout: Function;
  logoutIfTimeout: Function;
  user: IUser | null;
  updateUser(newUser: IUser | null): void;
}

export const AppContext = createContext<IAppContext>({
  logout: () => {},
  logoutIfTimeout: () => {},
  user: null,
  updateUser: (newUser: IUser | null) => null
});


export const AppProvider: React.FC = props => {
  // ? future use for logged in user
  const [user, setUser] = useState<IUser | null>(null);

  // Update Data in User Context and Storage
  const updateUser = async (newUser: IUser | null) => {
    log('updating new user...', newUser);

    setGlobalUser(newUser);
    
    setUser(newUser);

    await storageUpdate('user', newUser);

    return newUser;
  };

  // ? CONTEXT LOADING
  const [contextLoading, setContextLoading] = useState(false);
  const updateContextLoading = (l = false) => {
    log('UPDATING context loading ', l);

    setContextLoading(l);
  };


  /**
   * Logout User and clear Storage
   */
  const logout = () => {
    log('LOGGING OUT IN CONTEXT');

    updateContextLoading(true);
    updateUser(null);

    setGlobalUser(null);

    AsyncStorage.clear();

    updateContextLoading(false);
  };

  useEffect(() => {
    setGlobalLogout(logout);
  }, [user]);

  

  return (
    <AppContext.Provider
      value={{
        user,
        updateUser,

        logout,

        contextLoading,
        updateContextLoading,
      }}>
      {props.children}
    </AppContext.Provider>
  );
};

/*
 * File: AppContext.tsx
 * Project: https://github.com/gamingumar/react-directory-structure
 * File Created: Sunday, 14th July 2019 1:12:15 am
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Thursday, 1st July 2021 4:29:26 am
 * -----
 * Copyright 2019 - 2021 WhileGeek, https://umar.tech
 */

import React, {createContext, useState, useEffect} from 'react';
import {
  log,
  storageUpdate,
  storageGet,
  is_android,
  _cloneDeep,
  storageClear,
} from '../Lib';
import {setGlobalLogout, setGlobalUser} from './GlobalService';
import { IUser } from './Interfaces/AppInterface';


interface IAppContext {
  logout: Function;
  // logoutIfTimeout: Function;
  user: IUser | null;
  updateUser(newUser: IUser | null): void;
}

export const AppContext = createContext<IAppContext>({
  logout: () => {},
  // logoutIfTimeout: () => {},
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

    storageClear();

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
      }}>
      {props.children}
    </AppContext.Provider>
  );
};

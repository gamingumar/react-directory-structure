/*
 * File: ErrorHandling.ts
 * Project: https://github.com/gamingumar/react-directory-structure
 * File Created: Friday, 10th January 2020 6:31:46 pm
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Tuesday, 29th June 2021 12:08:12 am
 * -----
 * Copyright 2020 - 2021 WhileGeek, https://umar.tech
 */

import { DropDownAlertHolder } from '../Components/DropDownAlertHolder';
import { log } from './index'
import { Config } from '../Config'
import { IApiResponse } from '../Services/api-client';


/**
 * Handle Error in Catch
 * @param e - Error Object
 */
export const handleCatchError = (e: any, from:string|null = null) => {
  const errorDrop = DropDownAlertHolder.getDropDown();
  log(`ERROR: ${from || ' CATCH ERROR: '}: `, e.message, e);

  let errorTitle = 'Something went wrong';
  let errorDesc = Config.IS_PRODUCTION ? '' : e.message;
  if (e.message === '440') {
    errorTitle = "Please Login again";
    errorDesc = "Session timeout";
  }

  errorDrop.alertWithType(
    'error',
    errorTitle,
    errorDesc,
  );
};

/**
 * Handle API response error
 * @param response - API Response
 * @param from - From screen
 */
export const handleApiError = (response: IApiResponse, from:string|null = null, showAlert = true) => {
  const errorDrop = DropDownAlertHolder.getDropDown();
  const { data, status } = response;

  let err = 'Something went wrong';
  let err2 = err;
  try {
    err = data.error_description;

    if (status === 401 && from !== "login") {
      err = "Please Login.";
    }
  } catch (e) {
    err2 = e.message;
  }

  log(`ERROR: ${from || 'API RESPONSE ERROR: '}`, err, err2);

  showAlert && errorDrop.alertWithType('error', 'Error', err);
}
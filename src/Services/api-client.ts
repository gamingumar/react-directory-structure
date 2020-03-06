/*
 * File: api-client.ts
 * Project: GU RN Starter Kit
 * File Created: Thursday, 27th February 2020 1:52:40 am
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Saturday, 7th March 2020 12:12:41 am
 * -----
 * Copyright 2019 - 2020 WhileGeek, https://umar.tech
 */

import { create } from "apisauce";
import { log } from "../Lib";
import { Config } from "../Config";
import { logoutGlobal, getGlobalUser } from "./GlobalService";
import Reactotron from 'reactotron-react-js'


export interface IApiData {
  data?: object;
  errors?: Array<string>;
}

export interface IApiResponse {
  data: IApiData | any;
  status: number;
  ok: boolean;
  hasError: boolean;
}

 /**
 * GU Api Response Class
 */
export class ApiResponse implements IApiResponse {
  
  hasError: boolean;
  data: IApiData;
  status: number;
  ok: boolean;
  
  
  constructor(hasError:boolean = false, response:IApiResponse) {
    // const errorsList = getErrorsList(response);

    

    const { data } = response;
    this.hasError = hasError;
    this.data = data;
    this.ok = !hasError;
    // this.errors = errorsList[0];
    // this.errorCodes = errorsList[1];
    this.status = response.status;
  }
}


 /**
 * APP API Client
 */
const ApiClient = () => {

  log('creating api client...')
  let user = getGlobalUser();
  let userToken = user ? user.id : '';


  let api = create({
    baseURL: Config.API_URL,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `bearer ${userToken}`
    },
    timeout: 60000
  });

  if (__DEV__) {
    api.addMonitor(Reactotron.apisauce)
  }
  
  // api.addRequestTransform(request => {
  //   request.data.client_id = `${DeviceInfo.getUniqueId()}`
  //   // request.data = qs.stringify(request.data)

  //   log('API CLIENT is: ', request)
  // })

  return api;
};
/**
 * API POST
 */
export const ApiPost = async (url = "", data = {}):Promise<IApiResponse> => {
  log("api post: ", url);

  const response = await ApiClient().post(url, {...data});

  log("POST Response before parse: ", response);

  _logoutOnError(response.status)

  // return validateResponse(response, url, data, "post");
  return parseResponse(response);
};

const _logoutOnError = (errorCode = 0) => {
  if (Config.LOGOUT_STATUS_LIST.includes(errorCode)) {
    log(`LOGGING OUT GLOBAL due to ${errorCode} GET 🚪`)
    logoutGlobal();
  }
}

/**
 * GU API Get Request
 *
 * @typedef {ApiResponse}
 *
 */
export const ApiGet = async (url = "", data = {}) => {
  log("api get: ", url);

  const response = await ApiClient().get(url, {...data });

  log("GET Response before parse: ", response);

  _logoutOnError(response.status)

  return parseResponse(response);
};

/**
 * GU API DELETE Request
 *
 */
export const ApiDelete = async (url = "", data = {}) => {
  log("api delete: ", url, data);

  const response = await ApiClient().delete(url, data, { data });

  log("DELETE Response before parse: ", response);

  return parseResponse(response);
};


/**
 * GU API PATCH Request
 *
 */
export const ApiPatch = async (url = "", data = {}) => {
  log("api patch: ", url, data);

  const response = await ApiClient().patch(url, { ...data });

  log("PATCH Response before parse: ", response);

  return parseResponse(response);
};


/**
 * Parse each API response in ApiResponse format
 *
 * @param {Object} response
 */
const parseResponse = (response:IApiResponse|any):Promise<IApiResponse> => {
  if (response.ok) {
    log("response ok: ", response);
    return Promise.resolve(new ApiResponse(false, response));
  }
  // error response
  return new Promise(resolve => {
    // if connected
    // _status
    // _errors
    // if no connection
    // problem
    // NETWORK_ERROR
    resolve(new ApiResponse(true, response));
  });
};
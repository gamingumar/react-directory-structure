/*
 * File: DropDownAlertHolder.tsx
 * Project: GU RN Starter Kit
 * File Created: Monday, 16th December 2019 11:11:16 pm
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Friday, 28th February 2020 12:40:19 am
 * -----
 * Copyright 2019 - 2020 WhileGeek, https://umar.tech
 */
import DropdownAlert from 'react-native-dropdownalert';

// import DropdownAlert from 'react-native-dropdownalert';

export type DropdownAlertType =
  | 'info'
  | 'warn'
  | 'error'
  | 'custom'
  | 'success';

interface IDropdownAlert {
  alertWithType(
    type: DropdownAlertType,
    title: string,
    message: string,
    payload?: object,
    interval?: number,
  ): void;
}

export class DropDownAlertHolder {
  static dropDown: IDropdownAlert;
  static setDropDown(dropDown: IDropdownAlert) {
    this.dropDown = dropDown;
  }
  static getDropDown() {
    return this.dropDown;
  }
}

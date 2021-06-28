/*
 * File: DropDownAlertHolder.tsx
 * Project: https://github.com/gamingumar/react-directory-structure
 * File Created: Monday, 16th December 2019 11:11:16 pm
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Tuesday, 29th June 2021 12:08:11 am
 * -----
 * Copyright 2019 - 2021 WhileGeek, https://umar.tech
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

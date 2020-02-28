/*
 * File: ReactotronConfig.ts
 * Project: GU RN Starter Kit
 * File Created: Saturday, 14th December 2019 1:11:43 am
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Friday, 28th February 2020 7:06:14 pm
 * -----
 * Copyright 2019 - 2020 WhileGeek, https://gamingumar.com
 */

import {AsyncStorage} from "react-native";
import apisaucePlugin from 'reactotron-apisauce'
import Reactotron, {
  trackGlobalErrors,
  // openInEditor
} from "reactotron-react-js";
import { log } from "../Lib";

Reactotron.clear();



Reactotron.configure() // controls connection & communication settings
  .use(
    trackGlobalErrors({
      veto: frame => frame.fileName.indexOf("/node_modules/react-native/") >= 0
    })
  )
  .use(apisaucePlugin({
    // ignoreContentTypes: /^(image)\/.*$/i   // <--- a way to skip printing the body of some requests (default is any image)
  }))
  // .use(openInEditor())
  .connect(); // let's connect!





// console.tron = Reactotron;
// reactotron.send('asyncStorage.values.change', { preview: `${method}(${arg})`, value: valuesToSend } );

AsyncStorage.getAllKeys(async (err, keys) => {
  await AsyncStorage.multiGet(keys, (error, stores) => {
    log('ASYNC STORAGE KEYS 🔑:', keys)
    stores.map((result, i, store) => {
      let d = store[i][1];
      try {
        d = JSON.parse(store[i][1]);
      } catch (e) { }
      Reactotron.logImportant(`[AsyncStorage]: ${[store[i][0]]}`, d);
      // Reactotron.log({ [store[i][0]]: d });
      return true;
    });
  });
});
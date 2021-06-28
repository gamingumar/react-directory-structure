/*
 * File: useImagePicker.tsx
 * Project: https://github.com/gamingumar/react-directory-structure
 * File Created: Monday, 28th June 2021 9:45:19 pm
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Tuesday, 29th June 2021 12:08:12 am
 * -----
 * Copyright 2019 - 2021 WhileGeek, https://umar.tech
 */

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Alert } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from 'expo-image-manipulator';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { getGlobalUser } from '../Services/GlobalService';
import { is_ios, log } from '../Lib';
import { IUser } from '../Services/Interfaces/AppInterface';
import { AuthApi } from '../Services/API/AuthApi';
import { handleApiError } from '../Lib/ErrorHandling';

export default function useImagePicker() {

  // const { user } = useContext(AppContext);

  const [loading, setLoading] = useState(false);

  // const {userLoginObj} = useUserProfile()

  const userLoginObj = getGlobalUser()

  const [image, setImage] = useState<undefined|null|string>(userLoginObj ? userLoginObj.user?.photo : '');

  useEffect(() => {
    if (userLoginObj) {
      const userAcc = userLoginObj.user;
      setImage((userAcc.photo && userAcc.photo !== '') ? userAcc.photo : '')
    }
  }, [userLoginObj?.user?.photo])
  
  const { showActionSheetWithOptions } = useActionSheet();

  useEffect(() => {
    (async () => {
      if (is_ios) {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }

      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
      }
    })();
  }, []);

  const __pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
    });

    log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const __openCamera = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 0.1,
      });

      log(result);

      if (!result.cancelled) {
        setImage(result.uri);
      }
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  const chooseImageSource = () => {
    const options = ["Open Camera", "Pick Image from Gallery", "Cancel"];
    const destructiveButtonIndex = 2;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (buttonIndex) => {
        // Do something here depending on the button index selected
        switch (buttonIndex) {
          case 0:
            __openCamera();
            break;
          case 1:
            __pickImage();
            break;
        }
      }
    );
  };
  
  let userObj:IUser | null = null;
  if (userLoginObj && userLoginObj.user) {
    userObj = userLoginObj.user;
  }

  const _uploadImage = async () => {
    if (!userObj) {
      return null;
    }

    // no need to upload if nothing changed
    if (!image || userObj.photo === image) return false;

    log("image is: ", image, userObj.photo);

    let uploadError = true;

    setLoading(true)

    try {

      let uri: any = image;

      const img = await ImageManipulator.manipulateAsync(
        image,
        [{resize: {width: 500}}],
        { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
      );

      uri = img.uri;
      
      let data = new FormData();

      data.append("file", {
        //@ts-ignore
        name: uri,
        type: "image/png",
        uri: uri, // is_android ? uri : uri.replace("file://", ""),
      });

      const response = await AuthApi.UploadAvatar(data);
      if (response.hasError) {
        handleApiError(response, "profile-image");
      } else {
        // ? success
        uploadError = false;
        log("Pic Upload SUCCESS: ", response);
      }
    } catch (e) {
      log("Pic upload Error: ", e.message);
    }
    setLoading(false)
    return uploadError;
  };

  return {chooseImageSource, image, uploadImage: _uploadImage, imageLoading:loading}
}

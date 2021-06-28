/*
 * File: SignInScreen.tsx
 * Project: https://github.com/gamingumar/react-directory-structure
 * File Created: Monday, 16th December 2019 11:30:34 pm
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Tuesday, 29th June 2021 12:08:12 am
 * -----
 * Copyright 2019 - 2021 WhileGeek, https://umar.tech
 */

import React, { useState, useContext, useEffect } from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextInput, Button, Subheading, Title } from "react-native-paper";
import { Text } from "../../Components/Text";
import { Image } from "../../Components/Image";
import { Images } from "../../Themes/Images";
import { Colors } from "../../Themes/Colors";
import { vs, s, ms } from "react-native-size-matters";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from '@react-navigation/native';
import { log, showAlert } from "../../Lib";
import { Loader } from "../../Components/Loader";
import { DropDownAlertHolder, DropdownAlertType } from "../../Components/DropDownAlertHolder";
import { AppContext } from "../../Services/AppContext";
import { Config } from "../../Config";
import { useScreenOrientation } from "../../Hooks";
import { handleApiError, handleCatchError } from "../../Lib/ErrorHandling";
import { ApiResponse } from "../../Services/api-client";
import { SafeContainer } from "../../Components/SafeContainer";
import { RouteKeys } from "../../Navigation/RouteKeys";
import { AuthApi } from "../../Services/API/AuthApi";
import { ILoginResponse } from "../../Services/Interfaces/AuthInterface";

const INITIAL_VALUES = {
  email: Config.DEMO_EMAIL,
  password: Config.DEMO_PASSWORD,
};

const yupValidation = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email Required"),
  password: Yup.string().required("Password required"),
});

type dataType = keyof typeof INITIAL_VALUES;

export const SignInScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const { user, updateUser } = useContext(AppContext);

  const { width, height } = useScreenOrientation();

  const { navigate } = useNavigation();

  useEffect(() => {
    // ? navigate on login success
    if (user) navigate(Config.FIRST_SCREEN)
    
  }, [loading])

  let passwordInputRef = React.createRef();

  const notify = DropDownAlertHolder.getDropDown();

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: yupValidation,
    onSubmit: async values => {
      setLoading(true);

      const { email, password } = values;
      const response = await AuthApi.Login(
        email,
        password,
      );

      let message = "Something went wrong";
      let alertType: DropdownAlertType = "error";

      try {
        if (response.hasError) {
          // handleApiError(response, "SIGN IN SCREEN: ");
          if (response.status === 401) {
            message = "Invalid email or password.";
          }
        } else {
          // ? Account creation success
          log("LOGIN SUCCESS: ", response);
          message = "Logged in!";
          alertType = "success";


          // let newUser: ILoginResponse = response.data;

          // newUser.ttl =
          //   new Date().getTime() + Config.LOGOUT_AFTER_MINUTES * 60 * 1000;

          updateUser(response.data);
          // navigation.navigate(RouteKeys.SignIn);
        }
      } catch (e) {
        // handleCatchError(e);
        message = e.message;
      }

      notify.alertWithType(alertType, message, "");

      setLoading(false);
      if (!response.hasError) {
        navigate(RouteKeys.SignIn);
      }
    }
  });

  const _onSubmit = () => {
    formik.handleSubmit();
  };

  const {
    values,
    touched,
    errors,
    setFieldTouched,
    setFieldValue
  } = formik;

  const _onBlur = (key: string) => {
    setFieldTouched(key);
  };
  const _onError = (key: dataType) => {
    return touched[key] && !!errors[key];
  };

  // Default input props for each text input
  const _getInputProps = (key: dataType): any => {
    return {
      value: values[key],
      error: _onError(key),
      // onChangeText: setFieldValue(key, value),
      onBlur: () => _onBlur(key),
      returnKeyType: "next",
      mode: "outlined"
    };
  };



  return (
    <SafeContainer>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View style={{ alignItems: "center", padding: vs(15) }}>
            {/* <Image
              source={Images.Logo}
              style={{height: height / 10}}
              resizeMode="contain"
            /> */}
            <Title>Login</Title>
          </View>

          <View style={{ marginVertical: height / 15 }}>
          <TextInput
              label="Email"
              onChangeText={v => setFieldValue("email", v)}
              {..._getInputProps("email")}
              keyboardType="email-address"
              textContentType="username"
              autoCapitalize="none"
              autoCompleteType="email"
              returnKeyType="next"
              onSubmitEditing={
                //@ts-ignore
                () => passwordInputRef?.focus()}
            />

            <View style={{ marginVertical: vs(10) }} />

            <TextInput
              {..._getInputProps("password")}
              label="Password"
              onChangeText={v => setFieldValue("password", v)}
              ref={(ref: typeof passwordInputRef) => (passwordInputRef = ref)}
              autoCompleteType="password"
              secureTextEntry
              returnKeyLabel={"go"}
              returnKeyType={"go"}
              onSubmitEditing={_onSubmit}
            />
          </View>

          <Button loading={loading} disabled={loading} mode="contained" onPress={_onSubmit}>
            LOGIN
          </Button>

          <View
            style={{
              // flex: 1,
              alignSelf: "flex-end",
              justifyContent: "flex-end",
              marginTop: vs(30)
            }}
          >
            <Subheading onPress={() => navigate(RouteKeys.SignUp)}>
              No account yet? Create one
            </Subheading>
          </View>
        </View>

        <Text style={{ color: Colors.grayBG, margin: vs(40) }}>
          {__DEV__ ? "DEV " : ""}
          {Config.APP_VERSION}
        </Text>

        {/* {loading && <Loader />} */}
      </KeyboardAwareScrollView>
    </SafeContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: vs(30),
    justifyContent: "space-between",
  }
});

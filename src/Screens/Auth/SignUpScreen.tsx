/*
 * File: SignUpScreen.tsx
 * Project: GU RN Starter Kit
 * File Created: Saturday, 7th March 2020 12:00:58 am
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Monday, 28th June 2021 10:30:29 pm
 * -----
 * Copyright 2019 - 2021 WhileGeek, https://umar.tech
 */

import React, { useState, useContext, useEffect } from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextInput, Text, Button, Subheading, Title } from "react-native-paper";
import { Colors } from "../../Themes/Colors";
import { vs, s, ms } from "react-native-size-matters";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from '@react-navigation/native';
import { log, showAlert, PHONE_REG_EXP } from "../../Lib";
import { Loader } from "../../Components/Loader";
import { DropDownAlertHolder } from "../../Components/DropDownAlertHolder";
import { AppContext } from "../../Services/AppContext";
import { Config } from "../../Config";
import { useScreenOrientation } from "../../Hooks";
import { handleApiError, handleCatchError } from "../../Lib/ErrorHandling";
import { ApiResponse } from "../../Services/api-client";
import { SafeContainer } from "../../Components/SafeContainer";
import { AuthApi } from "../../Services/API/AuthApi";
import { RouteKeys } from "../../Navigation/RouteKeys";
import { DropdownAlertType } from "react-native-dropdownalert";

const INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
};

const yupValidation = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email Required"),
  password: Yup.string().required("Password required"),
  phone: Yup.string()
    .required("Phone number required.")
    .matches(PHONE_REG_EXP, "Phone number is not valid"),
  firstName: Yup.string().required("First Name required"),
  lastName: Yup.string().required("Last Name required")
});

type dataType = keyof typeof INITIAL_VALUES;

export const SignUpScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const { user, updateUser } = useContext(AppContext);

  const { width, height } = useScreenOrientation();

  const navigation = useNavigation();

  let passwordInputRef = React.createRef();

  const notify = DropDownAlertHolder.getDropDown();

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: yupValidation,
    onSubmit: async values => {
      setLoading(true);

      const { firstName, lastName, email, phone, password } = values;
      const response = await AuthApi.Register(
        {
          fullName: firstName + " " + lastName,
          email,
          username: '',
          password,
        }
      );

      let message = "Something went wrong";
      let alertType: DropdownAlertType = "error";

      try {
        if (response.hasError) {
          // handleApiError(response, "SIGN UP SCREEN: ");
          if (response.status === 422) {
            message = "Account with same email already exists.";
          }
        } else {
          // ? Account creation success
          log("REGISTER SUCCESS: ", response);
          message = "Account created!";
          alertType = "success";
          // navigation.navigate(RouteKeys.SignIn);
        }
      } catch (e) {
        // handleCatchError(e);
        message = e.message;
      }

      notify.alertWithType(alertType, message, "");

      setLoading(false);
      if (!response.hasError) {
        navigation.navigate(RouteKeys.SignIn);
      }
    }
  });

  const _onSubmit = () => {
    formik.handleSubmit();
  };

  const {
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    handleSubmit,
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
            <Title>Create Account</Title>
          </View>

          <View style={{ marginVertical: height / 15 }}>
            <TextInput
              label="First Name"
              onChangeText={e => setFieldValue("firstName", e)}
              {..._getInputProps("firstName")}
            />

            <TextInput
              label="Last Name"
              onChangeText={v => setFieldValue("lastName", v)}
              {..._getInputProps("lastName")}
            />

            <TextInput
              label="Email"
              onChangeText={v => setFieldValue("email", v)}
              {..._getInputProps("email")}
              keyboardType="email-address"
              textContentType="username"
              autoCapitalize="none"
              // autoCompleteType="email"
              returnKeyType="next"
            />

            <TextInput
              label="Phone Number"
              onChangeText={v => setFieldValue("phone", v)}
              {..._getInputProps("phone")}
            />

            <View style={{ marginVertical: vs(10) }} />

            <TextInput
              {..._getInputProps("password")}
              label="Password"
              onChangeText={v => setFieldValue("password", v)}
              ref={(ref: typeof passwordInputRef) => (passwordInputRef = ref)}
              // autoCompleteType="password"
              secureTextEntry
              returnKeyLabel={"go"}
              returnKeyType={"go"}
              onSubmitEditing={_onSubmit}
            />
          </View>

          <Button
            disabled={loading}
            loading={loading}
            mode="contained"
            onPress={_onSubmit}
          >
            CREATE ACCOUNT
          </Button>

          <View
            style={{
              // flex: 1,
              alignSelf: "flex-end",
              justifyContent: "flex-end",
              marginTop: vs(30)
            }}
          >
            <Subheading onPress={() => navigation.goBack(null)}>
              Already have an account? SIGN IN
            </Subheading>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: vs(30),
    justifyContent: "space-between"
  }
});

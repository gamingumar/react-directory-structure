/*
 * File: SignInScreen.tsx
 * Project: GU RN Starter Kit
 * File Created: Monday, 16th December 2019 11:30:34 pm
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Thursday, 27th February 2020 8:52:44 pm
 * -----
 * Copyright 2019 - 2020 WhileGeek, https://umar.tech
 */

import React, { useState, useContext, useEffect } from "react";
import { View, StatusBar, Alert, StyleSheet } from "react-native";
import { TextInput, Button, Subheading } from "react-native-paper";
import { Text } from "../Components/Text";
import { Image } from "../Components/Image";
import { Images } from "../Themes/Images";
import { Colors } from "../Themes/Colors";
import { vs, s, ms } from "react-native-size-matters";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "react-navigation-hooks";
import { log } from "../Lib";
import { Loader } from "../Components/Loader";
import { DropDownAlertHolder } from "../Components/DropDownAlertHolder";
import { AppContext } from "../Context/AppContext";
import { Config } from "../Config";
import { useScreenOrientation } from "../Hooks";
import { handleApiError, handleCatchError } from "../Lib/ErrorHandling";
import { ApiResponse } from "../Services";
import { SafeContainer } from "../Components/SafeContainer";

export const SignInScreen: React.FC = () => {
  const [email, setEmail] = useState(Config.DEMO_EMAIL);
  const [pass, setPass] = useState(Config.DEMO_PASSWORD);
  const [loading, setLoading] = useState(false);

  const { user, updateUser } = useContext(AppContext);

  const { width, height } = useScreenOrientation();

  const { navigate } = useNavigation();

  useEffect(() => {
    if (user && user.api_token) {
      // navigate(RouteKeys.Home);
    }
  }, [user]);

  let passwordInputRef = React.createRef();

  const d = DropDownAlertHolder.getDropDown();

  const _login = async () => {
    if (email === "" || pass === "") {
      d.alertWithType("info", "Email and Password required to login", "");
      return;
    }

    setLoading(true);

    try {
      const response = new ApiResponse(false, {}); // await UserService.Login(email, pass);

      log("response in login screen: ", response);

      if (response.hasError) {
        handleApiError(response);
      } else {
        d.alertWithType("success", "Login success", "Welcome");

        updateUser(response.data);
      }
    } catch (e) {
      handleCatchError(e);
    }

    setLoading(false);
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
          </View>

          <View style={{ marginVertical: height / 15 }}>
            <TextInput
              value={email}
              label="Email"
              onChangeText={setEmail}
              // title="Email"
              keyboardType="email-address"
              textContentType="username"
              autoCapitalize="none"
              autoCompleteType="email"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.focus()}
            />

            <View style={{ marginVertical: vs(10) }} />

            <TextInput
              value={pass}
              onChangeText={setPass}
              label="Password"
              ref={(ref: typeof passwordInputRef) => (passwordInputRef = ref)}
              textContentType="password"
              autoCompleteType="password"
              secureTextEntry
              onSubmitEditing={_login}
              returnKeyLabel={"go"}
              returnKeyType={"go"}
            />
          </View>

          <Button mode="contained" onPress={_login}>
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
            <Subheading onPress={() => Alert.alert("wait for it!")}>
              Forgot Password?
            </Subheading>
          </View>
        </View>

        <Text style={{ color: Colors.grayBG, margin: vs(40) }}>
          {__DEV__ ? "DEV " : ""}
          {Config.APP_VERSION}
        </Text>

        {loading && <Loader />}
      </KeyboardAwareScrollView>
    </SafeContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: s(30),
    justifyContent: "space-between"
  }
});
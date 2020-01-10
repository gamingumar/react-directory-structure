
import React, {useState, useContext, useEffect} from 'react';
import {View, StatusBar, Alert, TextInput, TouchableOpacity} from 'react-native';
import {Text} from '../Components/Text';
import {Image} from '../Components/Image';
import {Images} from '../Themes/Images';
import {Colors} from '../Themes/Colors';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from 'react-navigation-hooks';
import {log,} from '../Lib';
import {Loader} from '../Components/Loader';
import {DropDownAlertHolder} from '../Components/DropDownAlertHolder';
import {AppContext} from '../Context/AppContext';
import {Config} from '../Config';
import {useScreenOrientation} from '../Hooks';
import { handleApiError, handleCatchError } from '../Lib/ErrorHandling';
import { ApiResponse } from '../Services';

export const SignInScreen: React.FC = () => {
  const [email, setEmail] = useState(Config.DEMO_EMAIL);
  const [pass, setPass] = useState(Config.DEMO_PASSWORD);
  const [loading, setLoading] = useState(false);

  const {user, updateUser} = useContext(AppContext);

  const {width, height} = useScreenOrientation();

  const {navigate} = useNavigation();

  useEffect(() => {
    if (user && user.api_token) {
      // navigate(RouteKeys.Home);
    }
  }, [user]);

  let passwordInputRef = React.createRef();

  const d = DropDownAlertHolder.getDropDown();

  const _login = async () => {

    if (email === '' || pass === '') {
      d.alertWithType('info', 'Email and Password required to login', '');
      return;
    }

    setLoading(true);

    try {
      const response = new ApiResponse(false, {});// await UserService.Login(email, pass);

      log('response in login screen: ', response);
  
      if (response.hasError) {
        handleApiError(response)
      } else {
        d.alertWithType('success', 'Login success', 'Welcome');
  
        updateUser(response.data)
      }
    } catch(e) {
      handleCatchError(e)
    }

    setLoading(false);
  };

  return (
    <View style={[styles.outerContainer]}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View style={{alignItems: 'center', padding: verticalScale(15)}}>
            <Image
              source={Images.Logo}
              style={{height: height / 10}}
              resizeMode="contain"
            />
          </View>

          <View style={{marginVertical: height / 15}}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              // title="Email"
              keyboardType="email-address"
              textContentType="username"
              autoCapitalize="none"
              autoCompleteType="email"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.focus()}
            />

            <TextInput
              value={pass}
              onChangeText={setPass}
              // title="Password"
              ref={(ref: typeof passwordInputRef) => (passwordInputRef = ref)}
              textContentType="password"
              autoCompleteType="password"
              secureTextEntry
              onSubmitEditing={_login}
              returnKeyLabel={'go'}
              returnKeyType={'go'}
            />

            {/* <View style={{marginVertical: verticalScale(10)}} /> */}
          </View>

          <TouchableOpacity onPress={_login}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              // flex: 1,
              alignSelf: 'flex-end',
              justifyContent: 'flex-end',
              marginTop: verticalScale(30),
            }}>
            <Text
              style={styles.buttonText}
              onPress={() => Alert.alert('wait for it!')}>
              {/* Forgot Password? */}
            </Text>
          </View>
        </View>

        <Text style={{color: Colors.grayBG, margin: verticalScale(40)}}>
          {__DEV__ ? 'DEV ' : ''}
          {Config.APP_VERSION}
        </Text>

        {loading && <Loader />}
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = ScaledSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    // height: SCREEN_HEIGHT,
    padding: '30@s',
    // alignItems: "stretch",
    justifyContent: 'space-between',
    // backgroundColor: 'green',
  },
  button: {
    // marginVertical: "20@s",
    padding: '14@ms',

    borderColor: Colors.grayBG,
    borderWidth: 1,

    alignItems: 'center',
  },
  buttonText: {
    color: Colors.grayBG,
    fontSize: '14@ms',
  },
});

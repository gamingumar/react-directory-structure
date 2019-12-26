# react-directory-structure
An opinionated React Native / React boilerplate for starting new Project.

- React Native App directory structure with some basic boilerplate including some reusable components and context setup.
- I use this to start new React Native project and similar structure can also be followed in React Web Projects.
- Browse through the src/ folder 

## Features
- Context API
- Components / Screens
- Hooks
- API Services Setup
- Config
- Library Helpful functions
- Navigation
- Assets and Themes
- Typescript
- Reactotron
- AsyncStorage

### Installation
- Update index.js with 
```
import 'react-native-gesture-handler';
import App from './src/Screens/App';
```

- Native Libs setup
Follow instructions in:
- https://github.com.cnpmjs.org/zoontek/react-native-bootsplash
- https://github.com/oblador/react-native-vector-icons

- Add logo.png in assets/images/ or remove from SignInScreen

- Edit info.plist file and add fonts
```
<key>UIAppFonts</key>
<array>
  <string>AntDesign.ttf</string>
  <string>Entypo.ttf</string>
  <string>EvilIcons.ttf</string>
  <string>Feather.ttf</string>
  <string>FontAwesome.ttf</string>
  <string>FontAwesome5_Brands.ttf</string>
  <string>FontAwesome5_Regular.ttf</string>
  <string>FontAwesome5_Solid.ttf</string>
  <string>Foundation.ttf</string>
  <string>Ionicons.ttf</string>
  <string>MaterialIcons.ttf</string>
  <string>MaterialCommunityIcons.ttf</string>
  <string>SimpleLineIcons.ttf</string>
  <string>Octicons.ttf</string>
  <string>Zocial.ttf</string>
</array>

```

```pod install```

### Recommended and Required Dependencies:

Find all dependencies in package.json file.

```
yarn add react-navigation-tabs react-native-vector-icons react-navigation-animated-switch react-native-reanimated react-native-bootsplash lodash @react-native-community/async-storage react-native-device-info react-native-dropdownalert react-native-gesture-handler react-native-keyboard-aware-scroll-view react-native-modal react-native-screens react-native-size-matters react-navigation react-navigation-hooks react-navigation-stack

yarn add -D @types/lodash reactotron-react-native @types/react-native-vector-icons

cd ios && pod install && cd ../
```


### App Icons Generators
- iOS: https://appicon.co/ OR Icon Set Creator mac app
- Android: https://romannurik.github.io/



Inspired by Ignite typescript boilerplate. https://github.com/aerian-studios/ignite-typescript-boilerplate

- https://gamingumar.com
# react-directory-structure
An opinionated React Native / React boilerplate for starting new Project.

- React Native App directory structure with some basic boilerplate including some reusable components and context setup.
- Use this to start new React Native project and similar pattern can also be followed in React Web Projects.
- Browse through the src/ folder 

## Features
- Context API
- Components / Screens
- Hooks
- API Services Setup with apisauce
- Config
- Library Helpful functions
- Navigation
- Assets and Themes
- Global error handling with notification
- Typescript
- Reactotron
- AsyncStorage

### Installation with React Native
- copy src folder and App.tsx in your React Native app.

- Update index.js with 
```
import App from './src/Screens/App';
```

#### Navigation and other Libs:

```
yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view @react-navigation/bottom-tabs @react-navigation/drawer @react-navigation/material-bottom-tabs @react-navigation/stack
```

```
yarn add yup formik qs react-native-paper apisauce react-native-vector-icons lodash @react-native-async-storage/async-storage react-native-dropdownalert react-native-keyboard-aware-scroll-view react-native-modal react-native-size-matters @expo/react-native-action-sheet expo-constants expo-file-system expo-image-manipulator expo-image-picker expo-linking expo-location expo-web-browser expo-network

yarn add -D @types/lodash reactotron-react-native @types/react-native-vector-icons

cd ios && pod install && cd ../
```

### Recommended and Required Dependencies:

Find all dependencies in package.json file.

### App Icons Generators
- iOS: https://appicon.co/ OR Icon Set Creator mac app
- Android: https://jgilfelt.github.io/AndroidAssetStudio/index.html


### Semver
https://github.com/zmnv/react-native-semver-update#readme

Inspired by Ignite typescript boilerplate. https://github.com/aerian-studios/ignite-typescript-boilerplate

- https://gamingumar.com

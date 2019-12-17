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
Follow instructions in https://github.com.cnpmjs.org/zoontek/react-native-bootsplash

- Add logo.png in assets/images/ or remove from SignInScreen


### Recommended and Required Dependencies:

Find all dependencies in package.json file.

```
yarn add react-native-vector-icons react-navigation-animated-switch react-native-reanimated react-native-bootsplash lodash @react-native-community/async-storage react-native-device-info react-native-dropdownalert react-native-gesture-handler react-native-keyboard-aware-scroll-view react-native-modal react-native-screens react-native-size-matters react-navigation react-navigation-hooks react-navigation-stack

yarn add -D @types/lodash reactotron-react-native

cd ios && pod install && cd ../
```



Inspired by Ignite typescript boilerplate. https://github.com/aerian-studios/ignite-typescript-boilerplate

- https://gamingumar.com
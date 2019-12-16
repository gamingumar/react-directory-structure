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

```
"dependencies": {
    "@react-native-community/async-storage": "^1.6.3",
    "apisauce": "^1.1.1",
    "lodash": "^4.17.15",
    "react-native-bootsplash": "^1.0.3",
    "react-native-device-info": "^5.3.1",
    "react-native-dropdownalert": "^4.2.0",
    "react-native-gesture-handler": "^1.5.2",
    "react-native-keyboard-aware-scroll-view": "^0.9.1",
    "react-native-modal": "^11.5.3",
    "react-native-reanimated": "^1.4.0",
    "react-native-screens": "^1.0.0-alpha.23",
    "react-native-size-matters": "^0.2.1",
    "react-native-vector-icons": "^6.6.0",
    "react-navigation": "^4.0.10",
    "react-navigation-drawer": "^2.3.3",
    "react-navigation-hooks": "^1.1.0",
    "react-navigation-stack": "^1.10.3",
    "react-navigation-tabs": "^2.6.0",
  }


"devDependencies": {
    "@types/lodash": "^4.14.149",
    "reactotron-react-native": "^4.0.2",
    "typescript": "^3.7.2"
  }
```

```
yarn add react-navigation-animated-switch react-native-reanimated react-native-bootsplash lodash @react-native-community/async-storage react-native-device-info react-native-dropdownalert react-native-gesture-handler react-native-keyboard-aware-scroll-view react-native-modal react-native-screens react-native-size-matters react-navigation react-navigation-hooks react-navigation-stack

yarn add -D @types/lodash reactotron-react-native

cd ios && pod install && cd ../
```



Inspired by Ignite typescript boilerplate. https://github.com/aerian-studios/ignite-typescript-boilerplate

- https://gamingumar.com
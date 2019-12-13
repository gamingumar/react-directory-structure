import { TextStyle, ViewStyle } from "react-native";
import { Colors } from "./Colors";

export const AppStyles = {
  centralize: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
  },
  shadow1: {
    shadowOpacity: 0.1,
    shadowOffset: {width: 1, height: 1},
    shadowColor: Colors.grayBG,
  }
}

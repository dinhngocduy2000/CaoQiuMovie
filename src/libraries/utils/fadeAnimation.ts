import { useRef } from "react";
import { Animated } from "react-native";

export const fadeIn = (seconds:number,fadeAnim:Animated.Value) => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: seconds,
      useNativeDriver: true,
    }).start();
  };

export const fadeOut = (seconds:number,fadeAnim:Animated.Value)=>{
    Animated.timing(fadeAnim, {
        toValue: 0,
        duration: seconds,
        useNativeDriver: true,
      }).start();
}
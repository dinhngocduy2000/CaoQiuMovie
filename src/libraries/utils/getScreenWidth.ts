import { Dimensions } from "react-native"

export const getScreenWidth=():number=>{
    return Dimensions.get("window").width
}
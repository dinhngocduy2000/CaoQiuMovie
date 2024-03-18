import { USER_DETAIL } from "../../libraries/types/user_detail";

export type ProfileStateType ={
    loading:"idle"| "loading" | "succeeded" | "failed",
    data:USER_DETAIL| null ,
}
export type ProfileParams = {sessionId:string,accessToken:string}
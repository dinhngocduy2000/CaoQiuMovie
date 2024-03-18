import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProfileParams, ProfileStateType } from "./profileSliceType";
import { USER_DETAIL } from "../../libraries/types/user_detail";
import { fetchUserDetail } from "../../apiHelper/api";
const initialProfileState : ProfileStateType={
    loading:"idle",
    data:null
}

export const fetchProfileDetailThunk = createAsyncThunk<USER_DETAIL|null,ProfileParams>("profile/detail",async (data:ProfileParams) => {
    try {
        const res = await fetchUserDetail(data.sessionId,data.accessToken)
        console.log("CHECKING PROFILE THUNK: ",res);
        return res as USER_DETAIL
    } catch (error) {
        console.log(error);
        return null
    } 
})

export const profileSlice = createSlice({
    name:"profile",
    initialState:initialProfileState,
    reducers:{
        
    },
    extraReducers(builder) {
        builder.addCase(fetchProfileDetailThunk.fulfilled,(state,action)=>{
            state.loading="idle"
            state.data=action.payload
        }),
        builder.addCase(fetchProfileDetailThunk.rejected,(state)=>{
            state.loading="idle"
        })
        builder.addCase(fetchProfileDetailThunk.pending,(state)=>{
            state.loading="loading"
        })
    },
})

export default profileSlice.reducer
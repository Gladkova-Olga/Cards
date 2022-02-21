import {Dispatch} from "redux";
import {authAPI} from "../dal/api";
import {setAppStatus, SetAppStatusType, setError, SetErrorType} from "./appReducer";

type InitialStateType = typeof initialState;
type ThunkDispatch = Dispatch<ActionsProfileType>


export type SetUserDataAType = ReturnType<typeof setUserDataAC>
export type UpdateUserDataAType = ReturnType<typeof updateUserDataAC>

type ActionsProfileType = SetUserDataAType | UpdateUserDataAType | SetAppStatusType | SetErrorType

const initialState = {
    _id: "",
    name: "",
    publicCardPacksCount: 0,
    avatar: ""
};

export const profileReducer = (state: InitialStateType = initialState, action: ActionsProfileType): InitialStateType => {
    switch (action.type) {
        case "PROFILE/SET-USER-DATA": {
            return {
                ...state, _id: action._id, name: action.name,
                publicCardPacksCount: action.publicCardPacksCount, avatar: action.avatar
            }
        }
        case "PROFILE/UPDATE-USER-DATA": {
            return {
                ...state, name: action.name, avatar: action.avatar
            }
        }
        default: {
            return state
        }
    }
}

export const setUserDataAC = (_id: string, name: string, publicCardPacksCount: number, avatar: string) => ({
    type: "PROFILE/SET-USER-DATA",
    _id, name, publicCardPacksCount, avatar
} as const)

export const updateUserDataAC = (name: string, avatar: string) => ({
    type: "PROFILE/UPDATE-USER-DATA",
    name, avatar
} as const)


export const setUserData = () => {
    return async (dispatch: ThunkDispatch) => {
        dispatch(setAppStatus('loading'));
        try {
            const res = await authAPI.me();
            dispatch(setUserDataAC(res.data._id, res.data.name, res.data.publicCardPacksCount,
                res.data.avatar ? res.data.avatar : ""))
            dispatch(setAppStatus('idle'));
        } catch (e: any) {
            const error = e.response ? e.response.data.error : "Some unknown mistake";
            dispatch(setError(error));
            dispatch(setAppStatus('idle'));
        }
    }
}
export const updateUserData = (name: string, avatar: string) => {
    return async (dispatch: ThunkDispatch) => {
        dispatch(setAppStatus('loading'));
        try {
            const res = await authAPI.updateUserData(name, avatar);
            dispatch(setUserDataAC(res.data.updatedUser._id, res.data.updatedUser.name,
                res.data.updatedUser.publicCardPacksCount, res.data.updatedUser.avatar ? res.data.updatedUser.avatar : ""));
            dispatch(setAppStatus('idle'));
        } catch (e: any) {
            const error = e.response ? e.response.data.error : "Some unknown mistake";
            dispatch(setError(error));
            dispatch(setAppStatus('idle'));
        }
    }
}
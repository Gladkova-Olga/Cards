import {Dispatch} from "redux";
import {authAPI} from "../dal/api";
import {setAppStatus, SetAppStatusType, setError, SetErrorType} from "./appReducer";

type InitialStateType = typeof initialState;
type ThunkDispatch = Dispatch<ActionsNewPasswordType>

type CompleteRequestType = ReturnType<typeof completeRequest>
type SetButtonDisabled = ReturnType<typeof setButtonDisabled>
type ActionsNewPasswordType = CompleteRequestType | SetButtonDisabled | SetAppStatusType | SetErrorType

const initialState = {
    isRequestSuccess: false,
    isButtonDisabled: false
};

export const enterNewPasswordReducer = (state: InitialStateType = initialState, action: ActionsNewPasswordType): InitialStateType =>{
    switch (action.type) {
        case "ENTER-NEW-PASSWORD/COMPLETED-REQUEST": {
            return {...state, isRequestSuccess: action.isRequestSuccess}
        }
        case "ENTER-NEW-PASSWORD/SET-BUTTON-DISABLED": {
            return {...state, isButtonDisabled: action.isButtonDisabled}
        }
        default: {
            return state
        }
    }
}

const completeRequest = (isRequestSuccess: boolean) => {
    return ({
        type: "ENTER-NEW-PASSWORD/COMPLETED-REQUEST",
        isRequestSuccess
    } as const)
}

const setButtonDisabled = (isButtonDisabled: boolean) => {
    return ({
        type: "ENTER-NEW-PASSWORD/SET-BUTTON-DISABLED",
        isButtonDisabled
    } as const)
}

export const setNewPassword = (password: string, token: string) => {
    return async (dispatch: ThunkDispatch) => {
        dispatch(setAppStatus('loading'));
        dispatch(setButtonDisabled(true));
        try {
            await authAPI.setNewPassword(password, token);
            dispatch(completeRequest(true));
            dispatch(setButtonDisabled(false));
            dispatch(setAppStatus('idle'));
        }
        catch (e:any) {
            dispatch(completeRequest(false));
            const error = e.response ? e.response.data.error : "Some unknown mistake";
            dispatch(setError(error));
            dispatch(setButtonDisabled(false));
            dispatch(setAppStatus('idle'));
        }
    }
}
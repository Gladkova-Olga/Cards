import {Dispatch} from "redux";
import {authAPI} from "../dal/api";
import {setAppStatus, SetAppStatusType, setError, SetErrorType} from "./appReducer";

type InitialStateType = typeof initialState;
type ThunkDispatch = Dispatch<ActionsRestorePasswordType>

type CompleteRequestType = ReturnType<typeof completeRequest>
type SetButtonDisabled = ReturnType<typeof setButtonDisabled>
type ActionsRestorePasswordType =  CompleteRequestType | SetButtonDisabled | SetAppStatusType | SetErrorType

const initialState = {
    isRequestSuccess: false,
    isButtonDisabled: false
};

export const restorePasswordReducer =
    (state: InitialStateType = initialState, action: ActionsRestorePasswordType): InitialStateType => {
    switch (action.type) {
        case "RESTORE-PASSWORD/COMPLETED-REQUEST": {
            return {...state, isRequestSuccess: action.isRequestSuccess}
        }
        case "RESTORE-PASSWORD/SET-BUTTON-DISABLED": {
            return {...state, isButtonDisabled: action.isButtonDisabled}
        }
        default: {
            return state
        }
    }
}

const completeRequest = (isRequestSuccess: boolean) => {
    return ({
        type: "RESTORE-PASSWORD/COMPLETED-REQUEST",
        isRequestSuccess
    } as const)
}

const setButtonDisabled = (isButtonDisabled: boolean) => {
    return ({
        type: "RESTORE-PASSWORD/SET-BUTTON-DISABLED",
        isButtonDisabled
    } as const)
}

export const restorePassword = (email: string) => {
    return async (dispatch: ThunkDispatch) => {
        dispatch(setAppStatus('loading'));
        dispatch(setButtonDisabled(true))
        try {
            await authAPI.restorePassword(email);
            dispatch(completeRequest(true));
            dispatch(setAppStatus('idle'));
        }
        catch (e:any) {
            dispatch(completeRequest(false));
            const error = e.response ? e.response.data.error : "Some unknown mistake";
            dispatch(setError(error));
            dispatch(setAppStatus('idle'));
            dispatch(setButtonDisabled(false))
        }
    }
}

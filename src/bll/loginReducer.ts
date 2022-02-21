import {Dispatch} from "redux";
import {authAPI} from "../dal/api";
import {setUserDataAC, SetUserDataAType} from "./profileReducer";
import {setAppStatus, SetAppStatusType, setError, SetErrorType} from "./appReducer";

type ThunkDispatch = Dispatch<ActionsLoginType>
type InitialStateType = typeof initialState;

type SetIsLoggedInType = ReturnType<typeof setIsLoggedIn>
type SetButtonDisabledType = ReturnType<typeof setButtonDisabled>
type ActionsLoginType = SetIsLoggedInType | SetButtonDisabledType | SetUserDataAType | SetAppStatusType | SetErrorType


const initialState = {
    isLoggedIn: false,
    isButtonDisabled: false
};

export const loginReducer = (state: InitialStateType = initialState, action: ActionsLoginType): InitialStateType => {
    switch (action.type) {
        case "LOGIN/SET-IS-LOGGED-IN": {
            return {...state, isLoggedIn: action.isLoggedIn}
        }
        case "LOGIN/SET-BUTTON-DISABLED":
            return {...state, isButtonDisabled: action.isButtonDisabled}

        default: {
            return state
        }
    }
}

export const setIsLoggedIn = (isLoggedIn: boolean) => {
    return ({
        type: "LOGIN/SET-IS-LOGGED-IN",
        isLoggedIn
    } as const)
}

const setButtonDisabled = (isButtonDisabled: boolean) => {
    return ({
        type: "LOGIN/SET-BUTTON-DISABLED",
        isButtonDisabled
    } as const)
}

export const login = (email: string, password: string, rememberMe: boolean) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setButtonDisabled(true));
        dispatch(setAppStatus('loading'));
        authAPI.login(email, password, rememberMe)
            .then(res => {
                dispatch(setIsLoggedIn(true));
                dispatch(setUserDataAC(res.data._id, res.data.name, res.data.publicCardPacksCount,
                    res.data.avatar ? res.data.avatar : ""));
                dispatch(setButtonDisabled(false));
                dispatch(setAppStatus('idle'));

            })
            .catch(e => {
                const error = e.response ? e.response.data.error : "Some unknown mistake";
                dispatch(setError(error));
                dispatch(setButtonDisabled(false));
                dispatch(setAppStatus('idle'));
            })

    }
}

export const logout = () => {
    return async (dispatch: ThunkDispatch) => {
        dispatch(setAppStatus('loading'));
        try {
            await authAPI.logout();
            dispatch(setIsLoggedIn(false));
            dispatch(setUserDataAC("", "", 0, ''));
            dispatch(setAppStatus('idle'));

        } catch (e: any) {
            const error = e.response ? e.response.data.error : "Some unknown mistake";
            dispatch(setError(error));
            dispatch(setAppStatus('idle'));
        }
    }
}

import {Dispatch} from "redux";
import {authAPI} from "../dal/api";

type ThunkDispatch = Dispatch<ActionsLoginType>
type InitialStateType = typeof initialState;

type SetIsLoggedInType = ReturnType<typeof setIsLoggedIn>
type SetButtonDisabledType = ReturnType<typeof setButtonDisabled>
type ActionsLoginType = SetIsLoggedInType | SetButtonDisabledType




const initialState = {
    isLoggedIn: false,
    isButtonDisabled: false
};

export const loginReducer = (state: InitialStateType = initialState, action: ActionsLoginType): InitialStateType =>{
    switch (action.type) {
        case "LOGIN/SET-IS-LOGGED-IN": {
            return {...state, isLoggedIn: action.isLoggedIn}
        }
        case "LOGIN/SET-BUTTON-DISABLED":
            console.log(action.isButtonDisabled)
            return {...state, isButtonDisabled: action.isButtonDisabled}

        default: {
            return state
        }
    }
}

const setIsLoggedIn = (isLoggedIn: boolean) => {
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
        authAPI.login(email, password, rememberMe)
            .then(res => {
            dispatch(setIsLoggedIn(true))

        })
            .catch(e => {
                const error = e.response ? e.response.data.error : "Some unknown mistake";
                console.log(error)
            }
            )
        setButtonDisabled(false)
    }
}

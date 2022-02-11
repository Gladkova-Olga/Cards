import {Dispatch} from "redux";
import {authAPI} from "../dal/api";

type InitialStateType = typeof initialState;
type ThunkDispatch = Dispatch<ActionsSignUpType>

type SignUpSuccessType = ReturnType<typeof signUpSuccess>
type SetButtonDisabledType = ReturnType<typeof setButtonDisabled>
type ActionsSignUpType = SignUpSuccessType | SetButtonDisabledType

const initialState = {
    isSignedUp: false,
    isButtonDisabled: false
};

export const signUpReducer = (state: InitialStateType = initialState, action: ActionsSignUpType): InitialStateType => {
    switch (action.type) {
        case "SIGN-UP/SIGNED-UP-SUCCESS": {
            return {...state, isSignedUp: action.isSignedUp}
        }
        case "SIGN-UP/SET-BUTTON-DISABLED": {
            return {...state, isButtonDisabled: action.isButtonDisabled}
        }
        default: {
            return state
        }
    }
}

const signUpSuccess = (isSignedUp: boolean) => {
    return ({
        type: "SIGN-UP/SIGNED-UP-SUCCESS",
        isSignedUp
    } as const)
}

const setButtonDisabled = (isButtonDisabled: boolean) => {
    return ({
        type: "SIGN-UP/SET-BUTTON-DISABLED",
        isButtonDisabled
    } as const)
}

export const signUp = (email: string, password: string) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setButtonDisabled(true));
        authAPI.signUp(email, password)
            .then(res => {
                dispatch(signUpSuccess(true))
            })
            .catch( e => {
                const error = e.response ? e.response.data.error : "Some unknown mistake";
                console.log(error)
                dispatch(signUpSuccess(false))
            })
            .finally(() => dispatch(setButtonDisabled(false)))



    }

}
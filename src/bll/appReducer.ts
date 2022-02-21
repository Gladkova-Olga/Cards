type StatusRequestType = 'idle' | 'loading'
export type SetAppStatusType = ReturnType<typeof setAppStatus>
export type SetErrorType = ReturnType<typeof setError>
type ActionAppType = SetAppStatusType | SetErrorType
type InitialStateType = typeof initialState;

const initialState = {
    appStatus: 0,
    error: null as null | string
}

export const appReducer = (state: InitialStateType = initialState, action: ActionAppType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-APP-STATUS": {
            if (action.statusRequest === "loading") {
                return {...state, appStatus: state.appStatus + 1}
            }
            return {...state, appStatus: state.appStatus - 1}

        }
        case "APP/SET-ERROR": {
            return {...state, error: action.error}
        }
        default: {
            return state
        }
    }
}

export const setAppStatus = (statusRequest: StatusRequestType) => {
    return ({
        type: "APP/SET-APP-STATUS",
        statusRequest
    } as const)
}
export const setError = (error: null | string) => {
    return({
        type: "APP/SET-ERROR",
        error
    } as const)
}



type InitialStateType = typeof initialState;
type ActionsType = {
    type: string
}

const initialState = {

};

export const registrationReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType =>{
    switch (action.type) {
        case "": {
            return state
        }
        default: {
            return state
        }
    }
}
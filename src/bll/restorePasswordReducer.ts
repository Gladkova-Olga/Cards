
type InitialStateType = typeof initialState;
type ActionsType = {
    type: string
}

const initialState = {

};

export const restorePasswordReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType =>{
    switch (action.type) {
        case "": {
            return state
        }
        default: {
            return state
        }
    }
}
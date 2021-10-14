
type InitialStateType = typeof initialState;
type ActionsType = {
    type: string
}

const initialState = {
    login: "",
};

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType =>{
    switch (action.type) {
        case "": {
            return state
        }
        default: {
            return state
        }
    }
}
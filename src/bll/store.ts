import {combineReducers, createStore} from "redux";
import {loginReducer} from "./loginReducer";
import {enterNewPasswordReducer} from "./enterNewPasswordReducer";
import {profileReducer} from "./profileReducer";
import {restorePasswordReducer} from "./restorePasswordReducer";
import {registrationReducer} from "./registrationReducer";


const reducers = combineReducers({
    login: loginReducer,
    enterNewPassword: enterNewPasswordReducer,
    profile: profileReducer,
    restorePassword: restorePasswordReducer,
    registration: registrationReducer
})

const store = createStore(reducers)

export default store

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store // for dev
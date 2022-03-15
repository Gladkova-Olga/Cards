import {applyMiddleware, combineReducers, createStore} from "redux";
import {loginReducer} from "./loginReducer";
import {enterNewPasswordReducer} from "./enterNewPasswordReducer";
import {profileReducer} from "./profileReducer";
import {restorePasswordReducer} from "./restorePasswordReducer";
import {signUpReducer} from "./signUpReducer";
import thunkMiddleware from "redux-thunk";
import {appReducer} from "./appReducer";
import {packsReducer} from "./packsReducer";
import {cardsReducer} from "./cardsReducer";
import {learnReducer} from "./learnReducer";


const reducers = combineReducers({
    app: appReducer,
    login: loginReducer,
    enterNewPassword: enterNewPasswordReducer,
    profile: profileReducer,
    restorePassword: restorePasswordReducer,
    signUp: signUpReducer,
    packs: packsReducer,
    cards: cardsReducer,
    learn: learnReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

export default store

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store // for dev
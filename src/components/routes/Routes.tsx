import React from 'react'
import {Redirect, Route, Switch} from "react-router-dom";
import EnterNewPassword from "../enterNewPassword/EnterNewPassword";
import Login from "../login/Login";
import Profile from "../profile/Profile";
import SignUp from "../signUp/SignUp";
import RestorePassword from "../restorePassword/RestorePassword";
import Test from "../test/Test";
import Error404 from "../error404/Error404";

export const PATH = {
    ENTER_NEW_PASSWORD: '/enter-new-password',
    LOGIN: '/login',
    PROFILE: '/profile',
    SIGN_UP: '/sign-up',
    RESTORE_PASSWORD: '/restore-password',
    TEST: '/test',
}

function Routes() {
    return (
        <div>
            <Switch>
                <Route path={'/'} exact render={() => <Redirect to={PATH.LOGIN}/>}/>
                <Route path={PATH.ENTER_NEW_PASSWORD} render={() => <EnterNewPassword/>}/>
                <Route path={PATH.LOGIN} render={() => <Login/>}/>
                <Route path={PATH.PROFILE} render={() => <Profile/>}/>
                <Route path={PATH.SIGN_UP} render={() => <SignUp/>}/>
                <Route path={PATH.RESTORE_PASSWORD} render={() => <RestorePassword/>}/>
                <Route path={PATH.TEST} render={() => <Test/>}/>
                <Route render={() => <Error404/>}/>

            </Switch>
        </div>
    )
}

export default Routes;
import React from 'react'
import {Redirect, Route, Switch} from "react-router-dom";
import EnterNewPassword from "../enterNewPassword/EnterNewPassword";
import Login from "../login/Login";
import Profile from "../profile/Profile";
import SignUp from "../signUp/SignUp";
import RestorePassword from "../restorePassword/RestorePassword";
import Error404 from "../error404/Error404";
import Packs from "../packs/Packs";
import Cards from '../cards/Cards';
import Learn from "../learn/Learn";
import Users from "../users/Users";


export const PATH = {
    ENTER_NEW_PASSWORD: '/enter-new-password/:token',
    LOGIN: '/login',
    PROFILE: '/profile',
    SIGN_UP: '/sign-up',
    RESTORE_PASSWORD: '/restore-password',
    PACKS: '/packs',
    CARDS:'/cards/:cardsPack_id',
    LEARN:'/learn/:cardsPack_id',
    USERS: '/users',
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
                <Route path={PATH.PACKS} render={() => <Packs/>}/>
                <Route path={PATH.CARDS} render={() => <Cards/>}/>
                <Route path={PATH.LEARN} render={() => <Learn/>}/>
                <Route path={PATH.USERS} render={() => <Users/>}/>
                <Route render={() => <Error404/>}/>

            </Switch>
        </div>
    )
}

export default Routes;
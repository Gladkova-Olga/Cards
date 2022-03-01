import React from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import style from './Header.module.css'
import {PATH} from "../routes/Routes";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store";
import {logout, setIsLoggedIn} from "../../bll/loginReducer";
import Button from "../common/button/Button";

function Header() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn)
    const history = useHistory()
    const onCLickLogoutHandler = () => {
        dispatch(logout());
        dispatch(setIsLoggedIn(false))
        history.push(PATH.LOGIN)

    }
    return (
        <div className={style.headerBlock}>
            <nav className={style.nav}>
                {!isLoggedIn && <div className = {style.item}>
                    <NavLink to={PATH.LOGIN} activeClassName={style.activeLink}>Log In</NavLink>
                </div>}
                {!isLoggedIn && <div className = {style.item}>
                    <NavLink to={PATH.SIGN_UP} activeClassName={style.activeLink}>Sign Up</NavLink>
                </div>}
                {isLoggedIn && <div className = {style.item}>
                    <NavLink to={PATH.PROFILE} activeClassName={style.activeLink}>Profile</NavLink>
                </div>}
                {isLoggedIn && <div className = {style.item}>
                    <NavLink to={PATH.PACKS} activeClassName={style.activeLink}>Packs</NavLink>
                </div>}
                {/*<div className = {style.item}>*/}
                {/*    <NavLink to={PATH.RESTORE_PASSWORD} activeClassName={style.activeLink}>Restore password</NavLink>*/}
                {/*</div>*/}
                {/*<div className = {style.item}>*/}
                {/*    <NavLink to={PATH.ENTER_NEW_PASSWORD} activeClassName={style.activeLink}>Enter new password</NavLink>*/}
                {/*</div>*/}
                {/*<div className = {style.item}>*/}
                {isLoggedIn && <Button buttonStyle={"primary"} onClick={onCLickLogoutHandler} children={"Log out"}/>}


            </nav>
        </div>
    )

}

export default Header;
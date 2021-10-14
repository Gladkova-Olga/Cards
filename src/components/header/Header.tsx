import React from 'react'
import {NavLink} from 'react-router-dom'
import style from './Header.module.css'
import {PATH} from "../routes/Routes";

function Header() {
    return (
        <div className={style.headerBlock}>
            <nav className={style.nav}>
                <div className = {style.item}>
                    <NavLink to={PATH.LOGIN} activeClassName={style.activeLink}>Login</NavLink>
                </div>
                <div className = {style.item}>
                    <NavLink to={PATH.REGISTRATION} activeClassName={style.activeLink}>Registration</NavLink>
                </div>
                <div className = {style.item}>
                    <NavLink to={PATH.PROFILE} activeClassName={style.activeLink}>Profile</NavLink>
                </div>
                <div className = {style.item}>
                    <NavLink to={PATH.RESTORE_PASSWORD} activeClassName={style.activeLink}>Restore password</NavLink>
                </div>
                <div className = {style.item}>
                    <NavLink to={PATH.ENTER_NEW_PASSWORD} activeClassName={style.activeLink}>Enter new password</NavLink>
                </div>
                <div className = {style.item}>
                    <NavLink to={PATH.TEST} activeClassName={style.activeLink}>Test</NavLink>
                </div>


            </nav>
        </div>
    )

}

export default Header
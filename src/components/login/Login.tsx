import React from 'react'
import style from './Login.module.css'
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store";
import {login} from "../../bll/loginReducer";
import {NavLink, Redirect} from "react-router-dom";
import {PATH} from "../routes/Routes";
import Button from "../common/button/Button";
import Input from "../common/input/Input";
import CheckBox from "../common/checkBox/CheckBox";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}


function Login() {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn)
    const isButtonDisabled = useSelector<AppStoreType, boolean>(state => state.login.isButtonDisabled)

    const formik = useFormik({
        initialValues: {
            email: 'olga_gladkova@tut.by',
            password: 'trener28',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = "Field is required";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid e-mail address";
            }
            if (!values.password) {
                errors.password = "Field is required";
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(login(values.email, values.password, values.rememberMe))
            formik.resetForm();
        }
    })

    if (isLoggedIn) {
        return (
            <Redirect to={PATH.PROFILE}/>
        )
    }

    return (
        <div className={style.loginBlock}>
            <h3>Sign in</h3>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <Input id={"email"} name={"email"} type={"text"} placeholder={"E-mail"}
                           onChange={formik.handleChange}
                           value={formik.values.email} onBlur={formik.handleBlur}/>
                    {formik.errors.email && formik.touched.email ? <div className={style.error}>{formik.errors.email}</div> : null}
                </div>
                <div>
                    <Input id={"password"} name={"password"} type={"password"} placeholder={"Password"}
                           onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
                    {formik.errors.password && formik.touched.password ? <div className={style.error}>{formik.errors.password}</div> : null}
                </div>
                <div>
                    <CheckBox id={"rememberMe"} name={"rememberMe"} type={"checkbox"} onChange={formik.handleChange}
                              children={"remember me"}/>
                </div>
                <Button buttonStyle={"primary"} type={"submit"} disabled={isButtonDisabled} children={'Sign in'}/>

            </form>
            <div className={style.linksBlock}>
                <div>
                    <NavLink to={PATH.RESTORE_PASSWORD}>Forgot your password?</NavLink>
                </div>
                <div className={style.item}>
                    <NavLink to={PATH.SIGN_UP}>Sign Up</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Login;
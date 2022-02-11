import React from 'react'
import style from './SignUp.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store";
import {useFormik} from "formik";
import {NavLink, Redirect} from "react-router-dom";
import {PATH} from "../routes/Routes";
import {signUp} from "../../bll/signUpReducer";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

function SignUp() {
    const dispatch = useDispatch()
    const isSignedUp = useSelector<AppStoreType, boolean>(state => state.signUp.isSignedUp)
    const isButtonDisabled = useSelector<AppStoreType, boolean>(state => state.signUp.isButtonDisabled)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
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
            } else if (values.password.length < 7) {
                errors.password = "Password must be more than 8 symbols"
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(signUp(values.email, values.password))
            formik.resetForm();
        }
    })
    if (isSignedUp) {
        return (
            <Redirect to={'/login'}/>
        )
    }

    return (
        <div className={style.signUpContainer}>
            <div>Sign up</div>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <input
                        id={"email"} name={"email"} type={"text"} placeholder={"E-mail"}
                        onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>
                    {formik.errors.email && formik.touched.email ? <div>{formik.errors.email}</div> : null}
                </div>
                <div>
                    <input id={"password"} name={"password"} type={"password"} placeholder={"Password"}
                           onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
                    {formik.errors.password && formik.touched.password ? <div>{formik.errors.password}</div> : null}
                </div>
                <button type={"submit"} disabled={isButtonDisabled}>Sign up</button>
            </form>
        </div>
    )
}

export default SignUp;
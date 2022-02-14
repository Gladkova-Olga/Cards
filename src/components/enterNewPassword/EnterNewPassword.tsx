import React, {useEffect} from 'react'
import style from './EnterNewPassword.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store";
import {useFormik} from "formik";
import {setNewPassword} from "../../bll/enterNewPasswordReducer";
import {Redirect, useParams} from "react-router-dom";

type FormikErrorType = {
    password?: string
}


function EnterNewPassword() {


    const isRequestSuccess = useSelector<AppStoreType, boolean>(state => state.enterNewPassword.isRequestSuccess);
    const isButtonDisabled = useSelector<AppStoreType, boolean>(state => state.enterNewPassword.isButtonDisabled);
    const {token} = useParams<{token: string}>()
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.password) {
                errors.password = "Field is required";
            } else if (values.password.length < 7) {
                errors.password = "Password must be more than 8 symbols"
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(setNewPassword(values.password, token))

        }
    })

    if (isRequestSuccess) {
        return (
            <Redirect to={'/login'}/>
        )
    } else {
        return (
            <div>
                <div>Enter new password</div>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <input id={"password"} name={"password"} type={"password"} placeholder={"Password"}
                               onChange={formik.handleChange} onBlur={formik.handleBlur}
                               value={formik.values.password}/>
                        {formik.errors.password && formik.touched.password ? <div>{formik.errors.password}</div> : null}
                    </div>
                    <button type={"submit"} disabled={isButtonDisabled}>Send</button>
                </form>
            </div>
        )
    }

}

export default EnterNewPassword;
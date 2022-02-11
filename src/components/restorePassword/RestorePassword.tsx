import React from 'react'
import style from './RestorePassword.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store";
import {useFormik} from "formik";
import {login} from "../../bll/loginReducer";
import {restorePassword} from "../../bll/restorePasswordReducer";

type FormikErrorType = {
    email?: string
}

function RestorePassword() {
    const dispatch = useDispatch();
    const isRequestSuccess = useSelector<AppStoreType, boolean>(state => state.restorePassword.isRequestSuccess);
    const isButtonDisabled = useSelector<AppStoreType, boolean>(state => state.restorePassword.isButtonDisabled);

    const formik = useFormik({
        initialValues: {
            email: 'olga_gladkova@tut.by',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = "Field is required";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid e-mail address";
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(restorePassword(values.email))
            formik.resetForm();
        }
    })

    if (isRequestSuccess) {
        return (
            <div>Check yor e-mail! We've sent instruction how to recover your password there.</div>
        )
    } else {
        return (
            <div>
                <div>Restore password</div>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <input
                            id={"email"} name={"email"} type={"text"} placeholder={"E-mail"}
                            onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>
                        {formik.errors.email && formik.touched.email ? <div>{formik.errors.email}</div> : null}
                    </div>
                    <button type={"submit"} disabled={isButtonDisabled}>Send</button>
                </form>
            </div>
        )
    }

}

export default RestorePassword;
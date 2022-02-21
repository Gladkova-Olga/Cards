import React, {useState} from 'react'
import style from './Profile.module.css'
import styleBtn from '../common/styles/Bottom.module.css'
import styleInp from '../common/styles/Input.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store";
import {setUserData, updateUserData} from "../../bll/profileReducer";
import {Redirect} from "react-router-dom";
import {setIsLoggedIn} from "../../bll/loginReducer";
import {useFormik} from "formik";
import {PATH} from "../routes/Routes";


function Profile() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn);
    const name = useSelector<AppStoreType, string>(state => state.profile.name);
    const _id = useSelector<AppStoreType, string>(state => state.profile._id);
    const publicCardPacksCount = useSelector<AppStoreType, number>(state => state.profile.publicCardPacksCount);
    const avatar = useSelector<AppStoreType, string>(state => state.profile.avatar);
    const [editMode, setEditMode] = useState(false)
    const formik = useFormik({
            initialValues: {
                name,
                avatar,
            },
            onSubmit: values => {
                dispatch(updateUserData(values.name, values.avatar));
                setEditMode(false);
            }
        }
    )

    const editProfile = () => {
        setEditMode(true);
    }
    const onCancelEditProfileClick = () => {
        setEditMode(false)
    }

    if (!isLoggedIn) {
        dispatch(setUserData());
        if (!_id) {
            return <Redirect to={PATH.LOGIN}/>
        } else {
            dispatch(setIsLoggedIn(true))
        }
    }
    if (editMode) {
        return (
            <div>
                <form onSubmit={formik.handleSubmit} className={style.editProfileBlock}>
                    <div className={style.editProfileItem}>
                        <input
                            id={"name"} name={"name"} type={"text"} placeholder={"Name"}
                            onChange={formik.handleChange} value={formik.values.name} className={styleInp.input}/>
                    </div>
                    <div className={style.editProfileItem}>
                        <input
                            id={"avatar"} name={"avatar"} type={"text"} placeholder={" URL avatar"}
                            onChange={formik.handleChange} value={formik.values.avatar} className={styleInp.input}/>
                    </div>
                    <div className={style.btnContainer}>
                        <button type={"submit"} className={styleBtn.btn}>Save</button>
                        <button onClick={onCancelEditProfileClick} className={styleBtn.btn}>Cancel</button>
                    </div>

                </form>
            </div>
        )
    }
    return (
        <div className={style.profileBlock}>
            <div>
                <img src={avatar} alt={name}/>
            </div>
            <div className={style.items}>
                <div className={style.titleText}>{name}</div>
                <div className={style.text}>{publicCardPacksCount} public packs</div>
                <button className={styleBtn.btn} onClick={editProfile}>Edit profile</button>
            </div>

        </div>
    )
}

export default Profile;
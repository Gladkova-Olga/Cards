import React, {useState} from 'react'
import style from './Profile.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store";
import {setUserData, setUserDataAC, updateUserData} from "../../bll/profileReducer";
import {Redirect} from "react-router-dom";
import { setIsLoggedIn} from "../../bll/loginReducer";
import {useFormik} from "formik";

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

if(!isLoggedIn){
    dispatch(setUserData());
    if(_id) {
        return <Redirect to={'/login'}/>
    } else {
        dispatch(setIsLoggedIn(true))
    }
}
    if(editMode) {
        return (
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <input
                            id={"name"} name={"name"} type={"text"} placeholder={"Name"}
                            onChange={formik.handleChange} value={formik.values.name}/>
                        <input
                            id={"avatar"} name={"avatar"} type={"text"} placeholder={" URL avatar"}
                            onChange={formik.handleChange} value={formik.values.avatar}/>

                    </div>
                    <button type={"submit"}>Save</button>
                </form>
            </div>
        )
    }
    return (
        <div className={style.ProfileBlock}>
            <div>
                <img src={avatar} alt={name} />
            </div>
            <div>{name}</div>
            <div>{publicCardPacksCount} public packs</div>
            <button onClick={editProfile}>Edit profile</button>
        </div>
    )
}

export default Profile;
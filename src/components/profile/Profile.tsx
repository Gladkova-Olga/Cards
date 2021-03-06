import React, {useState} from 'react'
import style from './Profile.module.css'
import styleInp from '../common/styles/Input.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store";
import {setUserData, updateUserData} from "../../bll/profileReducer";
import {Redirect} from "react-router-dom";
import {setIsLoggedIn} from "../../bll/loginReducer";
import {useFormik} from "formik";
import {PATH} from "../routes/Routes";
import Input from "../common/input/Input";
import Button from "../common/button/Button";
import EditProfile from "./EditProfile";


function Profile() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn);
    const name = useSelector<AppStoreType, string>(state => state.profile.name);
    const _id = useSelector<AppStoreType, string>(state => state.profile._id);
    const publicCardPacksCount = useSelector<AppStoreType, number>(state => state.profile.publicCardPacksCount);
    const avatar = useSelector<AppStoreType, string>(state => state.profile.avatar);
    const [editMode, setEditMode] = useState(false);
    // const reader = new FileReader()
    // const formik = useFormik({
    //         initialValues: {
    //             name,
    //             avatar,
    //         },
    //         onSubmit: values => {
    //             dispatch(updateUserData(values.name, values.avatar));
    //             setEditMode(false);
    //         }
    //     }
    // )

    const editProfile = () => {
        setEditMode(true);
    }
    const onCancelEditProfileClick = () => {
        setEditMode(false);
    }
    // const saveFile = () => {
    //     reader.readAsArrayUrl()
    //
    // }
    const onClickSave = (name: string, avatar: string) => {
        dispatch(updateUserData(name, avatar));
        setEditMode(false);
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
            <EditProfile name={name} avatar={avatar} onClickSave={onClickSave}
                         onCancelEditProfileClick={onCancelEditProfileClick}/>
        )
    }
    //     return (
    //         <>
    //             <EditProfile name={name} avatar={avatar} onClickSave={}
    //                          onCancelEditProfileClick={onCancelEditProfileClick}/>
    //         </>
    //
    //     // <div>
    //     {/*<form onSubmit={formik.handleSubmit} className={style.editProfileBlock}>*/
    //     }
    //     {/*    <div className={style.editProfileItem}>*/
    //     }
    //     {/*        <Input id={"name"} name={"name"} type={"text"} placeholder={"Name"}*/
    //     }
    //     {/*               onChange={formik.handleChange} value={formik.values.name} className={styleInp.input}/>*/
    //     }
    //     {/*    </div>*/
    //     }
    //     {/*    <div className={style.editProfileItem}>*/
    //     }
    //     {/*        <Input*/
    //     }
    //     {/*            id={"avatar"} name={"avatar"} type={"text"} placeholder={"URL avatar"}*/
    //     }
    //     {/*            onChange={formik.handleChange} value={formik.values.avatar} className={styleInp.input}/>*/
    //     }
    //     {/*    </div>*/
    //     }
    //     {/*    /!*<div>*!/*/
    //     }
    //     {/*    /!*    <input type={"file"} name={'file'} id={'file'} accept="image/png, image/jpeg, image/jpg"*!/*/
    //     }
    //     {/*    /!*           onChange={formik.handleChange} value={formik.values.avatar} className={styleInp.input}/>*!/*/
    //     }
    //     {/*    /!*    <label htmlFor="file">Change Image</label>*!/*/
    //     }
    //     {/*    /!*</div>*!/*/
    //     }
    //     {/*    <div className={style.btnContainer}>*/
    //     }
    //     {/*        <Button type={"submit"} children={"Save"} buttonStyle={"primary"}/>*/
    //     }
    //     {/*        <Button children={"Cancel"} buttonStyle={"primary"} onClick={onCancelEditProfileClick}/>*/
    //     }
    //     {/*    </div>*/
    //     }
    //
    //     {/*</form>*/
    //     }
    //     {/*</div>*/
    //     // }
    // )
    // }
    return (
        <div className={style.profileBlock}>
            <div>
                <img src={avatar} alt={name}/>
            </div>
            <div className={style.items}>
                <div className={style.titleText}>{name}</div>
                <div className={style.text}>{publicCardPacksCount} public packs</div>
                <Button onClick={editProfile} buttonStyle={"primary"} children={"Edit profile"}/>
            </div>

        </div>
    )
}

export default Profile;
import React, {ChangeEvent, useState} from "react";
import style from "./Profile.module.css";
import Input from "../common/input/Input";
import styleInp from "../common/styles/Input.module.css";
import Button from "../common/button/Button";

type PropsType = {
    name: string
    avatar: string
    onClickSave: (name: string, avatar: string) => void
    onCancelEditProfileClick: () => void
}

const EditProfile: React.FC<PropsType> = ({name, avatar, onClickSave, onCancelEditProfileClick}) => {
    const [newName, setNewName] = useState(name);
    const [newAvatar, setNewAvatar] = useState(avatar);


    const onChangeNewName = (e: ChangeEvent<HTMLInputElement>) => {
        setNewName(e.currentTarget.value);
    }
    const onChangeNewAvatar = (e: ChangeEvent<HTMLInputElement>) => {
        setNewAvatar(e.currentTarget.value);
    }

    return (
        <div className={style.editProfileBlock}>
                <div className={style.editProfileItem}>
                    <Input id={"name"} name={"name"} type={"text"} placeholder={"Name"}
                           onChange={onChangeNewName} value={newName} className={styleInp.input}/>
                </div>
                <div className={style.editProfileItem}>
                    <Input
                        id={"avatar"} name={"avatar"} type={"text"} placeholder={"URL avatar"}
                        onChange={onChangeNewAvatar} value={newAvatar} className={styleInp.input}/>
                </div>

                <div className={style.btnContainer}>
                    <Button  children={"Save"} buttonStyle={"primary"} onClick={() => onClickSave(newName, newAvatar)}/>
                    <Button children={"Cancel"} buttonStyle={"primary"} onClick={onCancelEditProfileClick}/>
                </div>


        </div>
    )
}

export default EditProfile;
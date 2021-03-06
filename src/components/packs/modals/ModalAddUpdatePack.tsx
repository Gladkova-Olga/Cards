import React, {ChangeEvent, useState} from "react";
import Modal from "../../common/modal/Modal";
import {useDispatch} from "react-redux";
import {addPack, updatePack} from "../../../bll/packsReducer";
import Button from "../../common/button/Button";
import Input from "../../common/input/Input";
import style from "../../common/checkBox/CheckBox.module.css";
import s from "./ModalAddUpdatePack.module.css"

type PropsType = {
    buttonName: "Add" | "Update"
    nameInit: string
    _id: string
    isPrivateInit: boolean
}

const ModalAddUpdatePack: React.FC<PropsType> = ({
                                                     buttonName, _id, nameInit,
                                                     isPrivateInit
                                                 }) => {
    const dispatch = useDispatch();
    const [activeAddPack, setActiveAddPack] = useState(false);
    const [title, setTitle] = useState(nameInit);
    const [isPrivate, setIsPrivate] = useState(isPrivateInit);

    const onClickAddPackHandler = () => {
        setActiveAddPack(true);
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }
    const onChangeIsPrivate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsPrivate(e.target.checked);

    }
    const onClickSave = () => {
        if (buttonName === 'Add') {
            dispatch(addPack(title, isPrivate));
        } else {
            dispatch(updatePack(_id, title, isPrivate))
        }
        setActiveAddPack(false);
        setTitle(title);
        setIsPrivate(isPrivate);
    }
    const onClickCancel = () => {
        setActiveAddPack(false);
        setTitle(nameInit);
        setIsPrivate(isPrivateInit);
    }

    return (
        <div>
            <Button onClick={onClickAddPackHandler} buttonStyle={"secondary"} children={buttonName}/>
            <Modal active={activeAddPack} setActive={setActiveAddPack}>
                <Input type={"text"} placeholder={"Cards title"} value={title}
                       onChange={onChangeTitle} className={s.input}/>

                <div>
                    <input className={style.checkBox} type={"checkbox"} id={_id} onChange={onChangeIsPrivate}
                           checked={isPrivate}/>
                    <label className={style.label} htmlFor={_id}>private pack</label>
                </div>
                <div>
                    <Button buttonStyle={"secondary"} children={"Save"} onClick={onClickSave}
                            className={s.btnContainer}/>
                    <Button buttonStyle={"secondary"} children={"Cancel"} onClick={onClickCancel}
                            className={s.btnContainer}/>
                </div>
            </Modal>
        </div>
    )
}

export default ModalAddUpdatePack;
import React, {ChangeEvent, useState} from "react";
import Modal from "../common/modal/Modal";
import {useDispatch} from "react-redux";
import {addPack, updatePack} from "../../bll/packsReducer";

type PropsType = {
    buttonName: "Add" | "Update"
    nameInit: string
    _id: string
    isPrivateInit: boolean
}

const ModalAddUpdatePack: React.FC<PropsType> = ({buttonName, _id, nameInit, isPrivateInit}) => {
    const dispatch = useDispatch();
    const [activeAddPack, setActiveAddPack] = useState(false);
    const [title, setTitle] = useState(nameInit);
    const [isPrivate, setIsPrivate] = useState(isPrivateInit);
    const onClickAddPackHandler = () => {
        setActiveAddPack(true);
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const onChangeIsPrivate = () => {
        setIsPrivate(!isPrivate);
    }
    const onClickSave = () => {
        if(buttonName === 'Add'){
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
            <button onClick={onClickAddPackHandler}>{buttonName}</button>
            <Modal active={activeAddPack} setActive={setActiveAddPack}>
                <div><input placeholder={"Cards title"} value={title} onChange={onChangeTitle}/></div>
                <div><input checked={isPrivate} type={"checkbox"} onChange={onChangeIsPrivate}/><label>private
                    pack</label></div>
                <div>
                    <button onClick={onClickSave}>Save</button>
                    <button onClick={onClickCancel}>Cancel</button>
                </div>
            </Modal>
        </div>
    )
}

export default ModalAddUpdatePack;
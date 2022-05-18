import React, {useState} from "react";
import Modal from "../../common/modal/Modal";
import {useDispatch} from "react-redux";
import {deletePack} from "../../../bll/packsReducer";
import Button from "../../common/button/Button";
import style from "./ModalDeletePack.module.css"


type PropsType = {
    _id: string
    name: string
}

const ModalDeletePack: React.FC<PropsType> = ({_id, name}) => {
    const [active, setActive] = useState(false);
    const dispatch = useDispatch();


    const onClickDeleteHandler = () => {
        setActive(true);
    }
    const onClickYes = () => {
        dispatch(deletePack(_id));
        setActive(false);
    }
    const onClickNo = () => {
        setActive(false);
    }


    return (
        <div>
            <Button onClick={onClickDeleteHandler} children={"Delete"} buttonStyle={"secondary"}/>
            <Modal active={active} setActive={onClickDeleteHandler}>
                <div>Do you really want to delete {name}?</div>
                <div>
                    <Button onClick={onClickYes} buttonStyle={"secondary"} children={"Yes"} className={style.btnContainer}/>
                    <Button onClick={onClickNo} buttonStyle={"secondary"} children={"No"} className={style.btnContainer}/>
                </div>

            </Modal>
        </div>
    )
}

export default ModalDeletePack;
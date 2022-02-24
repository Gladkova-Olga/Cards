import React, {useState} from "react";
import Modal from "../common/modal/Modal";
import {useDispatch} from "react-redux";
import {deletePack} from "../../bll/packsReducer";


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
            <button onClick={onClickDeleteHandler}>Delete</button>
            <Modal active={active} setActive={onClickDeleteHandler}>
                <div>Do you really want to delete {name}?</div>
                <div>
                    <button onClick={onClickYes}>Yes</button>
                    <button onClick={onClickNo}>No</button>
                </div>

            </Modal>
        </div>
    )
}

export default ModalDeletePack;
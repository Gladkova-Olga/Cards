import React, {useState} from "react";
import Modal from "../common/modal/Modal";
import {useDispatch} from "react-redux";
import {deleteCard} from "../../bll/cardsReducer";


type PropsType = {
    _id: string
    cardsPack_id: string
}

const ModalDeletePCard: React.FC<PropsType> = ({_id, cardsPack_id}) => {
    const [active, setActive] = useState(false);
    const dispatch = useDispatch();


    const onClickDeleteHandler = () => {
        setActive(true);
    }
    const onClickYes = () => {
        dispatch(deleteCard(_id, cardsPack_id));
        setActive(false);
    }
    const onClickNo = () => {
        setActive(false);
    }


    return (
        <div>
            <button onClick={onClickDeleteHandler}>Delete</button>
            <Modal active={active} setActive={onClickDeleteHandler}>
                <div>Do you really want to delete this card?</div>
                <div>
                    <button onClick={onClickYes}>Yes</button>
                    <button onClick={onClickNo}>No</button>
                </div>

            </Modal>
        </div>
    )
}

export default ModalDeletePCard;
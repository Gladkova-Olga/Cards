import React, {useState} from "react";
import Modal from "../common/modal/Modal";
import {useDispatch} from "react-redux";
import {deleteCard} from "../../bll/cardsReducer";
import Button from "../common/button/Button";


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
            <Button children={"Delete"} buttonStyle={"secondary"} onClick={onClickDeleteHandler}/>
            <Modal active={active} setActive={onClickDeleteHandler}>
                <div>Do you really want to delete this card?</div>
                <div>
                    <Button children={"Yes"} buttonStyle={'secondary'} onClick={onClickYes}/>
                    <Button children={"No"} buttonStyle={'secondary'} onClick={onClickNo}/>
                </div>

            </Modal>
        </div>
    )
}

export default ModalDeletePCard;
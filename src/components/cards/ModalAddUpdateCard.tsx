import React, {ChangeEvent, useState} from "react";
import Modal from "../common/modal/Modal";
import {useDispatch} from "react-redux";
import {addPack, updatePack} from "../../bll/packsReducer";
import {addCard} from "../../bll/cardsReducer";

type PropsType = {
    buttonName: "Add" | "Update"
    questionInit: string
    answerInit: string
    _id: string
    cardsPack_id: string
    gradeInit: number
}

const ModalAddUpdatePack: React.FC<PropsType> =
    ({buttonName, questionInit, answerInit, _id, cardsPack_id, gradeInit}) => {
        const dispatch = useDispatch();
        const [active, setActive] = useState(false);
        const [question, setQuestion] = useState(questionInit);
        const [answer, setAnswer] = useState(answerInit);

        const onClickAddCardHandler = () => {
            setActive(true);
        }
        const onChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
            setQuestion(e.target.value);
        }
        const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
            setAnswer(e.target.value);
        }
        const onClickSave = () => {
            if(buttonName === 'Add'){
                dispatch(addCard(cardsPack_id, question, answer, gradeInit));
            } else {
                // dispatch(updatePack(_id, title, isPrivate))
            }
            setActive(false);
            setQuestion("");
            setAnswer("");
        }
        const onClickCancel = () => {
            setActive(false);
            setQuestion("");
            setAnswer("");
        }

        return (
            <div>
                <button onClick={onClickAddCardHandler}>{buttonName}</button>
                <Modal active={active} setActive={setActive}>
                    <div><input placeholder={"Question"} value={question} onChange={onChangeQuestion}/></div>
                    <div><input placeholder={"Answer"} value={answer} onChange={onChangeAnswer}/></div>
                    <div>
                        <button onClick={onClickSave}>Save</button>
                        <button onClick={onClickCancel}>Cancel</button>
                    </div>
                </Modal>
            </div>
        )
    }

export default ModalAddUpdatePack;
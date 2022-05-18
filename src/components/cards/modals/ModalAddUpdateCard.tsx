import React, {ChangeEvent, useState} from "react";
import Modal from "../../common/modal/Modal";
import {useDispatch} from "react-redux";
import {addCard, updateCard} from "../../../bll/cardsReducer";
import Button from "../../common/button/Button";
import Input from "../../common/input/Input";
import style from "./ModalAddUpdatePack.module.css"

type PropsType = {
    buttonName: "Add" | "Update"
    questionInit: string
    answerInit: string
    _id: string
    cardsPack_id: string
    gradeInit: number
}


const ModalAddUpdateCard: React.FC<PropsType> =
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
            if (buttonName === 'Add') {
                dispatch(addCard(cardsPack_id, question, answer, gradeInit));
            } else {
                dispatch(updateCard(_id, cardsPack_id, question, answer, gradeInit))
            }
            setActive(false);
            setQuestion(question);
            setAnswer(answer);
        }
        const onClickCancel = () => {
            setActive(false);
            setQuestion(questionInit);
            setAnswer(answerInit);
        }

        return (
            <div>
                <Button children={buttonName} buttonStyle={"secondary"} onClick={onClickAddCardHandler}/>
                <Modal active={active} setActive={setActive}>
                    <Input name={"question"} placeholder={"Question"} value={question}
                           onChange={onChangeQuestion} className={style.input}/>
                    <Input name={"answer"} placeholder={"Answer"} value={answer} onChange={onChangeAnswer}
                           className={style.input}/>
                    <div>
                        <Button children={"Save"} buttonStyle={"secondary"}
                                onClick={onClickSave} className={style.btnContainer}/>
                        <Button children={"Cancel"} buttonStyle={"secondary"}
                                onClick={onClickCancel} className={style.btnContainer}/>
                    </div>
                </Modal>
            </div>
        )
    }

export default ModalAddUpdateCard;
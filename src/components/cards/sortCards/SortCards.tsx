import React from "react";
import {useDispatch} from "react-redux";
import {setSortCardsCondition} from "../../../bll/cardsReducer";
import up from "../../../assets/images/icon_sort_up.png"
import down from "../../../assets/images/icon_sorn_down.png"
import style from "../../packs/sortPack/sortPack.module.css";

type PropsType = {
    btnName:  "question" | "answer" | "updated" | "grade"
}

const SortCards: React.FC<PropsType> = ({btnName}) => {
    const dispatch = useDispatch();


    const onClickQuestionUp = () => {
        dispatch(setSortCardsCondition("1question"))
    }
    const onClickQuestionDown = () => {
        dispatch(setSortCardsCondition("0question"))
    }
    const onClickAnswerUp = () => {
        dispatch(setSortCardsCondition("1answer"))
    }
    const onClickAnswerDown = () => {
        dispatch(setSortCardsCondition("0answer"))
    }
    const onClickUpdUp = () => {
        dispatch(setSortCardsCondition("1updated"))
    }
    const onClickUpdDown = () => {
        dispatch(setSortCardsCondition("0updated"))
    }
    const onClickGradeUp = () => {
        dispatch(setSortCardsCondition("0grade"))
    }
    const onClickGradeDown = () => {
        dispatch(setSortCardsCondition("1grade"))
    }

    switch (btnName) {
        case "question": {
            return (
                <div>
                    <button className={style.btn} onClick={onClickQuestionUp}><img src={up} alt = {"up"}/></button>
                    <button className={style.btn} onClick={onClickQuestionDown}><img src={down} alt={"down"} /></button>
                </div>
            )
        }
        case "answer": {
            return (
                <div>
                    <button className={style.btn} onClick={onClickAnswerUp}><img src={up} alt = {"up"}/></button>
                    <button className={style.btn} onClick={onClickAnswerDown}><img src={down} alt={"down"} /></button>
                </div>
            )
        }
        case "grade": {
            return (
                <div>
                    <button className={style.btn} onClick={onClickGradeUp}><img src={up} alt = {"up"}/></button>
                    <button className={style.btn} onClick={onClickGradeDown}><img src={down} alt={"down"} /></button>
                </div>
            )
        }
        case "updated": {
            return (
                <div>
                    <button className={style.btn} onClick={onClickUpdUp}><img src={up} alt = {"up"}/></button>
                    <button className={style.btn} onClick={onClickUpdDown}><img src={down} alt={"down"} /></button>
                </div>
            )
        }

    }

    return (
        <>
        </>
    )
}

export default SortCards;
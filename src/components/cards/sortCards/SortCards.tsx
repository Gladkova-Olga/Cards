import React from "react";
import {useDispatch} from "react-redux";
import {setSortCardsCondition} from "../../../bll/cardsReducer";

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
                <>
                    <button onClick={onClickQuestionUp}>up</button>
                    <button onClick={onClickQuestionDown}>down</button>
                </>
            )
        }
        case "answer": {
            return (
                <>
                    <button onClick={onClickAnswerUp}>up</button>
                    <button onClick={onClickAnswerDown}>down</button>
                </>
            )
        }
        case "grade": {
            return (
                <>
                    <button onClick={onClickGradeUp}>up</button>
                    <button onClick={onClickGradeDown}>down</button>
                </>
            )
        }
        case "updated": {
            return (
                <>
                    <button onClick={onClickUpdUp}>up</button>
                    <button onClick={onClickUpdDown}>down</button>
                </>
            )
        }

    }

    return (
        <>
        </>
    )
}

export default SortCards;
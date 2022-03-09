import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Input from "../../common/input/Input";

type PropsType = {
    onPressKeyQuestionSearch: (cardQuestion: string) => void
    onPressKeyAnswerSearch: (cardAnswer: string) => void

}

const CardsSettings: React.FC<PropsType> = ({onPressKeyQuestionSearch, onPressKeyAnswerSearch}) => {
    const [questionValue, setQuestionValue] = useState("");
    const [answerValue, setAnswerValue] = useState("");

    const onChangeQuestionValue = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestionValue(e.target.value)
    }
    const onChangeAnswerValue = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswerValue(e.target.value)
    }

    const onPressEnterSearchQuestion = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onPressKeyQuestionSearch(questionValue);
        }
    }
    const onPressEnterSearchAnswer = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onPressKeyAnswerSearch(answerValue);
        }
    }

    return (
        <>
            <div>
                <Input value={questionValue} onChange={onChangeQuestionValue} placeholder={"Search question"}
                       onKeyPress={onPressEnterSearchQuestion}/>
            </div>
            <div>
                <Input value={answerValue} onChange={onChangeAnswerValue} placeholder={"Search answer"}
                       onKeyPress={onPressEnterSearchAnswer}/>
            </div>
        </>
    )
}

export default CardsSettings;
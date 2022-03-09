import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Input from "../../common/input/Input";


type PropsType = {
    onPressKeyQuestionSearch: (cardQuestion: string) => void
    onPressKeyAnswerSearch: (cardAnswer: string) => void
    onPressKeyGrade: (min: number, max: number) => void

}

const CardsSettings: React.FC<PropsType> = ({onPressKeyQuestionSearch, onPressKeyAnswerSearch, onPressKeyGrade}) => {
    const [questionValue, setQuestionValue] = useState("");
    const [answerValue, setAnswerValue] = useState("");
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(6);

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
    const onChangeMinGrade = (e: ChangeEvent<HTMLInputElement>) => {
        setMin(+e.target.value)
    }
    const onChangeMaxGrade = (e: ChangeEvent<HTMLInputElement>) => {
        setMax(+e.target.value)
    }
    const onPressEnterGrade = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onPressKeyGrade(min, max);
        }
    }

    return (
        <>
            <div>
                Grade:
            </div>
            <div>
                Min - <Input value={min} onChange={onChangeMinGrade}
                             onKeyPress={onPressEnterGrade} placeholder={"Min grade"}/>
            </div>
            <div>
                Max - <Input value={max} onChange={onChangeMaxGrade}
                             onKeyPress={onPressEnterGrade} placeholder={"Max grade"}/>
            </div>
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
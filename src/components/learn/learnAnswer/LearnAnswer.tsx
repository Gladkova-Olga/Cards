import React, {ChangeEvent, useState} from "react";
import Button from "../../common/button/Button";
import style from "./LearnAnswer.module.css"

type PropsType = {
    grade: number,
    card_id: string
    onCLickNext: (grade: number) => void
    answer: string
}

const LearnAnswer: React.FC<PropsType> = ({
                                              grade, card_id,
                                              onCLickNext, answer
                                          }) => {
    const [value, setValue] = useState(1);
    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(+e.currentTarget.value);
    }

    return (
        <>
            <div>{answer}</div>
            <div className={style.text}>Please rate your answer:</div>
            <div className={style.rating}>
                <div>
                    <input type={'radio'} value={1} onChange={onChangeValue} id={"grade1"} checked={value === 1}/>
                    <label htmlFor={"grade1"}>didn't know</label>
                </div>
                <div>
                    <input type={'radio'} value={2} onChange={onChangeValue} id={"grade2"} checked={value === 2}/>
                    <label htmlFor={"grade2"}>forgot</label>
                </div>
                <div>
                    <input type={'radio'} value={3} onChange={onChangeValue} id={"grade3"} checked={value === 3}/>
                    <label htmlFor={"grade3"}>a lot of thought</label>
                </div>
                <div>
                    <input type={'radio'} value={4} onChange={onChangeValue} id={"grade4"} checked={value === 4}/>
                    <label htmlFor={"grade4"}>confused</label>
                </div>
                <div>
                    <input type={'radio'} value={5} onChange={onChangeValue} id={"grade5"} checked={value === 5}/>
                    <label htmlFor={"grade2"}>knew</label>
                </div>
            </div>
            <Button buttonStyle={"secondary"} children={"Next"} onClick={() => onCLickNext(value)}/>

        </>
    )
}
export default LearnAnswer;
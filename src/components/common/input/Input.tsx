import React from 'react';
import style from "./Input.module.css"

type InputPropsType = {
    inputName: string
    placeholder: string
}

function Input(props: InputPropsType) {

    return (
        <input className={style.input} type={"text"} name={props.inputName} placeholder={props.placeholder}/>
    )

}

export default Input;
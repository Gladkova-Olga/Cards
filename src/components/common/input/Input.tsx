import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react';
import style from "./Input.module.css"

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputPropsType = DefaultInputPropsType & {

}

function Input({type, onChange, ...rest}: InputPropsType) {

    return (
        <input className={style.input} type={"text"} onChange={onChange} {...rest} />
    )

}

export default Input;
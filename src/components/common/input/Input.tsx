import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react';
import style from "./Input.module.css"

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputPropsType = DefaultInputPropsType & {

}

function Input({type, onChange, className, ...rest}: InputPropsType) {

    const finalInputClassName = `${style.input} ${className ? className : ''}`

    return (
        <input className={finalInputClassName} type={type} onChange={onChange} {...rest} />
    )

}

export default Input;
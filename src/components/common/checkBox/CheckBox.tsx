import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react';
import style from "./CheckBox.module.css"

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type CheckBoxPropsType = DefaultInputPropsType &{

}

function CheckBox({type, id,  children, onChange,  ...rest}: CheckBoxPropsType) {

    return (
        <div>
            <input className={style.checkBox} type={"checkbox"} id={id} onChange={onChange} {...rest}/>
            <label className={style.label} htmlFor={id}>{children}</label>
        </div>

    )

}

export default CheckBox;
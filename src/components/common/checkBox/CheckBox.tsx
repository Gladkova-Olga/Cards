import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react';
import style from "./CheckBox.module.css"

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type CheckBoxPropsType = DefaultInputPropsType &{

}

function CheckBox({type, id,  children, onChange, checked, name, className, ...rest}: CheckBoxPropsType) {
    const finalInputClassName = `${style.checkBox} ${className ? className : ''}`

    return (
        <div>
            <input className={finalInputClassName} type={"checkbox"} id={id} onChange={onChange} checked={checked}
                 name={name}  {...rest}/>
            <label className={style.label} htmlFor={id}>{children}</label>
        </div>



    )

}

export default CheckBox;
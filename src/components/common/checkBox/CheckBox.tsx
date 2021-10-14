import React from 'react';
import style from "./CheckBox.module.css"

type CheckBoxPropsType = {
    id: string
    checkBoxLabel: string
}

function CheckBox(props: CheckBoxPropsType) {

    return (
        <div>
            <input className={style.checkBox} type={"checkbox"} id={props.id}/>
            <label className={style.label} htmlFor={props.id}>{props.checkBoxLabel}</label>
        </div>

    )

}

export default CheckBox;
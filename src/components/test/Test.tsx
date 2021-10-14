import React from 'react'
import Button from "../common/button/Button";
import style from './Test.module.css'
import Input from "../common/input/Input";
import CheckBox from "../common/checkBox/CheckBox";


function Test() {
    return (
        <div className={style.testBlock}>
            <div className={style.item}><Button buttonName={"test"}/> </div>
            <div className={style.item}><Input inputName={"input"} placeholder={"test"}/></div>
            <div className={style.item}><CheckBox checkBoxLabel={"Test"} id={"test"}/></div>


        </div>
    )
}

export default Test;
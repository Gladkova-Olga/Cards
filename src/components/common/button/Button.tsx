import React from 'react';
import style from "./Button.module.css"

type ButtonPropsType = {
    buttonName: string
}

function Button(props: ButtonPropsType) {
    const buttonHandler = () => {

    }
    return (
        <button className={style.button}  onClick={buttonHandler}>
            {props.buttonName}
        </button>
    )

}
export default Button;
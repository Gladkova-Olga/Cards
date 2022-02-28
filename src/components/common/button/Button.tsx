import React from 'react';
import style from "./Button.module.css"

type ButtonPropsType = {
    buttonName: string
    buttonStyle: "primary" | "secondary"
    onClickHandler: () => void
    // children: any
}

const Button: React.FC<ButtonPropsType> = ({buttonName, buttonStyle, onClickHandler}) => {

    return (
        <button className={buttonStyle === "primary" ? style.button : style.buttonSecondary}  onClick={onClickHandler}>
            {buttonName}
        </button>
    )

}
export default Button;
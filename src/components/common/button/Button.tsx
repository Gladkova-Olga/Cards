import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import style from "./Button.module.css"

type ButtonPropsType = DefaultButtonPropsType &{
    buttonStyle: "primary" | "secondary"
}

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const Button: React.FC<ButtonPropsType> = ({buttonStyle, ...rest}) => {

    return (
        <button className={buttonStyle === "primary" ? style.buttonPrimary : style.buttonSecondary } {...rest} />
    )

}
export default Button;
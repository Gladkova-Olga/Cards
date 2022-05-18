import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import style from "./Button.module.css"

type ButtonPropsType = DefaultButtonPropsType &{
    buttonStyle: "primary" | "secondary"
}

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const Button: React.FC<ButtonPropsType> = ({buttonStyle, className, ...rest}) => {
    const finalInputClassName = `${buttonStyle === "primary" ? style.buttonPrimary : style.buttonSecondary} ${className 
        ? className : ''}`

    return (
        <button className={finalInputClassName} {...rest} />
    )

}
export default Button;
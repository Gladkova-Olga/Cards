import React from "react";
import style from './Modal.module.css'

type ModalPropsType = {
    active: boolean
    setActive: (active: boolean) => void
    children: any
}


const Modal = ({active, setActive, children}: ModalPropsType)  => {
    const onClickModal = () => {
        setActive(false)
    }

    return (
        <div className={active ? `${style.modal} ${style.active}` : style.modal} onClick={onClickModal}>
            <div className={style.modal_content}
                 onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}
export default Modal;
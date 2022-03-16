import React, {useState} from "react";
import Button from "../common/button/Button";
import Modal from "../common/modal/Modal";

type PropsType = {
    onClickStopHandler: () => void
}

const ModalStopLearning:React.FC<PropsType> = ({onClickStopHandler}) => {
    const [active, setActive] = useState(false);
    const onCLickStop = () => {
        setActive(true);
    }
    const onClickYes = () => {
        onClickStopHandler();
        setActive(false);
    }
    const onClickNo = () => {
        setActive(false);
    }

    return (
        <>
            <Button buttonStyle={"primary"} children={"Stop"} onClick={onCLickStop} />
            <Modal active={active} setActive={onCLickStop}>
                <div>Do you really want to stop your learning?</div>
                <div>
                    <Button onClick={onClickYes} buttonStyle={"secondary"} children={"Yes"}/>
                    <Button onClick={onClickNo} buttonStyle={"secondary"} children={"No"}/>
                </div>

            </Modal>
        </>
    )
}

export default ModalStopLearning;
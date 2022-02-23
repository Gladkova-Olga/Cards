import {ChangeEvent, useState} from "react";
import Modal from "../common/modal/Modal";
import {useDispatch} from "react-redux";
import {addPack} from "../../bll/packsReducer";

const ModalAddPack = () => {
    const dispatch = useDispatch();
    const [activeAddPack, setActiveAddPack] = useState(false);
    const [title, setTitle] = useState("");
    const [isPrivate, setIsPrivate] = useState(false)
    const onClickAddPackHandler = () => {
        setActiveAddPack(true);
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const onChangeIsPrivate = () => {
        setIsPrivate(!isPrivate);
    }
    const onClickYes = () => {
        dispatch(addPack(title, isPrivate));

        setActiveAddPack(false);
        setTitle("");
        setIsPrivate(false);
    }
    const onClickNo = () => {
        setActiveAddPack(false);
        setTitle("");
        setIsPrivate(false);
    }

    return (
        <div>
            <button onClick={onClickAddPackHandler}>Add</button>
            <Modal active={activeAddPack} setActive={setActiveAddPack}>
                <div><input placeholder={"Packs title"} value={title} onChange={onChangeTitle}/></div>
                <div><input checked={isPrivate} type={"checkbox"} onChange={onChangeIsPrivate}/><label>private
                    pack</label></div>
                <div>
                    <button onClick={onClickYes}>Yes</button>
                    <button onClick={onClickNo}>No</button>
                </div>

            </Modal>
        </div>
    )
}
export default ModalAddPack;
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../bll/store";
import style from "./error.module.css"
import {setError} from "../../../bll/appReducer";
import {useEffect, useState} from "react";
import Modal from "../modal/Modal";


const Error = () => {
    const error = useSelector<AppStoreType, null | string>(state => state.app.error);
    const dispatch = useDispatch();
    const [active, setActive] = useState(false)

    const handleCloseMistake = () => {
        dispatch(setError(null))
    }
    useEffect(() => {
        if (!error) {
            setActive(true)
        }
    }, [error])

    return (
        <div className={style.error} onClick={handleCloseMistake}>
            {error &&
            <Modal active={active} setActive={setActive} children={error}/>}
        </div>
    )
}

export default Error;
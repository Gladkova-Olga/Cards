import React from "react";
import {useDispatch} from "react-redux";
import {setSortUsersCondition} from "../../../bll/usersReduser";
import up from "../../../assets/images/icon_sort_up.png"
import down from "../../../assets/images/icon_sorn_down.png"
import style from "./sortUsers.module.css"

type PropsType = {
    btnName:  "name" | "publicCardPacksCount"
}
const SortUsers: React.FC<PropsType> = ({btnName}) => {
    const dispatch = useDispatch();

    const onClickNameUp = () => {
        dispatch(setSortUsersCondition("1name"))
    }
    const onClickNameDown = () => {
        dispatch(setSortUsersCondition("0name"))
    }
    const onClickPacksUp = () => {
        dispatch(setSortUsersCondition("1publicCardPacksCount"))
    }
    const onClickPacksDown = () => {
        dispatch(setSortUsersCondition("0publicCardPacksCount"))
    }

    switch(btnName) {
        case "name": {
            return (
                <div>
                    <button onClick={onClickNameUp} className={style.btn}><img src={up} alt={"up"}/></button>
                    <button onClick={onClickNameDown} className={style.btn}><img src={down} alt={"down"}/></button>
                </div>
            )
        }
        case "publicCardPacksCount": {
            return (
                <div>
                    <button onClick={onClickPacksUp} className={style.btn}><img src={up} alt={"up"}/></button>
                    <button onClick={onClickPacksDown} className={style.btn}><img src={down} alt={"down"}/></button>
                </div>
            )
        }
    }

}
export default SortUsers;
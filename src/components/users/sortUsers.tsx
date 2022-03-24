import React from "react";
import {useDispatch} from "react-redux";
import {setSortUsersCondition} from "../../bll/usersReduser";

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
                <>
                    <button onClick={onClickNameUp}>up</button>
                    <button onClick={onClickNameDown}>down</button>
                </>
            )
        }
        case "publicCardPacksCount": {
            return (
                <>
                    <button onClick={onClickPacksUp}>up</button>
                    <button onClick={onClickPacksDown}>down</button>
                </>
            )
        }
    }

}
export default SortUsers;
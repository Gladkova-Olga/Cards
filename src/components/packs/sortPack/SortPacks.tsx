import React from "react";
import {useDispatch} from "react-redux";
import {sortPacks} from "../../../bll/packsReducer";

type PropsType = {
    btnName:  "name" | "cardsCount" | "updated"
}
const SortPacks: React.FC<PropsType> = ({btnName}) => {
    const dispatch = useDispatch();

    const onClickNameUp = () => {
        dispatch(sortPacks("1name"))
    }
    const onClickNameDown = () => {
        dispatch(sortPacks("0name"))
    }
    const onClickCardsUp = () => {
        dispatch(sortPacks("1cardsCount"))
    }
    const onClickCardsDown = () => {
        dispatch(sortPacks("0cardsCount"))
    }
    const onClickUpdUp = () => {
        dispatch(sortPacks("1updated"))
    }
    const onClickUpdDown = () => {
        dispatch(sortPacks("0updated"))
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
        case "cardsCount": {
            return (
                <>
                    <button onClick={onClickCardsUp}>up</button>
                    <button onClick={onClickCardsDown}>down</button>
                </>
            )
        }
        case "updated": {
            return (
                <>
                    <button onClick={onClickUpdUp}>up</button>
                    <button onClick={onClickUpdDown}>down</button>
                </>
            )
        }
    }

}
export default SortPacks;
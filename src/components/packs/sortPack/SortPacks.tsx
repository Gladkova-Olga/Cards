import React from "react";
import {useDispatch} from "react-redux";
import {sortPacks} from "../../../bll/packsReducer";
import style from "./sortPack.module.css"
import up from "../../../assets/images/icon_sort_up.png"
import down from "../../../assets/images/icon_sorn_down.png"


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
                <div>
                    <button className={style.btn} onClick={onClickNameUp}><img src={up} alt = {"up"}/></button>
                    <button className={style.btn} onClick={onClickNameDown}><img src={down} alt={"down"} /></button>
                </div>
            )
        }
        case "cardsCount": {
            return (
                <div>
                    <button className={style.btn} onClick={onClickCardsUp}><img src={up} alt = {"up"}/></button>
                    <button className={style.btn} onClick={onClickCardsDown}><img src={down} alt={"down"} /></button>
                </div>
            )
        }
        case "updated": {
            return (
                <div>
                    <button className={style.btn} onClick={onClickUpdUp}><img src={up} alt = {"up"}/></button>
                    <button className={style.btn} onClick={onClickUpdDown}><img src={down} alt={"down"} /></button>
                </div>
            )
        }
    }

}
export default SortPacks;
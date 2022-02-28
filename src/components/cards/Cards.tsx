import style from './Cards.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store";
import {useEffect} from "react";
// import ModalAddUpdatePack from "./ModalAddUpdatePack";
import {Redirect, useParams} from "react-router-dom";
import {PATH} from "../routes/Routes";
import {CardType} from "../../dal/api";
import {fetchCards} from "../../bll/cardsReducer";
import ModalAddUpdateCard from "./ModalAddUpdateCard";
// import ModalDeletePack from "./ModalDeletePack";

const Cards = () => {
    const dispatch = useDispatch();

    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn);
    const cards = useSelector<AppStoreType, CardType[]>(state => state.cards.cards);
    const {cardsPack_id} = useParams<{ cardsPack_id: string }>()

    useEffect(() => {
        dispatch(fetchCards(cardsPack_id))
    }, []);

    if (!isLoggedIn) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <div>
            <ModalAddUpdateCard buttonName={"Add"} questionInit={""} answerInit={""} _id={""}
                                cardsPack_id={cardsPack_id} gradeInit={0}/>
            <div>
                {cards.map((c) => {
                    const date = new Date(c.updated);
                    let options = new Intl.DateTimeFormat('en', {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                    });
                    const timeUpd = options.format(date);
                    const grade = +c.grade.toFixed(2)
                    return (
                        <div className={style.cardsBlock} key={c._id}>
                            <div>{c.question}</div>
                            <div>{c.answer}</div>
                            <div>{grade}</div>
                            <div>{timeUpd}</div>
                            <div>delete</div>
                            <ModalAddUpdateCard buttonName={"Update"} questionInit={c.question} answerInit={c.answer}
                                                _id={c._id} cardsPack_id={c.cardsPack_id} gradeInit={c.grade}/>
                        </div>
                    )
                })}

            </div>
        </div>
    )


//     return (
//         <div>
//             <input type={"checkbox"} onChange={onChangeMyPacks} checked={isMyPacks}/> <label>my packs</label>
//             <ModalAddUpdatePack buttonName={"Add"} _id={''} nameInit={''} isPrivateInit={false}/>
//             <div>
//                 {cardsPacks.map((pack) => {
//                     let date = new Date(pack.updated);
//                     let options = new Intl.DateTimeFormat("en", {
//                         year: "numeric",
//                         month: "numeric",
//                         day: "numeric",
//                         hour: "numeric",
//                         minute: "numeric",
//                     });
//                     const time = options.format(date);
//
//                     return <div className={style.packsBlock} key={pack._id}>
//                         <div>  {pack.name} </div>
//                         <div>  {pack.cardsCount} </div>
//                         <div>  {time} </div>
//                         <ModalDeletePack name={pack.name} _id={pack._id}/>
//                         <ModalAddUpdatePack buttonName={"Update"} _id={pack._id}
//                                             nameInit={pack.name} isPrivateInit={pack.private}/>
//                         <div>  Cards </div>
//                     </div>
//
//                 })}
//             </div>
//
//
//
//         </div>
//     )
}

export default Cards;
import style from './Cards.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store";
import {useEffect} from "react";
import {Redirect, useParams} from "react-router-dom";
import {PATH} from "../routes/Routes";
import {CardType} from "../../dal/api";
import {fetchCards} from "../../bll/cardsReducer";
import ModalAddUpdateCard from "./ModalAddUpdateCard";
import ModalDeleteCard from "./ModalDeleteCard";


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
                            <ModalDeleteCard _id={c._id} cardsPack_id={c.cardsPack_id}/>
                            <ModalAddUpdateCard buttonName={"Update"} questionInit={c.question} answerInit={c.answer}
                                                _id={c._id} cardsPack_id={c.cardsPack_id} gradeInit={c.grade}/>
                        </div>
                    )
                })}

            </div>
        </div>
    )

}

export default Cards;
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useHistory, useParams} from "react-router-dom";
import {AppStoreType} from "../../bll/store";
import {CardType} from "../../dal/api";
import {PATH} from "../routes/Routes";
import React, {useCallback, useEffect, useState} from "react";
import {addNewGrade, fetchCards} from "../../bll/cardsReducer";
import Button from "../common/button/Button";
import LearnAnswer from "./learnAnswer/LearnAnswer";
import ModalStopLearning from "./modals/ModalStopLearning";
import style from "./Learn.module.css"

const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});

    return cards[res.id + 1];
}
const Learn = () => {

    const dispatch = useDispatch();
    const {cardsPack_id} = useParams<{ cardsPack_id: string }>();
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn);
    const cards = useSelector<AppStoreType, CardType[]>(state => state.cards.cards);
    const history = useHistory();

    const [firstCard, setFirstCard] = useState(true);
    const [card, setCard] = useState({} as CardType);
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        if (firstCard) {
            dispatch(fetchCards(cardsPack_id));
            setFirstCard(false);
        }
        if (cards.length > 0 && cardsPack_id === cards[0].cardsPack_id) {
            setCard(getCard(cards));
        }
    }, [dispatch, firstCard, cards, cardsPack_id]);

    const onCLickNext = useCallback((grade: number) => {
        if (cards.length > 0) {
            setShowAnswer(false);
            dispatch(addNewGrade(grade, card._id));
        }
    }, [dispatch, card, cards])

    const onClickStopHandler = () => {
        setCard({
            answer: "",
            question: "",
            cardsPack_id: "",
            grade: 0,
            rating: 0,
            shots: 0,
            type: "",
            user_id: "",
            created: "",
            updated: "",
            _id: "",
        })
        history.push(PATH.PACKS);
    }
    if (!isLoggedIn) {
        return <Redirect to={PATH.LOGIN}/>
    }
    if (cards.length > 0 && cardsPack_id === cards[0].cardsPack_id) {
        return (
            <div className={style.learnContainer}>
                {/*<ModalStopLearning onClickStopHandler={onClickStopHandler}/>*/}
                <div className={style.text}>{card.question}</div>
                {showAnswer
                    ? <LearnAnswer answer={card.answer} grade={card.grade} card_id={card._id}
                                   onCLickNext={onCLickNext}/>
                    : <>

                        <Button buttonStyle={"secondary"} children={"Answer"} onClick={() => setShowAnswer(true)}/>
                    </>
                }
                <ModalStopLearning onClickStopHandler={onClickStopHandler}/>
            </div>
        )
    } else {
        return <></>
    }


}
export default Learn;
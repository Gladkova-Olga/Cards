import {useDispatch, useSelector} from "react-redux";
import {Redirect, useHistory, useParams} from "react-router-dom";
import {AppStoreType} from "../../bll/store";
import {CardType} from "../../dal/api";
import {PATH} from "../routes/Routes";
import {useEffect, useState} from "react";
import {addNewGrade, fetchCards} from "../../bll/cardsReducer";
import Button from "../common/button/Button";
import LearnAnswer from "./LearnAnswer";

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
    const [message, setMessage] = useState("");
    const [showAnswer, setShowAnswer] = useState(false)

    useEffect(() => {
        if (firstCard) {
            dispatch(fetchCards(cardsPack_id));
            setFirstCard(false);
        }
        if (cards.length > 0) {
            setCard(getCard(cards));
            setMessage("");
        } else {
            setMessage("This pack is empty");
        }
    }, [firstCard, cards, cardsPack_id]);

    const onCLickNext = (grade: number) => {
        dispatch(addNewGrade(grade, card._id))
        setCard(getCard(cards));
        setShowAnswer(false);
    }
    const onClickStopHandler = () => {
        history.push(PATH.PACKS)
    }
    if (!isLoggedIn) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <div>
            {message && message}
            <div>{card.question}</div>
            {showAnswer
                ? <LearnAnswer answer={card.answer} grade={card.grade} card_id={card._id}
                               onCLickNext={onCLickNext} onClickStopHandler={onClickStopHandler}/>
                : <Button buttonStyle={"secondary"} children={"Answer"} onClick={() => setShowAnswer(true)}/>
            }


        </div>
    )
}
export default Learn;
import style from './Cards.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store";
import {useEffect} from "react";
import {Redirect, useParams} from "react-router-dom";
import {PATH} from "../routes/Routes";
import {CardType} from "../../dal/api";
import {fetchCards, setAnswerSearch, setGradesRange, setQuestionSearch} from "../../bll/cardsReducer";
import ModalAddUpdateCard from "./ModalAddUpdateCard";
import ModalDeleteCard from "./ModalDeleteCard";
import CardsSettings from "./cardsSettings/CardsSettings";
import SortCards from "./sortCards/SortCards";


const Cards = () => {
    const dispatch = useDispatch();
    const {cardsPack_id} = useParams<{ cardsPack_id: string }>()

    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn);
    const cards = useSelector<AppStoreType, CardType[]>(state => state.cards.cards);
    const cardQuestion = useSelector<AppStoreType, string>(state => state.cards.cardQuestion);
    const cardAnswer = useSelector<AppStoreType, string>(state => state.cards.cardAnswer);
    const min = useSelector<AppStoreType, number>(state => state.cards.min);
    const max = useSelector<AppStoreType, number>(state => state.cards.max);
    const sortCardsCondition = useSelector<AppStoreType, null | string>(state => state.cards.sortCardsCondition);

    useEffect(() => {
        dispatch(fetchCards(cardsPack_id))
    }, [cardQuestion, cardAnswer, min, max, sortCardsCondition]);

    const onPressKeyQuestionSearch = (questionValue: string) => {
        dispatch(setQuestionSearch(questionValue))
    }
    const onPressKeyAnswerSearch = (answerValue: string) => {
        dispatch(setAnswerSearch(answerValue))
    }
    const onPressKeyGrade = (min: number, max: number) => {
        dispatch(setGradesRange(min, max));
    }

    if (!isLoggedIn) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <div className={style.cardsContainer}>
            <div>
                <CardsSettings onPressKeyQuestionSearch={onPressKeyQuestionSearch}
                               onPressKeyAnswerSearch={onPressKeyAnswerSearch} onPressKeyGrade={onPressKeyGrade}
                />
            </div>
            <div>
                <ModalAddUpdateCard buttonName={"Add"} questionInit={""} answerInit={""} _id={""}
                                    cardsPack_id={cardsPack_id} gradeInit={0}/>
                <div className={style.titlesBlock}>
                    <div>Question
                        <SortCards btnName={'question'}/>
                    </div>
                    <div>Answer
                        <SortCards btnName={"answer"}/>
                    </div>
                    <div>Grades
                        <SortCards btnName={"grade"}/>
                    </div>
                    <div>Last update
                        <SortCards btnName={'updated'}/>
                    </div>
                    <div>Delete</div>
                    <div>Update</div>

                </div>
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
                                <ModalAddUpdateCard buttonName={"Update"} questionInit={c.question}
                                                    answerInit={c.answer}
                                                    _id={c._id} cardsPack_id={c.cardsPack_id} gradeInit={c.grade}/>
                            </div>
                        )
                    })}

                </div>

            </div>


        </div>
    )

}

export default Cards;
import {cardsAPI, CardsResponseType, CardType} from "../dal/api";
import {setAppStatus, SetAppStatusType, setError, SetErrorType} from "./appReducer";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStoreType} from "./store";

type InitialStateType = typeof initialState
type ThunkDispatchType = ThunkDispatch<AppStoreType, unknown, ActionCardsType>
type ThunkType = ThunkAction<void, AppStoreType, unknown, ActionCardsType>
export type SortCardsConditionType = "0grade" | "1grade"

type GetCardsActionType = ReturnType<typeof getCards>
type SetPageCountType = ReturnType<typeof setPageCount>
type SetGradesRangeType = ReturnType<typeof setGradesRange>
type SetSortCardsCondition = ReturnType<typeof setSortCardsCondition>
type SetAnswerSearchType = ReturnType<typeof setAnswerSearch>
type SetQuestionSearchType = ReturnType<typeof setQuestionSearch>
type ActionCardsType = SetAppStatusType | SetErrorType | GetCardsActionType | SetPageCountType | SetGradesRangeType
    | SetSortCardsCondition | SetAnswerSearchType | SetQuestionSearchType


const initialState = {
    cards: [] as CardType[],
    cardsTotalCount: 0,
    maxGrade: 5,
    minGrade: 0,
    page: 1,
    pageCount: 10,
    packUserId: "",
    cardAnswer: "",
    cardQuestion: "",
    sortCardsCondition: null as null | SortCardsConditionType,
    min: 0,
    max: 0,
}

export const cardsReducer = (state: InitialStateType = initialState, action: ActionCardsType): InitialStateType => {
    switch (action.type) {
        case 'CARDS/GET-CARDS': {
            return {...state, ...action.cardsInfo}
        }
        case "CARDS/SET-PAGE-COUNT": {
            return {...state, pageCount: action.pageCount}
        }
        case "CARDS/SET-GRADES-RANGE": {
            return {...state, min: action.min, max: action.max}
        }
        case "CARDS/SET-SORT-CARDS-CONDITION": {
            return {...state, sortCardsCondition: action.sortCardsCondition}
        }
        case "CARDS/SET-ANSWER-SEARCH": {
            return {...state, cardAnswer: action.cardAnswer}
        }
        case "CARDS/SET-QUESTION-SEARCH": {
            return {...state, cardQuestion: action.cardQuestion}
        }

        default: {
            return state
        }
    }
}

// const getCards = (cards: CardType[]) => {
//     return ({
//         type: "CARDS/GET-CARDS",
//         cards
//     } as const)
// }
const getCards = (cardsInfo: CardsResponseType) => {
    return ({
        type: "CARDS/GET-CARDS",
        cardsInfo
    } as const)
}
export const setPageCount = (pageCount: number) => {
    return ({
        type: "CARDS/SET-PAGE-COUNT",
        pageCount
    } as const)
}
export const setGradesRange = (min: number, max: number) => {
    return ({
        type: "CARDS/SET-GRADES-RANGE",
        min, max
    } as const)
}
export const setSortCardsCondition = (sortCardsCondition: null | SortCardsConditionType) => {
    return ({
        type: "CARDS/SET-SORT-CARDS-CONDITION",
        sortCardsCondition
    } as const)
}
export const setAnswerSearch = (cardAnswer: string) => {
    return ({
        type: "CARDS/SET-ANSWER-SEARCH",
        cardAnswer
    } as const)
}
export const setQuestionSearch = (cardQuestion: string) => {
    return ({
        type: "CARDS/SET-QUESTION-SEARCH",
        cardQuestion
    } as const)
}

export const fetchCards = (cardsPack_id: string): ThunkType => {
    return async (dispatch: ThunkDispatchType, getState: () => AppStoreType) => {
        // const maxGrade = getState().cards.maxGrade;
        // const minGrade = getState().cards.minGrade;
        const page = getState().cards.page;
        const pageCount = getState().cards.pageCount;
        const cardAnswer = getState().cards.cardAnswer;
        const cardQuestion = getState().cards.cardQuestion;
        const min = getState().cards.min;
        const max = getState().cards.max;
        const sortCardsCondition = getState().cards.sortCardsCondition;
        dispatch(setAppStatus('loading'));
        try {
            const res = await cardsAPI.getCards(cardAnswer, cardQuestion, cardsPack_id, min, max, sortCardsCondition,
                page, pageCount);
            dispatch(getCards(res.data));
            dispatch(setAppStatus('idle'));
        } catch (e: any) {
            const error = e.response ? e.response.data.error : "Some unknown mistake";
            dispatch(setError(error));
            dispatch(setAppStatus('idle'));
        }
    }
}

export const addCard = (cardsPack_id: string, question: string, answer: string, grade: number): ThunkType => {
    return async (dispatch: ThunkDispatchType) => {
        dispatch(setAppStatus('loading'));
        try {
            await cardsAPI.addCard(cardsPack_id, question, answer, grade);
            dispatch(fetchCards(cardsPack_id));
            dispatch(setAppStatus('idle'));
        } catch (e: any) {
            const error = e.response ? e.response.data.error : "Some unknown mistake";
            dispatch(setError(error));
            dispatch(setAppStatus('idle'));
        }
    }
}

export const updateCard = (_id: string, cardsPack_id: string, question: string, answer: string, grade: number): ThunkType => {
    return async (dispatch: ThunkDispatchType) => {
        dispatch(setAppStatus('loading'));
        try {
            await cardsAPI.updateCard(_id, cardsPack_id, question, answer, grade);
            dispatch(fetchCards(cardsPack_id));
            dispatch(setAppStatus('idle'));
        } catch (e: any) {
            const error = e.response ? e.response.data.error : "Some unknown mistake";
            dispatch(setError(error));
            dispatch(setAppStatus('idle'));
        }
    }
}

export const deleteCard = (_id: string, cardsPack_id: string): ThunkType => {
    return async (dispatch: ThunkDispatchType) => {
        dispatch(setAppStatus('loading'));
        try {
            await cardsAPI.deleteCard(_id);
            dispatch(fetchCards(cardsPack_id));
            dispatch(setAppStatus('idle'));
        } catch (e: any) {
            const error = e.response ? e.response.data.error : "Some unknown mistake";
            dispatch(setError(error));
            dispatch(setAppStatus('idle'));
        }
    }
}






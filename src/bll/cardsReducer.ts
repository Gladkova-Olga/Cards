import {cardsAPI, CardType} from "../dal/api";
import {setAppStatus, SetAppStatusType, setError, SetErrorType} from "./appReducer";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStoreType} from "./store";

type InitialStateType = typeof initialState
type ThunkDispatchType = ThunkDispatch<AppStoreType, unknown, ActionCardsType>
type ThunkType = ThunkAction<void, AppStoreType, unknown, ActionCardsType>

type GetCardsActionType = ReturnType<typeof getCards>
type ActionCardsType = SetAppStatusType | SetErrorType | GetCardsActionType


const initialState = {
    cards: [] as CardType[]
}

export const cardsReducer = (state: InitialStateType = initialState, action: ActionCardsType): InitialStateType => {
    switch (action.type) {
        case 'CARDS/GET-CARDS': {
            return {...state, cards: action.cards}
        }
        default: {
            return state
        }
    }
}

const getCards = (cards: CardType[]) => {
    return ({
        type: "CARDS/GET-CARDS",
        cards
    } as const)
}

export const fetchCards = (cardsPack_id: string): ThunkType => {
    return async (dispatch: ThunkDispatchType) => {
        dispatch(setAppStatus('loading'));
        const res = await cardsAPI.getCards(cardsPack_id);
        try {
            dispatch(getCards(res.data.cards));
            dispatch(setAppStatus('idle'));
        } catch (e: any) {
            const error = e.response ? e.response.data.error : "Some unknown mistake";
            dispatch(setError(error));
            dispatch(setAppStatus('idle'));
        }
    }
}





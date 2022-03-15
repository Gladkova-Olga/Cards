import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStoreType} from "./store";
import {setAppStatus, SetAppStatusType, setError, SetErrorType} from "./appReducer";
import {CardType, learnAPI} from "../dal/api";

type InitialStateType = typeof initialState
type ThunkDispatchType = ThunkDispatch<AppStoreType, unknown, ActionLearnType>
type ThunkType = ThunkAction<void, AppStoreType, unknown, ActionLearnType>

type SetGradeType = ReturnType<typeof setGrade>
type ActionLearnType = SetAppStatusType | SetErrorType | SetGradeType

const initialState = {
    cards: [] as CardType[],
    // _id: "",
    // cardsPack_id: "",
    // card_id: "",
    // user_id: "",
    // grade: 0,
    // shots: 0
}

export const learnReducer = (state: InitialStateType = initialState, action: ActionLearnType): InitialStateType => {
    switch (action.type) {
        case "LEARN/SET-GRADE": {
            let updCards = state.cards.map((card) => {
                    if (card._id === action.card_id) {
                        return {...card, grade: action.grade}
                    } else {
                        return {...card}
                    }
                }
            )
            return {...state, cards: updCards}


            // let card = state.cards.find(card => card._id === action.card_id);
            // if(card) {
            //     card.grade = action.grade
            // }
            // return {...state, cards: state.cards.map(card => {
            //     if(card._id === action.card_id) {
            //         return {...card, grade: action.grade}
            //     } else {
            //         return card
            //     }
            //     })}

        }
        default: {
            return state
        }
    }
}

const setGrade = (grade: number, card_id: string) => {
    return ({
        type: "LEARN/SET-GRADE",
        grade,
        card_id
    } as const)
}

export const addNewGrade = (grade: number, card_id: string): ThunkType => {
    return async (dispatch: ThunkDispatchType) => {
        dispatch(setAppStatus('loading'));
        try {
            const res = await learnAPI.updateGrade(grade, card_id);
            dispatch(setGrade(res.data.updatedGrade.grade, res.data.updatedGrade.card_id));
            dispatch(setAppStatus('idle'));
        } catch (e: any) {
            const error = e.response ? e.response.data.error : "Some unknown mistake";
            dispatch(setError(error));
            dispatch(setAppStatus('idle'));
        }
    }
}





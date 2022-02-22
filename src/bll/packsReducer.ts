import {packsApi, PackType} from "../dal/api";
import {Dispatch} from "redux";
import {setAppStatus, SetAppStatusType, setError, SetErrorType} from "./appReducer";

type GetPacksType = ReturnType<typeof getPacks>
type ActionPacksType = GetPacksType | SetAppStatusType | SetErrorType

type ThunkDispatch = Dispatch<ActionPacksType>
type InitialStateType = typeof initialState

const initialState = {
    cardPacks: [] as PackType[],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0,
    pageCount: 0,
}

export const packsReducer = (state: InitialStateType = initialState, action: ActionPacksType): InitialStateType => {
    switch (action.type) {
        case "PACKS/GET-PACKS": {
            return {...state, cardPacks: action.cardPacks}
        }
        default: {
            return state
        }

    }
}

const getPacks = (cardPacks: PackType[]) => {
    return ({
        type: "PACKS/GET-PACKS",
        cardPacks
    } as const)
}

export const fetchPacks = () => {
    return async (dispatch: ThunkDispatch) => {
        dispatch(setAppStatus('loading'));
        try {
            const res = await packsApi.getPacks();
            dispatch(getPacks(res.data.cardPacks))
            dispatch(setAppStatus('idle'));
        } catch (e: any){
            const error = e.response ? e.response.data.error : "Some unknown mistake";
            dispatch(setError(error));
            dispatch(setAppStatus('idle'));
        }


    }
}



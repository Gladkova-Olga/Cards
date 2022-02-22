import {packsApi, PackType} from "../dal/api";
import {Dispatch} from "redux";
import {setAppStatus, SetAppStatusType, setError, SetErrorType} from "./appReducer";
import {AppStoreType} from "./store";

type GetPacksType = ReturnType<typeof getPacks>
type SetMyPacksType = ReturnType<typeof setMyPacks>
type ActionPacksType = GetPacksType | SetMyPacksType |SetAppStatusType | SetErrorType

type ThunkDispatch = Dispatch<ActionPacksType>
type InitialStateType = typeof initialState

const initialState = {
    cardPacks: [] as PackType[],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0,
    pageCount: 0,
    isMyPacks: false
}

export const packsReducer = (state: InitialStateType = initialState, action: ActionPacksType): InitialStateType => {
    switch (action.type) {
        case "PACKS/GET-PACKS": {
            return {...state, cardPacks: action.cardPacks}
        }
        case "PACKS/SET-MY-PACKS": {
            return {...state, isMyPacks: action.isMyPack}
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
export const setMyPacks = (isMyPack: boolean) => {
    return({
        type: "PACKS/SET-MY-PACKS",
        isMyPack
    } as const)
}

export const fetchPacks = () => {
    return async (dispatch: ThunkDispatch, getState: () => AppStoreType) => {
        const user_id = getState().profile._id;
        const isMyPacks = getState().packs.isMyPacks;
        dispatch(setAppStatus('loading'));
        try {
            const res = await packsApi.getPacks(user_id, isMyPacks);
            dispatch(getPacks(res.data.cardPacks))
            dispatch(setAppStatus('idle'));
        } catch (e: any){
            const error = e.response ? e.response.data.error : "Some unknown mistake";
            dispatch(setError(error));
            dispatch(setAppStatus('idle'));
        }


    }
}



import {packsApi, PackType} from "../dal/api";
import {setAppStatus, SetAppStatusType, setError, SetErrorType} from "./appReducer";
import {AppStoreType} from "./store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";

type GetPacksType = ReturnType<typeof getPacks>
type SetMyPacksType = ReturnType<typeof setMyPacks>
type SortPacksType = ReturnType<typeof sortPacks>
type SetPackNameType = ReturnType<typeof setPackName>
type SetCardsCountType = ReturnType<typeof setCardsCount>


type ActionPacksType = GetPacksType | SetMyPacksType | SortPacksType | SetPackNameType | SetCardsCountType |
    SetAppStatusType | SetErrorType


type ThunkDispatchType = ThunkDispatch<AppStoreType, unknown, ActionPacksType>
type ThunkType = ThunkAction<void, AppStoreType, unknown, ActionPacksType>
type InitialStateType = typeof initialState

const initialState = {
    cardPacks: [] as PackType[],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0,
    pageCount: 10,
    isMyPacks: false,
    sortPacks: null as null | string,
    packName: "",
}

export const packsReducer = (state: InitialStateType = initialState, action: ActionPacksType): InitialStateType => {
    switch (action.type) {
        case "PACKS/GET-PACKS": {
            return {...state, cardPacks: action.cardPacks}
        }
        case "PACKS/SET-MY-PACKS": {
            return {...state, isMyPacks: action.isMyPack}
        }
        case "PACKS/SET-PACK-NAME": {
            return {...state, packName: action.packName}
        }
        case "PACKS/SET-CARDS-COUNT": {
            return {...state, minCardsCount: action.minCardsCount, maxCardsCount: action.maxCardsCount}
        }


        case "PACKS/SORT-PACKS": {
            return {...state,}
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
    return ({
        type: "PACKS/SET-MY-PACKS",
        isMyPack
    } as const)
}
// export const setAllPacksData = (cardPacksTotalCount: number, maxCardsCount: number,
//                                 minCardsCount: number, page: number, pageCount: number) => {
//     return ({
//         type: "PACKS/SET-ALL-PACKS-DATA",
//         cardPacksTotalCount, maxCardsCount,
//         minCardsCount, page, pageCount
//     } as const)
// }
export const setCardsCount = (minCardsCount: number, maxCardsCount: number) => {
    return ({
        type: "PACKS/SET-CARDS-COUNT",
        minCardsCount,
        maxCardsCount,
    } as const)
}


export const sortPacks = (sortPacks: string | null) => {
    return ({
        type: "PACKS/SORT-PACKS", sortPacks
    } as const)
}
export const setPackName = (packName: string) => {
    return ({
        type: "PACKS/SET-PACK-NAME",
        packName
    } as const)
}


export const fetchPacks = (): ThunkType => {
    return async (dispatch: ThunkDispatchType, getState: () => AppStoreType) => {
        const user_id = getState().profile._id;
        const isMyPacks = getState().packs.isMyPacks;
        const cardPacksTotalCount = getState().packs.cardPacksTotalCount;
        const maxCardsCount = getState().packs.maxCardsCount;
        const minCardsCount = getState().packs.minCardsCount;
        const page = getState().packs.page;
        const pageCount = getState().packs.pageCount;
        const sortPacks = getState().packs.sortPacks;
        const packName = getState().packs.packName

        dispatch(setAppStatus('loading'));
        try {
            const res = await packsApi.getPacks(user_id, isMyPacks, minCardsCount, maxCardsCount,
                sortPacks, page, pageCount, packName);
            dispatch(getPacks(res.data.cardPacks))
            dispatch(setAppStatus('idle'));
        } catch (e: any) {
            const error = e.response ? e.response.data.error : "Some unknown mistake";
            dispatch(setError(error));
            dispatch(setAppStatus('idle'));
        }
    }
}

export const addPack = (name: string, isPrivate: boolean): ThunkType => {
    return async (dispatch: ThunkDispatchType) => {
        dispatch(setAppStatus('loading'));
        try {
            await packsApi.addPack(name, isPrivate);
            dispatch(fetchPacks());
            dispatch(setAppStatus('idle'));
        } catch (e: any) {
            const error = e.response ? e.response.data.error : "Some unknown mistake";
            dispatch(setError(error));
            dispatch(setAppStatus('idle'));
        }
    }
}
export const deletePack = (_id: string): ThunkType => {
    return async (dispatch: ThunkDispatchType) => {
        dispatch(setAppStatus('loading'));
        try {
            await packsApi.deletePack(_id);
            dispatch(fetchPacks());
            dispatch(setAppStatus('idle'));
        } catch (e: any) {
            const error = e.response ? e.response.data.error : "Some unknown mistake";
            dispatch(setError(error));
            dispatch(setAppStatus('idle'));
        }
    }
}

export const updatePack = (_id: string, name: string, isPrivate: boolean): ThunkType => {
    return async (dispatch: ThunkDispatchType) => {
        dispatch(setAppStatus('loading'));
        try {
            await packsApi.updatePack(_id, name, isPrivate);
            dispatch(fetchPacks());
            dispatch(setAppStatus('idle'))
        } catch (e: any) {
            const error = e.response ? e.response.data.error : "Some unknown mistake";
            dispatch(setError(error));
            dispatch(setAppStatus('idle'));
        }
    }
}



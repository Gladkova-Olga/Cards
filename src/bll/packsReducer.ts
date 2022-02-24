import {packsApi, PackType} from "../dal/api";
import {setAppStatus, SetAppStatusType, setError, SetErrorType} from "./appReducer";
import {AppStoreType} from "./store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";

type GetPacksType = ReturnType<typeof getPacks>
type SetMyPacksType = ReturnType<typeof setMyPacks>
type ActionPacksType = GetPacksType | SetMyPacksType | SetAppStatusType | SetErrorType

type ThunkDispatchType = ThunkDispatch<AppStoreType, unknown, ActionPacksType>
type ThunkType = ThunkAction<void, AppStoreType, unknown, ActionPacksType>
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
    return ({
        type: "PACKS/SET-MY-PACKS",
        isMyPack
    } as const)
}

export const fetchPacks = (): ThunkType => {
    return async (dispatch: ThunkDispatchType, getState: () => AppStoreType) => {
        const user_id = getState().profile._id;
        const isMyPacks = getState().packs.isMyPacks;
        dispatch(setAppStatus('loading'));
        try {
            const res = await packsApi.getPacks(user_id, isMyPacks);
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
            dispatch(fetchPacks);
            dispatch(setAppStatus('idle'))
        } catch (e: any) {
            const error = e.response ? e.response.data.error : "Some unknown mistake";
            dispatch(setError(error));
            dispatch(setAppStatus('idle'));
        }
    }
}



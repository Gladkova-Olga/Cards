import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStoreType} from "./store";
import {userAPI, UserDataType, UsersResponseType} from "../dal/api";
import {setAppStatus, SetAppStatusType, setError, SetErrorType} from "./appReducer";


type InitialStateType = typeof initialState
type ThunkDispatchType = ThunkDispatch<AppStoreType, unknown, ActionUsersType>
type ThunkType = ThunkAction<void, AppStoreType, unknown, ActionUsersType>
export type SortUsersConditionType = "0publicCardPacksCount" | "1publicCardPacksCount" | "0name" | "1name"

type GetUsersType = ReturnType<typeof getUsers>
type SetPageCountType = ReturnType<typeof setPageCount>
type SetPacksCountRangeType = ReturnType<typeof setPacksCountRange>
type SetSortUsersConditionType = ReturnType<typeof setSortUsersCondition>
type SetNameSearchType = ReturnType<typeof setNameSearch>
type SetPageType = ReturnType<typeof setPage>
type SetUserIdType = ReturnType<typeof setUserId>

type ActionUsersType = SetAppStatusType | SetErrorType | GetUsersType | SetPageCountType | SetPacksCountRangeType
    | SetSortUsersConditionType | SetNameSearchType | SetPageType | SetUserIdType

const initialState = {
    users: [] as UserDataType[],
    maxPublicCardPacksCount: 100,
    minPublicCardPacksCount: 0,
    page: 1,
    pageCount: 10,
    usersTotalCount: 0,
    sortUsersCondition: null as null | SortUsersConditionType,
    userName: "",
    min: 0,
    max: 0,
    userId: "",
}

export const usersReducer = (state: InitialStateType = initialState, action: ActionUsersType): InitialStateType => {
    switch (action.type) {
        case "USERS/GET-USERS": {
            return {...state, ...action.usersInfo};
        }
        case "USERS/SET-PAGE-COUNT": {
            debugger
            return {...state, pageCount: action.pageCount}
        }
        case "USERS/SET-PACKS-COUNT-RANGE": {
            return {...state, min: action.min, max: action.max}
        }
        case "USERS/SET-SORT-USERS-CONDITION": {
            return {...state, sortUsersCondition: action.sortUsersCondition}
        }
        case "USERS/SET-NAME-SEARCH": {
            return {...state, userName: action.name}
        }
        case "USERS/SET-PAGE":{
            return {...state, page: action.page}
        }
        case "USERS/SET-USER-ID": {
            return {...state, userId: action.userId}
        }


        default: {
            return state;
        }

    }
}

const getUsers = (usersInfo: UsersResponseType) => {
    return ({
        type: "USERS/GET-USERS",
        usersInfo
    } as const)
}
export const setPageCount = (pageCount: number) => {
    return ({
        type: "USERS/SET-PAGE-COUNT",
        pageCount
    } as const)
}
export const setPacksCountRange = (min: number, max: number) => {
    return ({
        type: "USERS/SET-PACKS-COUNT-RANGE",
        min, max
    } as const)
}
export const setSortUsersCondition = (sortUsersCondition: null | SortUsersConditionType) => {
    return ({
        type: "USERS/SET-SORT-USERS-CONDITION",
        sortUsersCondition
    } as const)
}
export const setNameSearch = (name: string) => {
    return ({
        type: "USERS/SET-NAME-SEARCH",
        name
    } as const)
}
export const setPage = (page: number) => {
    return ({
        type: "USERS/SET-PAGE",
        page
    } as const)
}
export const setUserId = (userId: string) => {
    return ({
        type: "USERS/SET-USER-ID",
        userId
    } as const)
}

export const fetchUsers = (): ThunkType => {
    return async (dispatch: ThunkDispatchType, getState: () => AppStoreType) => {
        const userName = getState().users.userName;
        const min = getState().users.min;
        const max = getState().users.max;
        const sortUsers = getState().users.sortUsersCondition;
        const page = getState().users.page;
        const pageCount = getState().users.pageCount;

        dispatch(setAppStatus('loading'));
        try {
            const res = await userAPI.getUsers(userName, min, max, sortUsers, page, pageCount);
            dispatch(getUsers(res.data));
            dispatch(setAppStatus('idle'));
        } catch (e: any) {
            const error = e.response ? e.response.data.error : "Some unknown mistake";
            dispatch(setError(error));
            dispatch(setAppStatus('idle'));
        }
    }
}
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStoreType} from "./store";
import {userAPI, UserDataType, UsersResponseType} from "../dal/api";
import {setAppStatus, SetAppStatusType, setError, SetErrorType} from "./appReducer";

type InitialStateType = typeof initialState
type ThunkDispatchType = ThunkDispatch<AppStoreType, unknown, ActionUsersType>
type ThunkType = ThunkAction<void, AppStoreType, unknown, ActionUsersType>
export type SortUsersCondition = "0publicCardPacksCount" | "1publicCardPacksCount" | "0name" | "1name"

type GetUsersType = ReturnType<typeof getUsers>
type ActionUsersType = SetAppStatusType | SetErrorType | GetUsersType

const initialState = {
    users: [] as UserDataType[],
    maxPublicCardPacksCount: 100,
    minPublicCardPacksCount: 0,
    page: 1,
    pageCount: 10,
    usersTotalCount: 0,
    sortUsersCondition: null as null | SortUsersCondition,
    userName: "",
    min: 0,
    max: 0,
}

export const usersReducer = (state: InitialStateType = initialState, action: ActionUsersType): InitialStateType => {
    switch (action.type) {
        case "USERS/GET-USERS": {
            return {...state, ...action.usersInfo};
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
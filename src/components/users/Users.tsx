import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store";
import {UserDataType} from "../../dal/api";
import {fetchUsers, setNameSearch, setPacksCountRange, SortUsersConditionType} from "../../bll/usersReduser";
import {Redirect} from "react-router-dom";
import {PATH} from "../routes/Routes";
import style from "./Users.module.css";
import Paginator from "../common/paginator/Paginator";
import {setPage, setPageCount} from "../../bll/usersReduser";
import Button from "../common/button/Button";
import SortUsers from "./sortUsers";
import {setCardsCount} from "../../bll/packsReducer";
import UsersSettings from "./UsersSettings";


const Users: React.FC = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn);
    const users = useSelector<AppStoreType, UserDataType []>(state => state.users.users);
    const pageCount = useSelector<AppStoreType, number>(state => state.users.pageCount);
    const usersTotalCount = useSelector<AppStoreType, number>(state => state.users.usersTotalCount);
    const page = useSelector<AppStoreType, number>(state => state.users.page);
    const sortUsersCondition = useSelector<AppStoreType, null | SortUsersConditionType>(state =>
        state.users.sortUsersCondition);
    const min = useSelector<AppStoreType, number>(state => state.users.min);
    const max = useSelector<AppStoreType, number>(state => state.users.max);
    const userName = useSelector<AppStoreType, string>(state => state.users.userName)


    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch, pageCount, page, sortUsersCondition, min, max, userName]);

    const onPageChange = (page: number) => {
        dispatch(setPage(page));
    }
    const onSwitchPageCount = (pageCount: number) => {
        dispatch(setPageCount(pageCount));
    }
    const onPressKeySearch = (searchValue: string) => {
        dispatch(setNameSearch(searchValue));
    }
    const onPressKeyPacksCount = (minPacksCount: number, maxPacksCount: number) => {
        dispatch(setPacksCountRange(minPacksCount, maxPacksCount));
    }

    if (!isLoggedIn) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <div className={style.usersContainer}>
            <div>
                <UsersSettings onPressKeySearch={onPressKeySearch} onPressKeyPacksCount={onPressKeyPacksCount}/>
            </div>
            <div>
                <Paginator pageCount={pageCount} totalItemsCount={usersTotalCount} portionSize={10}
                           onPageChanges={onPageChange} currentPage={page} onSwitchPageCount={onSwitchPageCount}/>
                <div className={style.titlesBlock}>
                    <div>Name
                        <SortUsers btnName={'name'}/>
                    </div>
                    <div>Public packs
                        <SortUsers btnName={"publicCardPacksCount"}/>
                    </div>
                    <div>E-mail</div>

                </div>
                {users.map(u => {
                    return (
                        <div className={style.usersBlock} key={u._id}>
                            <div>{u.name}</div>
                            <div>{u.publicCardPacksCount}</div>
                            <div>{u.email}</div>
                            <div><Button buttonStyle={'secondary'} children={"Packs"}/></div>

                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Users
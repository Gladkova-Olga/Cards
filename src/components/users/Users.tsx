import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store";
import {UserDataType} from "../../dal/api";
import {fetchUsers} from "../../bll/usersReduser";
import {Redirect} from "react-router-dom";
import {PATH} from "../routes/Routes";
import style from "./Users.module.css";
import Paginator from "../common/paginator/Paginator";
import {setPage, setPageCount} from "../../bll/usersReduser";


const Users: React.FC = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn);
    const users = useSelector<AppStoreType, UserDataType []>(state => state.users.users);
    const pageCount = useSelector<AppStoreType, number>(state => state.users.pageCount);
    const usersTotalCount = useSelector<AppStoreType, number>(state => state.users.usersTotalCount);
    const page = useSelector<AppStoreType, number>(state => state.users.page);


    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch, pageCount, page]);

    const onPageChange = (page: number) => {
        dispatch(setPage(page));
    }
    const onSwitchPageCount = (pageCount: number) => {
        dispatch(setPageCount(pageCount));
    }

    if (!isLoggedIn) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <div className={style.usersContainer}>
            <div>

            </div>
            <div>
                <Paginator pageCount={pageCount} totalItemsCount={usersTotalCount} portionSize={10}
                           onPageChanges={onPageChange} currentPage={page} onSwitchPageCount={onSwitchPageCount}/>
                <div className={style.titlesBlock}>
                    <div>Name
                        {/*<SortCards btnName={'question'}/>*/}
                    </div>
                    <div>Public packs
                        {/*<SortCards btnName={"answer"}/>*/}
                    </div>
                    <div>E-mail
                        {/*<SortCards btnName={"grade"}/>*/}
                    </div>

                </div>
                {users.map(u => {
                    return (
                        <div className={style.usersBlock} key={u._id}>
                            <div>{u.name}</div>
                            <div>{u.publicCardPacksCount}</div>
                            <div>{u.email}</div>

                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Users
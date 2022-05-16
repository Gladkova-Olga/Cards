import style from './Packs.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store";
import {PackType} from "../../dal/api";
import {useEffect} from "react";
import {
    fetchPacks,
    setCardsCount,
    setMyPacks,
    setPackName, setPage, setPageCount, SortPackConditionType, sortPacks,
} from "../../bll/packsReducer";
import ModalAddUpdatePack from "./ModalAddUpdatePack";
import {Redirect, useHistory, useParams} from "react-router-dom";
import {PATH} from "../routes/Routes";
import ModalDeletePack from "./ModalDeletePack";
import Paginator from "../common/paginator/Paginator";
import SortPacks from "./sortPack/SortPacks";
import PacksSettings from "./packsSettings/PacksSettings";
import Button from "../common/button/Button";

const Packs = () => {
    const cardsPacks = useSelector<AppStoreType, PackType[]>(state => state.packs.cardPacks);
    const isMyPacks = useSelector<AppStoreType, boolean>(state => state.packs.isMyPacks);
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn);
    const minCards = useSelector<AppStoreType, number>(state => state.packs.minCards);
    const maxCards = useSelector<AppStoreType, number>(state => state.packs.maxCards);
    const packName = useSelector<AppStoreType, string>(state => state.packs.packName);
    const sortPacksCondition = useSelector<AppStoreType, SortPackConditionType>(state => state.packs.sortPacksCondition);
    const pageCount = useSelector<AppStoreType, number>(state => state.packs.pageCount);
    const cardPacksTotalCount = useSelector<AppStoreType, number>(state => state.packs.cardPacksTotalCount);
    const page = useSelector<AppStoreType, number>(state => state.packs.page);
    const myUser_id = useSelector<AppStoreType, string>(state => state.profile._id);

    const dispatch = useDispatch();
    const history = useHistory();


    useEffect(() => {
        dispatch(fetchPacks())

    }, [isMyPacks, minCards, maxCards, packName, sortPacksCondition, pageCount, page, myUser_id]);


    const onChangeMyPacks = (isMyPack: boolean) => {
        dispatch(setMyPacks(isMyPack));
    }

    const onPressKeySearch = (searchValue: string) => {
        dispatch(setPackName(searchValue));
    }
    const onPressKeyCardCount = (minCardsCount: number, maxCardsCount: number) => {
        dispatch(setCardsCount(minCardsCount, maxCardsCount));
    }

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
        <div className={style.packContainer}>
            <div>
                <PacksSettings isMyPacks={isMyPacks} onChangeMyPacks={onChangeMyPacks}
                               onPressKeyCardCount={onPressKeyCardCount} onPressKeySearch={onPressKeySearch}/>
                <div className={style.btnContainer}>
                    <ModalAddUpdatePack buttonName={"Add"} _id={''} nameInit={''} isPrivateInit={false}
                    />
                </div>

            </div>
            <div>
                <Paginator pageCount={pageCount} portionSize={10} totalItemsCount={cardPacksTotalCount}
                           onPageChanges={onPageChange} currentPage={page} onSwitchPageCount={onSwitchPageCount}/>
                {/*<ModalAddUpdatePack buttonName={"Add"} _id={''} nameInit={''} isPrivateInit={false}*/}
                {/*                    />*/}
                <div className={style.titlesBlock}>
                    <div className={style.title}>
                        <span>Name</span>
                        <SortPacks btnName={"name"}/>
                    </div>

                    <div className={style.title}>
                        <span>Cards</span>
                        <SortPacks btnName={"cardsCount"}/>
                    </div>

                    <div className={style.title}>
                        <span>Updated</span>
                        <SortPacks btnName={"updated"}/>
                    </div>

                </div>
                <div>
                    {cardsPacks.map((pack) => {

                        let date = new Date(pack.updated);
                        let optionsDate = new Intl.DateTimeFormat("en", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                        });
                        let optionsTime = new Intl.DateTimeFormat("en", {
                            hour: "numeric",
                            minute: "numeric",
                        });
                        const formatDate = optionsDate.format(date);
                        const formatTime = optionsTime.format(date);
                        const onClickCards = () => {
                            history.push(`/cards/${pack._id}`)
                        }
                        const onClickLearn = () => {
                            history.push(`/learn/${pack._id}`)
                        }

                        return <div className={style.packsBlock} key={pack._id}>
                            <div onClick={onClickCards} className={style.cardsName}>  {pack.name} </div>
                            <div>  {pack.cardsCount} </div>
                            <div className={style.date}>
                                <div>{formatDate}</div>
                                <div>{formatTime}</div>
                            </div>
                            {pack.user_id === myUser_id && <ModalDeletePack name={pack.name} _id={pack._id} />}
                            {pack.user_id === myUser_id && <ModalAddUpdatePack buttonName={"Update"} _id={pack._id}
                                                                               nameInit={pack.name}
                                                                               isPrivateInit={pack.private}
                                                                               />}

                            {pack.cardsCount > 0 &&
                                <div>
                                    <Button onClick={onClickLearn} buttonStyle={"secondary"} children={"Learn"}/>
                                </div>
                            }
                        </div>

                    })}
                </div>

            </div>


        </div>
    )
}

export default Packs;
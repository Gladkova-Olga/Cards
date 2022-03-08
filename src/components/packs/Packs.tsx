import style from './Packs.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store";
import {PackType} from "../../dal/api";
import {ChangeEvent, KeyboardEvent, useEffect, useState} from "react";
import {
    fetchPacks,
    setCardsCount,
    setMyPacks,
    setPackName, setPage, SortPackConditionType, sortPacks,
} from "../../bll/packsReducer";
import ModalAddUpdatePack from "./ModalAddUpdatePack";
import {Redirect, useHistory} from "react-router-dom";
import {PATH} from "../routes/Routes";
import ModalDeletePack from "./ModalDeletePack";
import CheckBox from "../common/checkBox/CheckBox";
import Button from "../common/button/Button";
import Input from "../common/input/Input";
import Paginator from "../common/paginator/Paginator";
import SortPacks from "./sortPack/SortPacks";

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


    const [minCardsCount, setMinCardsCount] = useState(0);
    const [maxCardsCount, setMaxCardsCount] = useState(1000);
    const [searchValue, setSearchValue] = useState("");

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchPacks())
    }, [isMyPacks, minCards, maxCards, packName, sortPacksCondition, pageCount, page]);

    const onChangeMyPacks = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setMyPacks(e.target.checked));
    }
    const onChangeMinCardsCount = (e: ChangeEvent<HTMLInputElement>) => {
        setMinCardsCount(+e.target.value);

    }
    const onChangeMaxCardsCount = (e: ChangeEvent<HTMLInputElement>) => {
        setMaxCardsCount(+e.target.value);
    }
    const onChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }
    const onPressKeySearch = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            dispatch(setPackName(searchValue));
        }
    }
    const onPressKeyCardCount = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            dispatch(setCardsCount(minCardsCount, maxCardsCount));
        }
    }

    const onPageChange = (page: number) => {
        dispatch(setPage(page));
    }

    if (!isLoggedIn) {
        return <Redirect to={PATH.LOGIN}/>
    }


    return (
        <div className={style.packContainer}>
            <div>
                <CheckBox id={"my packs"} children={"my packs"} onChange={onChangeMyPacks} checked={isMyPacks}/>
                <ModalAddUpdatePack buttonName={"Add"} _id={''} nameInit={''} isPrivateInit={false}/>
                <div>
                    Cards count:
                </div>
                <div>
                    Min - <Input value={minCardsCount} onChange={onChangeMinCardsCount}
                                 className={style.numberInput} onKeyPress={onPressKeyCardCount}/>
                </div>
                <div>
                    Max - <Input value={maxCardsCount} onChange={onChangeMaxCardsCount}
                                 onKeyPress={onPressKeyCardCount}/>
                </div>
                <div>
                    <Input value={searchValue} onChange={onChangeSearchValue} placeholder={"Search pack"}
                           onKeyPress={onPressKeySearch}/>
                </div>
            </div>
            <div>
                <Paginator pageCount={pageCount} portionSize={10} totalItemsCount={cardPacksTotalCount}
                           onPageChanges={onPageChange} currentPage={page}/>
                <div className={style.titlesBlock}>
                    <div>Name
                        <SortPacks btnName={"name"}/>
                    </div>
                    <div>Cards
                        <SortPacks btnName={"cardsCount"}/>
                    </div>
                    <div>Last update
                        <SortPacks btnName={"updated"}/>
                    </div>
                    <div>Delete</div>
                    <div>Update</div>
                    <div>Cards</div>
                </div>
                <div>
                    {cardsPacks.map((pack) => {

                        let date = new Date(pack.updated);
                        let options = new Intl.DateTimeFormat("en", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                        });
                        const time = options.format(date);
                        const onClickCards = () => {
                            history.push(`/cards/${pack._id}`)
                        }

                        return <div className={style.packsBlock} key={pack._id}>
                            <div>  {pack.name} </div>
                            <div>  {pack.cardsCount} </div>
                            <div>  {time} </div>
                            <ModalDeletePack name={pack.name} _id={pack._id}/>
                            <ModalAddUpdatePack buttonName={"Update"} _id={pack._id}
                                                nameInit={pack.name} isPrivateInit={pack.private}/>
                            <div>
                                <Button onClick={onClickCards} buttonStyle={"secondary"} children={"Cards"}/>
                            </div>
                        </div>

                    })}
                </div>

            </div>


        </div>
    )
}

export default Packs;
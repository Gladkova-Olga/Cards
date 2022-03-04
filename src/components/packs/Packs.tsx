import style from './Packs.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store";
import {PackType} from "../../dal/api";
import {ChangeEvent, KeyboardEvent, useEffect, useState} from "react";
import {
    fetchPacks,
    setCardsCount,
    setMyPacks,
    setPackName,
} from "../../bll/packsReducer";
import ModalAddUpdatePack from "./ModalAddUpdatePack";
import {Redirect, useHistory} from "react-router-dom";
import {PATH} from "../routes/Routes";
import ModalDeletePack from "./ModalDeletePack";
import CheckBox from "../common/checkBox/CheckBox";
import Button from "../common/button/Button";
import Input from "../common/input/Input";

const Packs = () => {
    const cardsPacks = useSelector<AppStoreType, PackType[]>(state => state.packs.cardPacks);
    const isMyPacks = useSelector<AppStoreType, boolean>(state => state.packs.isMyPacks);
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn);
    const minCards = useSelector<AppStoreType, number>(state => state.packs.minCardsCount);
    const maxCards = useSelector<AppStoreType, number>(state => state.packs.maxCardsCount);
    const packName = useSelector<AppStoreType, string>(state => state.packs.packName);


    const [minCardsCount, setMinCardsCount] = useState(0);
    const [maxCardsCount, setMaxCardsCount] = useState(100);
    const [searchValue, setSearchValue] = useState("");

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchPacks())
    }, [isMyPacks, minCards, maxCards, packName]);

    const onChangeMyPacks = () => {
        dispatch(setMyPacks(!isMyPacks));
        // dispatch(fetchPacks());
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
    // const onClickShow = () => {
    //     dispatch(setAllPacksData(10, maxCardsCount, minCardsCount, 1, 10));
    //     // dispatch(fetchPacks());
    // }

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
                {/*<Button buttonStyle={"primary"} children={"Show"} onClick={onClickShow}/>*/}
                <div>
                    <Input value={searchValue} onChange={onChangeSearchValue} placeholder={"Search pack"}
                           onKeyPress={onPressKeySearch}/>
                </div>
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
    )
}

export default Packs;
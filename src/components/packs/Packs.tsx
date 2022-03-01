import style from './Packs.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store";
import {PackType} from "../../dal/api";
import {useEffect} from "react";
import {fetchPacks, setMyPacks} from "../../bll/packsReducer";
import ModalAddUpdatePack from "./ModalAddUpdatePack";
import {Redirect, useHistory} from "react-router-dom";
import {PATH} from "../routes/Routes";
import ModalDeletePack from "./ModalDeletePack";
import CheckBox from "../common/checkBox/CheckBox";
import Button from "../common/button/Button";

const Packs = () => {
    const cardsPacks = useSelector<AppStoreType, PackType[]>(state => state.packs.cardPacks);
    const isMyPacks = useSelector<AppStoreType, boolean>(state => state.packs.isMyPacks);
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchPacks())
    }, []);

    const onChangeMyPacks = () => {
        dispatch(setMyPacks(!isMyPacks));
        dispatch(fetchPacks());
    }

    if (!isLoggedIn) {
        return <Redirect to={PATH.LOGIN}/>
    }


    return (
        <div>
            <CheckBox id={"my packs"} children={"my packs"} onChange={onChangeMyPacks} checked={isMyPacks}/>
            <ModalAddUpdatePack buttonName={"Add"} _id={''} nameInit={''} isPrivateInit={false}/>
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
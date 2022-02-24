import style from './Packs.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store";
import {PackType} from "../../dal/api";
import {useEffect} from "react";
import {fetchPacks, setMyPacks} from "../../bll/packsReducer";
import ModalAddPack from "./ModalAddPack";
import {Redirect} from "react-router-dom";
import {PATH} from "../routes/Routes";
import ModalDeletePack from "./ModalDeletePack";

const Packs = () => {
    const cardsPacks = useSelector<AppStoreType, PackType[]>(state => state.packs.cardPacks);
    const isMyPacks = useSelector<AppStoreType, boolean>(state => state.packs.isMyPacks);
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPacks())
    }, []);
    const onChangeMyPacks = () => {
        dispatch(setMyPacks(!isMyPacks));
        dispatch(fetchPacks());
    }
    if(!isLoggedIn) {
        return <Redirect to={PATH.LOGIN}/>
    }


    return (
        <div>
            <input type={"checkbox"} onChange={onChangeMyPacks} checked={isMyPacks}/> <label>my packs</label>
            <ModalAddPack/>
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

                    return <div className={style.packsBlock} key={pack._id}>
                        <div>  {pack.name} </div>
                        <div>  {pack.cardsCount} </div>
                        <div>  {time} </div>
                        <ModalDeletePack name={pack.name} _id={pack._id}/>
                        <div>  <button>update</button> </div>
                        <div>  Cards </div>
                    </div>

                })}
            </div>



        </div>
    )
}

export default Packs;
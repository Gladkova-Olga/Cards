import style from './Cards.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store";
import {useEffect} from "react";
// import ModalAddUpdatePack from "./ModalAddUpdatePack";
import {Redirect} from "react-router-dom";
import {PATH} from "../routes/Routes";
import {CardType} from "../../dal/api";
// import ModalDeletePack from "./ModalDeletePack";

const Cards = () => {
    const dispatch = useDispatch();

    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn);
    const cards = useSelector<AppStoreType, CardType[]>(state => state.cards.cards);

    return(
        <div>

        </div>
    )
//     const cardsPacks = useSelector<AppStoreType, PackType[]>(state => state.packs.cardPacks);
//     const isMyPacks = useSelector<AppStoreType, boolean>(state => state.packs.isMyPacks);
//     const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn);
//     const dispatch = useDispatch();
//     useEffect(() => {
//         dispatch(fetchPacks())
//     }, []);
//     const onChangeMyPacks = () => {
//         dispatch(setMyPacks(!isMyPacks));
//         dispatch(fetchPacks());
//     }
//     if(!isLoggedIn) {
//         return <Redirect to={PATH.LOGIN}/>
//     }
//
//
//     return (
//         <div>
//             <input type={"checkbox"} onChange={onChangeMyPacks} checked={isMyPacks}/> <label>my packs</label>
//             <ModalAddUpdatePack buttonName={"Add"} _id={''} nameInit={''} isPrivateInit={false}/>
//             <div>
//                 {cardsPacks.map((pack) => {
//                     let date = new Date(pack.updated);
//                     let options = new Intl.DateTimeFormat("en", {
//                         year: "numeric",
//                         month: "numeric",
//                         day: "numeric",
//                         hour: "numeric",
//                         minute: "numeric",
//                     });
//                     const time = options.format(date);
//
//                     return <div className={style.packsBlock} key={pack._id}>
//                         <div>  {pack.name} </div>
//                         <div>  {pack.cardsCount} </div>
//                         <div>  {time} </div>
//                         <ModalDeletePack name={pack.name} _id={pack._id}/>
//                         <ModalAddUpdatePack buttonName={"Update"} _id={pack._id}
//                                             nameInit={pack.name} isPrivateInit={pack.private}/>
//                         <div>  Cards </div>
//                     </div>
//
//                 })}
//             </div>
//
//
//
//         </div>
//     )
}

export default Cards;
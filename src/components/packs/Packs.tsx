import style from './Packs.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store";
import {PackType} from "../../dal/api";
import {useEffect} from "react";
import {fetchPacks} from "../../bll/packsReducer";

const Packs = () => {
    const cardsPacks = useSelector<AppStoreType, PackType[]>(state => state.packs.cardPacks);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPacks())
    }, []);

    return (
        <div>
            <input type={"checkbox"}/> <label>my packs</label>
            <button>Add</button>
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

                    return <div className={style.packsBlock}>
                        <div>  {pack.name} </div>
                        <div>  {pack.cardsCount} </div>
                        <div>  {time} </div>
                        <div>  <button>delete</button> </div>
                        <div>  <button>update</button> </div>
                        <div>  Cards </div>
                    </div>

                })}
            </div>



        </div>
    )
}

export default Packs;
import React, {ChangeEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {setPageCount} from "../../../bll/packsReducer";
import Button from "../button/Button";
import style from "./Paginator.module.css"

type PropsType = {
    pageCount: number
    totalItemsCount: number
    portionSize: number
    onPageChanges: (page: number) => void
    currentPage: number
}

const Paginator: React.FC<PropsType> = ({pageCount, totalItemsCount,
                                            portionSize, onPageChanges, currentPage}) => {
    const dispatch = useDispatch();
    const onChangePageCount = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setPageCount(+e.target.value))
    };
    const allPagesCount = Math.ceil(totalItemsCount / pageCount);
    const pages = [];
    for (let i = 1; i <= allPagesCount; i++) {
        pages.push(i);
    }
    console.log(`totalItemsCount = ${totalItemsCount}, pageCount = ${pageCount}`)
    const portionCount = Math.ceil(allPagesCount / portionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;
    const onClickPrev = () => {
        setPortionNumber(portionNumber - 1);
    }
    const onClickNext = () => {
        setPortionNumber(portionNumber + 1);
    }


return (
    <div>
        <select name={"pageCount"} id={"pageCount"} value={pageCount.toString()} onChange={onChangePageCount}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
        </select>
        <div className={style.paginator}>
            <button name={"prev"} onClick={onClickPrev} disabled={portionNumber <= 1}>prev</button>
            {pages
                .filter(p => p === 1 || p >= leftPortionPageNumber && p <= rightPortionPageNumber || p === allPagesCount)
                .map(p => {
                    return (
                        <span className={p === currentPage ? style.selectedPage : style.pageNumber} key={p}
                              onClick={() => onPageChanges(p)} >{p}</span>
                )
            })
            }
            <button name={"next"} onClick={onClickNext} disabled={portionNumber >= portionCount}>next</button>
        </div>

    </div>
)
}

export default Paginator;
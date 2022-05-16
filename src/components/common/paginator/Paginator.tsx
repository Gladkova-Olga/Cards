import React, {ChangeEvent, useState} from "react";
import style from "./Paginator.module.css"

type PropsType = {
    pageCount: number
    totalItemsCount: number
    portionSize: number
    onPageChanges: (page: number) => void
    currentPage: number
    onSwitchPageCount: (pageCount: number) => void
}

const Paginator: React.FC<PropsType> = ({
                                            pageCount, totalItemsCount,
                                            portionSize, onPageChanges, currentPage, onSwitchPageCount
                                        }) => {
    const onChangePageCount = (e: ChangeEvent<HTMLSelectElement>) => {
        onSwitchPageCount(+e.target.value);
    };
    const allPagesCount = Math.ceil(totalItemsCount / pageCount);
    const pages = [];
    for (let i = 1; i <= allPagesCount; i++) {
        pages.push(i);
    }
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
        <div className={style.paginatorBlock}>
            <div>
                <span className={style.label}>items per page</span>

                <select name={"pageCount"} id={"pageCount"} value={pageCount.toString()} onChange={onChangePageCount}
                        className={style.select}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                    <option value={50}>50</option>
                </select>
            </div>
            <div className={style.paginator}>
                {portionNumber > 1 ?
                    <button name={"prev"} onClick={onClickPrev}  className={style.btn}>prev
                    </button> : ""

                }

                {/*<button name={"prev"} onClick={onClickPrev} disabled={portionNumber <= 1} className={style.btn}>prev*/}
                {/*</button>*/}
                {pages
                    .filter(p => p === 1 || p >= leftPortionPageNumber && p <= rightPortionPageNumber || p === allPagesCount)
                    .map(p => {
                        return (
                            <span className={p === currentPage ? style.selectedPage : style.pageNumber} key={p}
                                  onClick={() => onPageChanges(p)}>{p}</span>
                        )
                    })
                }
                {portionNumber < portionCount ?
                    <button name={"next"} onClick={onClickNext} disabled={portionNumber >= portionCount}
                            className={style.btn}>
                        next
                    </button> : ""}
                {/*<button name={"next"} onClick={onClickNext} disabled={portionNumber >= portionCount}*/}
                {/*        className={style.btn}>*/}
                {/*    next*/}
                {/*</button>*/}
            </div>

        </div>
    )
}

export default Paginator;
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import CheckBox from "../../common/checkBox/CheckBox";
import Input from "../../common/input/Input";
import style from "../Packs.module.css";
import {setPackName} from "../../../bll/packsReducer";
type PropsType = {
    isMyPacks: boolean
    onChangeMyPacks: (isMyPack: boolean) => void
    onPressKeyCardCount: (minCardsCount: number, maxCardsCount: number) => void
    onPressKeySearch: (searchValue: string) => void
}

const PacksSettings: React.FC<PropsType> = ({isMyPacks, onChangeMyPacks,
                                                onPressKeyCardCount, onPressKeySearch }) => {
    const [minCardsCount, setMinCardsCount] = useState(0);
    const [maxCardsCount, setMaxCardsCount] = useState(1000);
    const [searchValue, setSearchValue] = useState("");
    const onChangeMinCardsCount = (e: ChangeEvent<HTMLInputElement>) => {
        setMinCardsCount(+e.target.value);

    }
    const onChangeMaxCardsCount = (e: ChangeEvent<HTMLInputElement>) => {
        setMaxCardsCount(+e.target.value);
    }
    const onChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }
    const onPressEnterSearch = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onPressKeySearch(searchValue);
        }
    }
    const onPressEnterCardCount = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onPressKeyCardCount(minCardsCount, maxCardsCount);
        }
    }


    return (
        <>
            <CheckBox id={"my packs"} children={"my packs"}
                      onChange={(e) => onChangeMyPacks(e.target.checked)}
                      checked={isMyPacks}/>
            <div>
                Cards count:
            </div>
            <div>
                Min - <Input value={minCardsCount} onChange={onChangeMinCardsCount}
                             className={style.numberInput} onKeyPress={onPressEnterCardCount}/>
            </div>
            <div>
                Max - <Input value={maxCardsCount} onChange={onChangeMaxCardsCount}
                             onKeyPress={onPressEnterCardCount}/>
            </div>
            <div>
                <Input value={searchValue} onChange={onChangeSearchValue} placeholder={"Search pack"}
                       onKeyPress={onPressEnterSearch}/>
            </div>
        </>
    )
}
export default PacksSettings;
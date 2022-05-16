import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import CheckBox from "../../common/checkBox/CheckBox";
import Input from "../../common/input/Input";
import style from "./PacksSettings.module.css";

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
                      checked={isMyPacks} />
            <div>
                <Input value={searchValue} onChange={onChangeSearchValue} placeholder={"Search pack"}
                       onKeyPress={onPressEnterSearch} className={style.item}/>
            </div>
            <div>
                Cards count:
            </div>
            <div>
                <Input value={minCardsCount} onChange={onChangeMinCardsCount}
                            className={style.numberInput}  onKeyPress={onPressEnterCardCount}/> - min
            </div>
            <div>
                <Input className={style.numberInput} value={maxCardsCount} onChange={onChangeMaxCardsCount}
                             onKeyPress={onPressEnterCardCount}/>  - max
            </div>

        </>
    )
}
export default PacksSettings;
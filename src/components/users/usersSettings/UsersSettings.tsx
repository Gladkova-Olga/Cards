import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Input from "../../common/input/Input";
import style from "./UserSettings.module.css"


type PropsType = {
    onPressKeyPacksCount: (minPacksCount: number, maxPacksCount: number) => void
    onPressKeySearch: (searchValue: string) => void
}

const UsersSettings: React.FC<PropsType> = ({onPressKeyPacksCount, onPressKeySearch}) => {
    const [minPacksCount, setMinPacksCount] = useState(0);
    const [maxPacksCount, setMaxPacksCount] = useState(1000);
    const [searchValue, setSearchValue] = useState("");

    const onChangeMinPacksCount = (e: ChangeEvent<HTMLInputElement>) => {
        setMinPacksCount(+e.target.value);
    }
    const onChangeMaxPacksCount = (e: ChangeEvent<HTMLInputElement>) => {
        setMaxPacksCount(+e.target.value);
    }
    const onChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }
    const onPressEnterSearch = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onPressKeySearch(searchValue);
        }
    }
    const onPressEnterPacksCount = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onPressKeyPacksCount(minPacksCount, maxPacksCount);
        }
    }
    const onBlurPackCountHandler = () => {
        onPressKeyPacksCount(minPacksCount, maxPacksCount);
    }
    const onBlurSearchHandler = () => {
        onPressKeySearch(searchValue);
    }

    return (
        <>
            <div>
                <Input value={searchValue} onChange={onChangeSearchValue} placeholder={"Search user"}
                       onKeyPress={onPressEnterSearch} onBlur={onBlurSearchHandler} className={style.item}/>
            </div>
            <div>
                Public packs:
            </div>
            <div>
                <Input value={minPacksCount} onChange={onChangeMinPacksCount} className={style.numberInput}
                       onKeyPress={onPressEnterPacksCount} onBlur={onBlurPackCountHandler}/> - min
            </div>
            <div>
                <Input value={maxPacksCount} onChange={onChangeMaxPacksCount} className={style.numberInput}
                       onKeyPress={onPressEnterPacksCount} onBlur={onBlurPackCountHandler}/> - max
            </div>

        </>
    )
}
export default UsersSettings;
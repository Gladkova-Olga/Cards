import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Input from "../common/input/Input";



type PropsType = {
    onPressKeyPacksCount: (minPacksCount: number, maxPacksCount: number) => void
    onPressKeySearch: (searchValue: string) => void
}

const UsersSettings: React.FC<PropsType> = ({onPressKeyPacksCount, onPressKeySearch }) => {
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
                Public packs:
            </div>
            <div>
                Min - <Input value={minPacksCount} onChange={onChangeMinPacksCount}
                              onKeyPress={onPressEnterPacksCount} onBlur={onBlurPackCountHandler}/>
            </div>
            <div>
                Max - <Input value={maxPacksCount} onChange={onChangeMaxPacksCount}
                             onKeyPress={onPressEnterPacksCount} onBlur={onBlurPackCountHandler}/>
            </div>
            <div>
                <Input value={searchValue} onChange={onChangeSearchValue} placeholder={"Search user"}
                       onKeyPress={onPressEnterSearch} onBlur={onBlurSearchHandler}/>
            </div>
        </>
    )
}
export default UsersSettings;
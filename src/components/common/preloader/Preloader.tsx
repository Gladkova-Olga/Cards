import loader from "../../../assets/images/loader.gif"
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../bll/store";

const Preloader = () => {
    const appStatus = useSelector<AppStoreType, number>(state => state.app.appStatus);
    return (
        <div>
            {appStatus !== 0 && <img src={loader}/>}
        </div>
    )
}
export default Preloader;
import axios, {AxiosResponse} from "axios"

const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0/",
    // baseURL: "http://localhost:7542/2.0/",
    withCredentials: true
})

type UserDataType = {
    _id: string,
    email: string,
    isAdmin: boolean,
    name: string,
    publicCardPacksCount: number,
    rememberMe: boolean,
    avatar?: string
}

export const authAPI = {
    login( email: string, password: string, rememberMe: boolean) {
        const payload = {
            email,
            password,
            rememberMe
        };
        return (
            instance.post<{email:string, password: string, rememberMe: boolean}, AxiosResponse<UserDataType>>("auth/login", payload)
        )
    },
}
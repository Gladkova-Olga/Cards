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
    login(email: string, password: string, rememberMe: boolean) {
        const payload = {
            email,
            password,
            rememberMe
        };
        return (
            instance.post<typeof payload, AxiosResponse<UserDataType>>("auth/login", payload)
        )
    },
    signUp(email: string, password: string) {
        const payload = {
            email,
            password
        };
        return (
            instance.post<typeof payload, AxiosResponse<any>>('auth/register', payload)
        )

},
    logout(){
        return instance.delete<{}, AxiosResponse<any>>('/auth/me')
    },
    restorePassword(email: string) {
        const payload = {
            email,
            from:  "test-front-admin <olga_gladkova@tut.by>",
            message: `<div style="background-color: #a3c486; padding: 10px">
                        password recovery link: 
                        <a href='https://Gladkova-Olga.github.io/Cards/#/enter-new-password/$token$'>
                        link gh-pages</a></div>`
        }
        return instance.post<typeof payload, AxiosResponse<any>>('/auth/forgot', payload)
    },
  setNewPassword(password: string, resetPasswordToken: string) {
        const payload = {
            password,
            resetPasswordToken
        }
        return instance.post<typeof payload, AxiosResponse<any> >('/auth/set-new-password', payload)
  },


}
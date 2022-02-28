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
export type PackType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
    private: boolean
}
export type PacksResponseType = {
    cardPacks: PackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}
export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    user_id: string
    created: string
    updated: string
    _id: string
}
export type CardsResponseType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
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
    logout() {
        return instance.delete<{}, AxiosResponse<any>>('/auth/me')
    },
    restorePassword(email: string) {
        const payload = {
            email,
            from: "test-front-admin <olga_gladkova@tut.by>",
            message: `<div style="padding: 10px">
                       <div>Password recovery link: </div> 
<!--                        <a href='https://Gladkova-Olga.github.io/Cards/#/enter-new-password/$token$'>-->
                        <a href='localhost:3000//Cards/#/enter-new-password/$token$'>
                        Click here</a></div>`
        }
        return instance.post<typeof payload, AxiosResponse<any>>('/auth/forgot', payload)
    },
    setNewPassword(password: string, resetPasswordToken: string) {
        const payload = {
            password,
            resetPasswordToken
        }
        return instance.post<typeof payload, AxiosResponse<any>>('/auth/set-new-password', payload)
    },
    me() {
        return instance.post<{}, AxiosResponse<UserDataType>>('auth/me')
    },
    updateUserData(name: string, avatar: string) {
        const payload = {
            name, avatar
        }
        return instance.put<typeof payload, AxiosResponse<{ updatedUser: UserDataType }>>('auth/me', payload)
    }

}
export const packsApi = {
    getPacks(user_id: string, isMyPacks: boolean) {
        let user_idToUrl = '';
        if (isMyPacks) {
            user_idToUrl = `&user_id=${user_id}`
        }
        const pageCount = 1000;
        return instance.get<{}, AxiosResponse<PacksResponseType>>(`cards/pack?pageCount=${pageCount}` + user_idToUrl)
    },
    addPack(name: string, isPrivate: boolean) {
        const payload = {
            cardsPack: {
                name,
                private: isPrivate
            }
        }
        return instance.post<typeof payload, AxiosResponse<PackType>>('cards/pack', payload)
    },
    deletePack(_id: string) {
        return instance.delete<{}, AxiosResponse<PackType>>(`cards/pack?id=${_id}`)
    },
    updatePack(_id: string, name: string, isPrivate: boolean) {
            const payload = {
                cardsPack: {
                    _id,
                    name,
                    private: isPrivate
                }
            }
        return instance.put<typeof payload, AxiosResponse<PackType>>(`cards/pack`, payload)

    }
}

export const cardsAPI = {
    getCards(cardsPack_id: string) {
        return instance.get<{}, AxiosResponse<CardsResponseType>>(`cards/card?cardsPack_id=${cardsPack_id}`)
    },
    addCard(cardsPack_id: string, question: string, answer: string, grade: number) {
        const payload = {
            card: {
                cardsPack_id, question, answer, grade
            }
        }
        return instance.post<typeof payload, AxiosResponse<CardType>>(`cards/card`, payload)
    },
    updateCard(_id: string, cardsPack_id: string, question: string, answer: string, grade: number) {
        const payload = {
            card: {
               _id, cardsPack_id, question, answer, grade
            }
        }
        return instance.put<typeof payload, AxiosResponse<CardType>>(`cards/card`, payload)
    },
    deleteCard(_id: string) {
        return instance.delete<{}, AxiosResponse<CardType>>(`cards/card?id=${_id}`)
    },
}

import { action, computed, makeAutoObservable } from 'mobx'
import { User } from '../interfaces/models'

export default class UserStore {
    private _isAuth: boolean = false
    private _user: User = {} as User
    private _id = ''

    constructor() {
        makeAutoObservable(this)
    }

    @action
    setIsAuth(value: boolean) {
        this._isAuth = value
    }

    @action
    setUser(user: User) {
        this._user = user
    }

    @action
    setId(value: string) {
        this._id = value
    }

    @computed
    get isAuth() {
        return this._isAuth
    }

    @computed
    get user() {
        return this._user
    }

    @computed
    get id() {
        return this._id
    }
}

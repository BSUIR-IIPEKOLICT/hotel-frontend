import { action, computed, makeAutoObservable } from 'mobx'
import { User } from '../interfaces/models'

export default class UserStore {
    private _isAuth: boolean = false
    private _user: User = {} as User

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

    @computed
    get isAuth() {
        return this._isAuth
    }

    @computed
    get user() {
        return this._user
    }
}

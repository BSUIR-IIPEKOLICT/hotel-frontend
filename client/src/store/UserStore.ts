import {action, computed, makeAutoObservable} from 'mobx'
import {User} from '../interfaces/models'

export default class UserStore {

    private _isAuth: boolean
    private _user: User

    constructor() {
        this._isAuth = false
        this._user = {} as User
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

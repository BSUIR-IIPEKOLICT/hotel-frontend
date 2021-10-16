import {makeAutoObservable} from 'mobx'
import {User} from "../interfaces/models";

export default class UserStore {

    private _isAuth: boolean
    private _user: User

    constructor() {
        this._isAuth = false
        this._user = {} as User
        makeAutoObservable(this)
    }

    setIsAuth(value: boolean) {
        this._isAuth = value
    }

    setUser(user: User) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }
}

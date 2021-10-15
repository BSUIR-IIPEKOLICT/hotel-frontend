import {makeAutoObservable} from 'mobx'

export default class UserStore {

    private _isAuth: boolean
    private _role: string
    private _user: Object

    constructor() {
        this._isAuth = false
        this._user = {}
        this._role = ''
        makeAutoObservable(this)
    }

    setIsAuth(value: boolean) {
        this._isAuth = value
    }

    setUser(user: Object) {
        this._user = user
    }

    setRole(value: string) {
        this._role = value
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }

    get role() {
        return this._role
    }
}

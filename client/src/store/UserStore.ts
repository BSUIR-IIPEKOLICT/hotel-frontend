import { action, computed, makeObservable, observable } from 'mobx'
import { User } from '../interfaces/models'

export default class UserStore {
    @observable private _isAuth: boolean = false
    @observable private _user: User = {} as User
    @observable private _id = ''

    constructor() {
        makeObservable(this)
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

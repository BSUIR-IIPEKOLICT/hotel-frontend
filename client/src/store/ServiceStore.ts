import { action, computed, makeObservable, observable } from 'mobx'
import { Service } from '../interfaces/models'

export default class ServiceStore {
  @observable private _services: Service[] = []

  constructor() {
    makeObservable(this)
  }

  @action
  setServices(value: Service[]) {
    this._services = value
  }

  @action
  addService(service: Service) {
    this._services.push(service)
  }

  @action
  deleteService(id: string) {
    this._services = this._services.filter(({ _id }) => _id !== id)
  }

  @computed
  get services() {
    return this._services
  }
}

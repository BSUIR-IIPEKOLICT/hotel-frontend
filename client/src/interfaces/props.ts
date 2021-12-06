import {
  BasketPopulated,
  OrderPopulated,
  RoomPopulated,
} from './populatedModels'
import { Service, User } from './models'

export interface NavProps {
  toggleTheme(): void
}

export interface RoomInfoProps {
  room: RoomPopulated
}

export interface SelectProps {
  label?: string | number
  value?: string | number
  options: string[] | number[]
  values: string[] | number[]
  changeHandler(value: string): void
}

export interface RoomCardProps {
  room: RoomPopulated
  clickHandler(room: RoomPopulated): void
  isAdmin: boolean
}

export interface RoomServiceContainerProps {
  services: Service[]
  onChange(checked: boolean, service: Service): void
}

export interface RoomPriceContainerProps {
  value: number
}

export interface RoomBookContainerProps {
  selectOptions: string[]
  selectValues: number[]
  selectValue: number
  selectHandler(value: string): void
  bookHandler(): void
}

export interface PreloaderProps {
  isDark: boolean
}

export interface OrderCardProps {
  order: OrderPopulated
  onDelete(order: OrderPopulated): void
}

export interface BasketCardProps {
  basket: BasketPopulated
  onChangeRole(user: User): void
}

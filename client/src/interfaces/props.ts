import {RoomPopulated} from './populatedModels'

export interface NavProps {
    toggleTheme(): void
}

export interface RoomInfoProps {
    room: RoomPopulated
}

export interface SelectProps {
    label?: string | number,
    value?: string | number,
    options: string[] | number[],
    values: string[] | number[],
    changeHandler(value: string): void
}

export interface RoomCardProps {
    id: string,
    address: string,
    type: string,
    places: number,
    clickHandler(): void
}

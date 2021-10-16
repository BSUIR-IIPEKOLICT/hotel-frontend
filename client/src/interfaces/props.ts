export interface RoomCardProps {
    id: string,
    address: string,
    type: string,
    places: number,
    clickHandler(): void
}

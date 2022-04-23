import {
  Building,
  Comment,
  Option,
  Type,
  RoomPopulated,
  BookingPopulated,
  UserPopulated,
} from './models';
import { ChangeEvent } from 'react';

export interface LayoutProps {
  title: string;
}

export interface NavProps {
  toggleTheme(): void;
}

export interface RoomInfoProps {
  room: RoomPopulated;
}

export interface SelectProps {
  label?: string | number;
  value?: string | number;
  options: string[] | number[];
  values: string[] | number[];
  changeHandler(value: string): void;
}

export interface RoomCardProps {
  room: RoomPopulated;
  clickHandler(room: RoomPopulated): void;
  onChange(id: string): void;
  onDelete(id: string): void;
  isAdmin: boolean;
}

export interface RoomOptionContainerProps {
  options: Option[];
  checked: string[];
  onChange(checked: boolean, option: Option): void;
}

export interface RoomPriceContainerProps {
  value: number;
}

export interface RoomBookContainerProps {
  selectOptions: string[];
  selectValues: number[];
  selectValue: number;
  selectHandler(value: string): void;
  bookHandler(): void;
}

export interface PreloaderProps {
  isDark: boolean;
}

export interface BookingCardProps {
  order: BookingPopulated;
  onDelete(booking: BookingPopulated): void;
}

export interface UserCardProps {
  user: UserPopulated;
  // sortDate: Date;
  // onChangeRole(user: UserPopulated): void;
  // onChangeCredentials(user: UserPopulated): void;
  // onDelete(user: UserPopulated): void;
}

// export interface BasketCardProps {
//   basket: BasketPopulated;
//   sortDate: Date;
//   onChangeRole(user: User): void;
//   onDelete(basketId: string, userId: string): void;
// }

export interface DatePickerProps {
  onChange(value: Date | null): void;
}

export interface BuildingCardProps {
  building: Building;
  onChange(building: Building): void;
  onDelete(id: string): void;
}

export interface OptionCardProps {
  option: Option;
  onChange(option: Option): void;
  onDelete(id: string): void;
}

export interface PageButtonProps {
  title: string;
  path: string;
}

export interface TypeCardProps {
  type: Type;
  onChange(type: Type): void;
  onDelete(id: string): void;
}

export interface RoomCreateFormProps {
  loadRooms(): void;
}

export interface CommentCardProps {
  comment: Comment;
  isOwner: boolean;
  onChange(comment: Comment): void;
  onDelete(id: string): void;
}

export interface SpoilerProps {
  title: string;
}

export interface AuthFormProps {
  title: string;
  changeEmailHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  changePasswordHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface UsersPageProps {
  users: UserPopulated[];
}

export interface BuildingsPageProps {
  buildings: Building[];
}

export interface TypesPageProps {
  types: Type[];
}

export interface OptionsPageProps {
  options: Option[];
}

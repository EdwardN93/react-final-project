import { ReactNode } from "react";

export type Car = {
  id?: number;
  plateNumber?: string;
  carBrand?: string;
  carName?: string;
  vinNumber?: string;
  fuelType?: string;
  engineCapacity?: number | string;
  category?: string;
  department?: string;
  user?: string;
  status?: string;
  nextRevDate?: string | Date;
  kilometers?: string;
};

// li Element for SideNav
export type LiElementProps = {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
};

// ColProp for Landing.tsx
export type ColProp = {
  carDetail?: number | string | null | undefined | Date;
};

// User for account
export type User = {
  email?: string;
  firstName?: string;
  lastName?: string;
  id?: number;
  password?: string;
  reTypePassword?: string;
  role?: number | string;
};

export type AuthStateValue = {
  accessToken: null | string;
  user: null | User;
};

export type AuthContextValue = AuthStateValue & {
  login: (value: AuthResponse) => void;
  logout: (path: string) => void;
};

// O SINGURA SURSA DE ADEVAR !!
export type AuthResponse = {
  [K in keyof AuthStateValue]: NonNullable<AuthStateValue[K]>;
};

export type ModalProps = {
  title: string | null;
  message?: string | null;
  showCancelBtn?: boolean;
  confirmBtnMessage?: string;
  declineBtnMessage?: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

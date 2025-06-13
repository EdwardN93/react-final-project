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
  nextRevDate?: string;
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
  carDetail?: number | string | null | undefined;
};

// User for account
export type User = {
  email?: string;
  firstName?: string;
  lastName?: string;
  id?: number;
  password?: string;
  reTypePassword?: string;
};

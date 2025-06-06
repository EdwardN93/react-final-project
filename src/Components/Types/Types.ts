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
};

// li Element for SideNav
export type LiElementProps = {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
};

import {ImageSourcePropType} from 'react-native';

export interface FilterOptionsType {
  title: string | null;
  isSelected: boolean;
}

export interface CountryDataType {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
}

export interface UploadDetailsType {
  title: string | null;
  uri: string | null;
  emptyMessage: string | null;
}

// Static
export interface DashboardDataType {
  title: string | null;
  count: number;
  image: ImageSourcePropType;
}

export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  size: string;
}
export type OrderStatus =
  | 'pending'
  | 'accepted'
  | 'preparing'
  | 'prepared'
  | 'ontheway'
  | 'assigned driver';
export interface OrderRequests {
  orderNumber: string;
  totalAmount: number;
  date: string;
  customerName: string;
  items: {
    name: string;
    price: number;
    quantity: number;
    size: string;
  }[];
  status: OrderStatus;
  driverName?: string;
  driverMobile?: string;
  driverImage?: string;
}

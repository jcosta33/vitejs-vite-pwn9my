import { IInput } from '@/components/form';

export interface IUserCard {
  picture?: string;
  name: string;
  detail?: string;
  description?: string;
  isCompact?: boolean;
  redirect?: string;
  route?: string;
}

export interface IExhibitorCard {
  name: string;
  logo?: string;
  subtitle?: string;
  description?: string;
  route?: string;
}

export interface IEventCard {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  image?: string;
  route: string;
}

export interface ILoginInputs {
  email: IInput;
  password: IInput;
}

export const form = {
  email: '',
  password: '',
};

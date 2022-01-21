import { AxiosResponse } from 'axios';

export type Resolve<T> = (resolve: AxiosResponse<T>) => void;

export interface IData<T> {
    results: T[];
    item_count: number;
    page_count: number;
    current: number;
    next: number;
    previous: number;
    calendar_blocks?: string[];
}

export interface IParams {
    page?: number;
    page_size?: number;
    reset?: boolean;
}

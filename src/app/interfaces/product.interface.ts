export interface Product {
   id: number,
   name: string,
   img: string,
   price: number,
   quantity: number,
   selected: boolean,
   available: boolean
}

export enum DataStateEnum { LOADING, LOADED, ERROR }

export interface AppDataState<T> { dataState?: DataStateEnum, data?: T, errorMessage?: string }

export enum ProductActionEnum {
   GET_ALL_PRODUCTS,
   GET_SELECTED_PRODUCTS,
   GET_AVAILABLE_PRODUCTS,
   ADD_PRODUCT,
   SEARCH_PRODUCT,
   DELETE_PRODUCT,
   SELECT_PRODUCT,
   UPDATE_PRODUCT
}

export interface ActionEvent { type: ProductActionEnum, payload?: any }


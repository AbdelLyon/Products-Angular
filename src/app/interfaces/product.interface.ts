export interface Product {
   id: number,
   name: string,
   price: number,
   quantity: number,
   selected: boolean,
   available: boolean

}


export enum DataStateEnum {
   LOADING,
   LOADED,
   ERROR
}

export interface AppDataState<T> {
   dataState?: DataStateEnum,
   data?: T,
   errorMessage?: string
}
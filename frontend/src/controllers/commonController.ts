import storeAxios from "../storeAxios"
import { AxiosResponse } from "axios";

export interface CommonController<T> {

    uri: string,

    getAll: () => Promise<AxiosResponse<T[]>>
    get: (id: number) => Promise<AxiosResponse<T>>
    addNew: (newEntity: T) => Promise<AxiosResponse<T>>
    delete: (entity: T) => Promise<AxiosResponse<boolean>>
    update: (updateEntity: T) => Promise<AxiosResponse<T>>

}

export class commonControllerFactory<T> {
    create(uri: string){
        let controller: CommonController<T> = {
            uri,
    
            getAll: () => storeAxios.get<T[]>(`${uri}/get`),
    
            get: (id: number) => storeAxios.get<T>(`${uri}/get/${id}`),
    
            addNew: (newEntity: T) => storeAxios.post<T>(`${uri}/add`, { entity: newEntity }),
    
            delete: (entity: T) => storeAxios.post<boolean>(`${uri}/delete`, { entity: entity }),

            update: (updateEntity: T) => storeAxios.post<T>(`${uri}/update`, { entity: updateEntity }),

        }
        return controller;
    }
    
}
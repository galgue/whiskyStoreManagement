import { getConnection } from 'typeorm';

export const SqlQueryFactory = {
    create: <T>(
        query: string, 
        resultConvertor: (result: T[]) => {key: string, value: number}[]
        ) => 
        ({
            getResult: () =>{
            return getConnection().manager.query(query)
            .then((result: T[]) => 
                resultConvertor(result));
            }
        })
}
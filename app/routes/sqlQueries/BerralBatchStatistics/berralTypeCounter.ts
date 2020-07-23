import { SqlQueryFactory } from '../SqlQueryExecutor';

const query = 
    `SELECT BerralTypes.name AS name, COUNT(*) AS count
    FROM BerralBatchs
    INNER JOIN BerralTypes ON BerralBatchs.berralTypeId=BerralTypes.id 
    GROUP BY name
    `;

interface resultInterface {
    name: string,
    count: number,
}

const resultConvertor = (result: resultInterface[]) => 
    result.map(row => ({key: row.name, value: row.count}));


export const BerralTypeCounter = SqlQueryFactory.create(
    query,
    resultConvertor
)
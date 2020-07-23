import { SqlQueryFactory } from '../SqlQueryExecutor';

const query = 
    `SELECT BerralBatchs.spiritType AS name, COUNT(*) AS count
    FROM BerralBatchs
    GROUP BY name    
    `;

interface resultInterface {
    name: string,
    count: number,
}

const resultConvertor = (result: resultInterface[]) => 
    result.map(row => ({key: row.name, value: row.count}));


export const SpiritTypeCounter = SqlQueryFactory.create(
    query,
    resultConvertor
)
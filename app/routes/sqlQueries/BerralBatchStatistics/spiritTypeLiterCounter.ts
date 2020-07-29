import { SqlQueryFactory } from '../SqlQueryExecutor';

const query = 
    `SELECT BerralBatchs.spiritType AS name, SUM(BerralBatchs.quantityAtFill) AS count
    FROM BerralBatchs
    WHERE BerralBatchs.lastBerralBatchId IS NULL
    GROUP BY name    
    `;

interface resultInterface {
    name: string,
    count: number,
}

const resultConvertor = (result: resultInterface[]) => 
    result.map(row => ({key: row.name, value: row.count}));


export const SpiritTypeLiterCounter = SqlQueryFactory.create(
    query,
    resultConvertor
)
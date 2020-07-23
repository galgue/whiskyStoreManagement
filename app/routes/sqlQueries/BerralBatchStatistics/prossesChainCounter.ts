import { SqlQueryFactory } from '../SqlQueryExecutor';

const query = 
    `SELECT ProssesChains.name AS name, COUNT(*) AS count
    FROM BerralBatchs
    INNER JOIN ProssesChains ON BerralBatchs.prossesChainId=ProssesChains.id 
    GROUP BY name
    `;

interface resultInterface {
    name: string,
    count: number,
}

const resultConvertor = (result: resultInterface[]) => 
    result.map(row => ({key: row.name, value: row.count}));


export const ProssesChainCounter = SqlQueryFactory.create(
    query,
    resultConvertor
)
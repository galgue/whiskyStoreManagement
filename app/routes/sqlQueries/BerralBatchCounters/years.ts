import { SqlQueryFactory } from '../SqlQueryExecutor';

const query = 
    `SELECT YEAR(createdAt) AS year, COUNT(*) AS count
    FROM BerralBatchs
    GROUP BY year
    ORDER BY year DESC
    LIMIT 5
    `;

interface resultInterface {
    year: number,
    count: number,
}

const resultConvertor = (result: resultInterface[]) => 
    result.map(row => ({key: `${row.year}`, value: row.count}));


export const yearsCounter = SqlQueryFactory.create(
    query,
    resultConvertor
)
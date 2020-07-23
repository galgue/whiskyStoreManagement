import { SqlQueryFactory } from '../SqlQueryExecutor';

const query = 
    `SELECT MONTH(createdAt) AS month, YEAR(createdAt) AS year, COUNT(*) AS count
    FROM BerralBatchs
    GROUP BY month, year
    ORDER BY year DESC, month DESC
    LIMIT 5
    `;

interface resultInterface {
    month: number,
    year: number,
    count: number,
}

const resultConvertor = (result: resultInterface[]) => 
    result.map(row => ({key: `${row.month}/${row.year}`, value: row.count}));


export const monthsCounter = SqlQueryFactory.create(
    query,
    resultConvertor
)
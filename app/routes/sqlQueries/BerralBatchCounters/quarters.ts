import { SqlQueryFactory } from '../SqlQueryExecutor';

const query = 
    `SELECT QUARTER(createdAt) AS quarter, YEAR(createdAt) AS year, COUNT(*) AS count
    FROM BerralBatchs
    GROUP BY quarter, year
    ORDER BY year DESC, quarter DESC
    LIMIT 5
    `;

interface resultInterface {
    quarter: number,
    year: number,
    count: number,
}

const resultConvertor = (result: resultInterface[]) => 
    result.map(row => ({key: `Q${row.quarter}-${row.year}`, value: row.count}));


export const qurtersCounter = SqlQueryFactory.create(
    query,
    resultConvertor
)
import { SqlQueryFactory } from '../SqlQueryExecutor';

const query = 
    `SELECT MONTH(createdAt) AS month, YEAR(createdAt) AS year, COUNT(*) AS count
    FROM BerralBatchs
    WHERE MONTH(createdAt)=MONTH(NOW())-1 and YEAR(createdAt) = YEAR(NOW())
    GROUP BY month, year
    `;

interface resultInterface {
    count: number,
}

const resultConvertor = (result: resultInterface[]) => 
    result.map(row => ({key: 'count', value: row.count}));


export const lastMonthCounter = SqlQueryFactory.create(
    query,
    resultConvertor
)
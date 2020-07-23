import { SqlQueryFactory } from '../SqlQueryExecutor';

const query = 
    `SELECT MONTH(createdAt) AS month, YEAR(createdAt) AS year, COUNT(*) AS count
    FROM BerralBatchs
    WHERE MONTH(createdAt)=MONTH(NOW()) and YEAR(createdAt) = YEAR(NOW())
    GROUP BY month, year
    `;

interface resultInterface {
    month: number,
    year: number,
    count: number,
}

const resultConvertor = (result: resultInterface[]) => 
    result.map(row => ({key: `${row.month}/${row.year}`, value: row.count}));


export const thisMonthCounter = SqlQueryFactory.create(
    query,
    resultConvertor
)
import { lastMonthCounter } from './sqlQueries/BerralBatchCounters/lastMonth';
import { thisMonthCounter } from './sqlQueries/BerralBatchCounters/thisMonth';
import { SpiritTypeCounter } from './sqlQueries/BerralBatchStatistics/spiritTypeCounter';
import { ProssesChainCounter } from './sqlQueries/BerralBatchStatistics/prossesChainCounter';
import { BerralTypeCounter } from './sqlQueries/BerralBatchStatistics/berralTypeCounter';
import { yearsCounter } from './sqlQueries/BerralBatchCounters/years';
import { monthsCounter } from './sqlQueries/BerralBatchCounters/months';
import { qurtersCounter } from './sqlQueries/BerralBatchCounters/quarters';
import { getConnection } from 'typeorm';
import { EntityRoute, RouteFactory } from './RouteFactory';
import { BerralBatch } from '../entity/BerralBatch';
import { Express } from 'express';
import { auth } from './middleware/auth.middleware';

let router = RouteFactory.createRoute(BerralBatch, {
    relations: [
        "berralType",
        "prossesChain", 
        "prossesChain.prosses1",
        "prossesChain.prosses2",
        "prossesChain.prosses3",
        "prossesChain.prosses4",
        "missions",
        "notes",
        "uses",
    ],
    deletePointerEntities: (entity) => {
        delete entity.berralType;
        delete entity.prossesChain;
        delete entity.missions;
        delete entity.notes;
        delete entity.uses;
        return entity
    }
});

router.get('/count/:type', function(req, res, next) {
    const countType = req.param('type');
    let resultPromise: Promise<{key: string, value: number}[]> = null;
    switch(countType) {
        case 'quarters':
            resultPromise = qurtersCounter.getResult();
            break;
        case 'months':
            resultPromise = monthsCounter.getResult();
            break;
        case 'years':
            resultPromise = yearsCounter.getResult();
            break;
        default:
            res.send('not valid counter')
            return;
    }
    resultPromise.then(result => {
        res.send(result);
    })
    .catch(err => {
        next(err);
    })
})

router.get('/statistic/:type', function(req, res, next) {
    const countType = req.param('type');
    let resultPromise: Promise<{key: string, value: number}[]> = null;
    switch(countType) {
        case 'berral-type':
            resultPromise = BerralTypeCounter.getResult();
            break;
        case 'prosses-chain':
            resultPromise = ProssesChainCounter.getResult();
            break;
        case 'spirit-type':
            resultPromise = SpiritTypeCounter.getResult();
            break;
        default:
            res.send('not valid counter')
            return;
    }
    resultPromise.then(result => {
        res.send(result);
    })
    .catch(err => {
        next(err);
    })
})

router.get('/monthChange', function(req, res, next) {
    Promise.all([thisMonthCounter.getResult(), lastMonthCounter.getResult()])
    .then(result => {
            res.send({thisMonth: result[0][0]?.value | 0, lastMonth: result[1][0]?.value | 0});
    })
    .catch(err => {
        next(err);
    })
})

export const BerralBatchsRoute: EntityRoute = {
    router: () => router,
    uri: '/berral-batch',
}
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

const relations = [
    "berralType",
    "prossesChain", 
    "prossesChain.prosses1",
    "prossesChain.prosses2",
    "prossesChain.prosses3",
    "prossesChain.prosses4",
    "missions",
    "notes",
    "uses",
]

const deletePointerEntities = (entity: BerralBatch) => {
    delete entity.berralType;
    delete entity.prossesChain;
    delete entity.missions;
    delete entity.notes;
    delete entity.uses;
    return entity
}

let router = RouteFactory.createRoute(BerralBatch, {
    relations: relations,
    deletePointerEntities: deletePointerEntities,
});

router.get('/get-active/:batchId/:lastId', function(req, res, next) {
    const batchId = Number(req.param('batchId')) || -1;
    const lastId = Number(req.param('lastId')) || -1;
    getConnection().manager.find(BerralBatch, 
        { relations: relations })
        .then(results => results.filter((res => res.isActive && res.id !== batchId || res.id === lastId)))
        .then(results => {
            res.send(results);
    }).catch(err => {
        next(err); 
    })
})

const alterBatchIfHasLastBerral = async (batch: BerralBatch) => {
    if(batch.lastBerralBatchId == null) return batch;
    await getConnection().manager.findOne(BerralBatch, batch.lastBerralBatchId)
        .then(result => {
            const { prossesChainId, agingDuration, quantityAtFill, spiritType, ownership } = result;
            batch.prossesChainId = prossesChainId
            batch.agingDuration = agingDuration
            batch.quantityAtFill = quantityAtFill
            batch.spiritType = spiritType
            batch.ownership = ownership
        });
    return batch;
}

router.post('/save-batch', async(req, res, next) => {
    const berralBatch = await alterBatchIfHasLastBerral(deletePointerEntities(req.body.entity));
    getConnection().manager.save(BerralBatch, berralBatch)
        .then(result => {
            res.send(result);
        }).catch(err => {
            next(err);
        })
})

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
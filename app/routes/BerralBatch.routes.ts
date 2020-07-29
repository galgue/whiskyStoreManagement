import { SpiritTypeLiterCounter } from './sqlQueries/BerralBatchStatistics/spiritTypeLiterCounter';
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
    "prossesChain.prosses1.berralType",
    "prossesChain.prosses2",
    "prossesChain.prosses2.berralType",
    "prossesChain.prosses3",
    "prossesChain.prosses3.berralType",
    "prossesChain.prosses4",
    "prossesChain.prosses4.berralType",
    "missions",
    "notes",
    "uses",
    "lastBerralBatch",
    "lastBerralBatch.lastBerralBatch",
    "lastBerralBatch.lastBerralBatch.lastBerralBatch",
]

const deletePointerEntities = (entity: BerralBatch) => {
    delete entity.berralType;
    delete entity.prossesChain;
    delete entity.missions;
    delete entity.notes;
    delete entity.uses;
    return entity
}

const alterAllBeforeSend = (batches: BerralBatch[]) => {
    batches.forEach(batch => {
        if(batch.lastBerralBatchId === null){
            batch.placeInChain = 1;
            batch.berralTypeId = batch.prossesChain.prosses1.berralTypeId;
            batch.berralType = batch.prossesChain.prosses1.berralType;
         } else if((batch.lastBerralBatch = 
                    batches.find(batchToFind => batchToFind.id === batch.lastBerralBatchId)) && 
                    batch.lastBerralBatch.lastBerralBatchId === null){
                batch.placeInChain = 2;
                batch.prossesChainId = batch.lastBerralBatch.prossesChainId;
                batch.prossesChain = batch.lastBerralBatch.prossesChain;
                batch.spiritType = batch.lastBerralBatch.spiritType;
                batch.ownership = batch.lastBerralBatch.ownership;
                batch.quantityAtFill = batch.lastBerralBatch.quantityAtFill;
                batch.berralTypeId = batch.prossesChain.prosses2.berralTypeId;
                batch.berralType = batch.prossesChain.prosses2.berralType;
            } else if((batch.lastBerralBatch.lastBerralBatch = 
                        batches.find(batchToFind => batchToFind.id === batch.lastBerralBatch.lastBerralBatchId)) &&
                        batch.lastBerralBatch.lastBerralBatch.lastBerralBatchId === null){
                batch.placeInChain = 3;
                batch.prossesChainId = batch.lastBerralBatch.lastBerralBatch.prossesChainId;
                batch.prossesChain = batch.lastBerralBatch.lastBerralBatch.prossesChain;
                batch.spiritType = batch.lastBerralBatch.lastBerralBatch.spiritType;
                batch.ownership = batch.lastBerralBatch.lastBerralBatch.ownership;
                batch.quantityAtFill = batch.lastBerralBatch.lastBerralBatch.quantityAtFill;
                batch.berralTypeId = batch.prossesChain.prosses3.berralTypeId;
                batch.berralType = batch.prossesChain.prosses3.berralType;
            } else if((batch.lastBerralBatch.lastBerralBatch.lastBerralBatch = 
                        batches.find(batchToFind => batchToFind.id === batch.lastBerralBatch.lastBerralBatch.lastBerralBatchId))&&
                        batch.lastBerralBatch.lastBerralBatch.lastBerralBatch.lastBerralBatchId === null){
                batch.placeInChain = 4;
                batch.prossesChainId = batch.lastBerralBatch.lastBerralBatch.lastBerralBatch.prossesChainId;
                batch.prossesChain = batch.lastBerralBatch.lastBerralBatch.lastBerralBatch.prossesChain;
                batch.spiritType = batch.lastBerralBatch.lastBerralBatch.lastBerralBatch.spiritType;
                batch.ownership = batch.lastBerralBatch.lastBerralBatch.lastBerralBatch.ownership;
                batch.quantityAtFill = batch.lastBerralBatch.lastBerralBatch.lastBerralBatch.quantityAtFill;
                batch.berralTypeId = batch.prossesChain.prosses4.berralTypeId;
                batch.berralType = this.prossesChain.prosses4.berralType;
            }
    })

    return batches;
}

let router = RouteFactory.createRoute(BerralBatch, {
    relations: relations,
    deletePointerEntities: deletePointerEntities,
    alterBeforeSend: alterAllBeforeSend
});

const isLastInChain = (batch: BerralBatch) => {
    switch(batch.placeInChain){
        case 1:
            return batch.prossesChain.prosses2 === null
        case 2:
            return batch.prossesChain.prosses3 === null
        case 3:
            return batch.prossesChain.prosses4 === null
        default:
            return true  
    }
}

router.get('/get-active/:batchId/:lastId', function(req, res, next) {
    const batchId = Number(req.param('batchId')) || -1;
    const lastId = Number(req.param('lastId')) || -1;
    getConnection().manager.find(BerralBatch, 
        { relations: relations })
        .then(results => alterAllBeforeSend(results).filter(
            (res => !isLastInChain(res) && res.isActive && res.id !== batchId || res.id === lastId)))
        .then(results => {
            res.send(results);
    }).catch(err => {
        next(err); 
    })
})

const alterBatchIfHasLastBerral = async (batch: BerralBatch) => {
    if(batch.lastBerralBatchId == null) return batch;
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
        case 'spirit-type-liter':
            resultPromise = SpiritTypeLiterCounter.getResult();
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
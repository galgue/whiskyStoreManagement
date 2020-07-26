import { User } from './../entity/User';
import { verify } from 'jsonwebtoken';
import { getConnection } from 'typeorm';
import { EntityRoute, RouteFactory } from './RouteFactory';
import { Mission } from './../entity/Mission';

const relations = [
    "berralBatch",
    "creator",
    "executeBy",
    "berralBatch.berralType",
    "berralBatch.prossesChain",
    "berralBatch.prossesChain.prosses1",
    "berralBatch.prossesChain.prosses2",
    "berralBatch.prossesChain.prosses3",
    "berralBatch.prossesChain.prosses4",
];

let router = RouteFactory.createRoute(Mission, {
    relations: relations,
    deletePointerEntities: (entity) => {
        delete entity.berralBatch;
        delete entity.creator;
        delete entity.executeBy;
        return entity
    }
});

router.get('/user', function (req, res, next) {
    if(req.cookies?.session) {
        const { email }:{email: string, password: string}  = 
            verify(req.cookies?.session, 'drinkme') as {email: string, password: string};
        getConnection().manager.findOneOrFail(User, 
            { where: { email } })
            .then( userResult => {
                getConnection().manager.find(Mission, 
                { relations: relations, where: { executeById: userResult.id } })
                .then(results => {
                    res.send(results);
                }).catch(err => {
                    res.send([]);
                })
        }).catch(err => {
            res.send([]);
        })
        
    } else {
        res.send([]);
    }

});

export const MissionsRoute: EntityRoute = {
    router: () => router,
    uri: '/mission',
}
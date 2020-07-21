import { ProssesChain } from './../entity/ProssesChain';
import { CommonController, commonControllerFactory } from './commonController';

interface prossesChainProps extends CommonController<ProssesChain> {
}

export const ProssesChainController:prossesChainProps = {
    ...new commonControllerFactory<ProssesChain>().create('prosses-chain'),
}
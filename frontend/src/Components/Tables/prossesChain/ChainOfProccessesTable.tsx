import React, { useState } from 'react';
import { tableColumns } from './columns';
import { TableFactory } from '../TableFactory';
import { ProssesChainController } from '../../../controllers/prossesChain.controller';

export const ChainOfProccessesTable =
    TableFactory.create('ניהול שרשראות תהליכים', ProssesChainController, tableColumns);

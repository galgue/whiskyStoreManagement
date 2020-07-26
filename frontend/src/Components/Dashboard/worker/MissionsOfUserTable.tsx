import React, { useEffect, useState } from 'react'; 

import { MissionController } from '../../../controllers/mission.controller';
import { Mission } from '../../../entity/Mission';
import { MissonOfUserTable } from '../../Tables/Mission/MissonManagementTable';

export const MissionOfUserTable = ({height}:{height: number}) => {
    const [missions, setMissions] = useState<Mission[]>([]);

    return MissonOfUserTable(MissionController.getOfUser, height)();
};
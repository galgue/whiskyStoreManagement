import React, { useRef, useState, useEffect } from 'react';
import { Paper, Grid } from '@material-ui/core';
import { BarChart } from '../modules/BarChart';
import { ChartTitle } from '../modules/ChartTitle';
import { BerralBatchController, BerralBatchStatisticsBy } from '../../../controllers/berralBatch.controller';
import { PieChart } from '../modules/PieChart';

export const BerralBatchStatisticsPieChart = ({size}: {size: {width: number, height: number}}) => {
    
      const [data, setData] = useState<{[key: string] :{key: string, value: number}[]}>({
        'berral-type': [],
        'prosses-chain': [],
        'spirit-type': []
      });
      const [type, setType] = useState<BerralBatchStatisticsBy>('berral-type');

      const updateData = async () => {
        let allData:{[key: string] :{key: string, value: number}[]} = {
          'berral-type': [],
          'prosses-chain': [],
          'spirit-type': []
        };
        allData['berral-type'] = (await BerralBatchController.getStatistic('berral-type'));
        allData['prosses-chain'] = (await BerralBatchController.getStatistic('prosses-chain'));
        allData['spirit-type'] = (await BerralBatchController.getStatistic('spirit-type'));
        setData(allData);
      };
    
      useEffect(() => {
        updateData();
      }, [])

    return (
        <Paper style={{height: '100%'}}>
          <Grid container>
            <Grid item xs={12} style={{height: '30%'}}>
              <ChartTitle<BerralBatchStatisticsBy>
                title={"סטטיסטיקת אצוות חבית לפי"}
                selections={[
                  {key: 'סוג חבית', value: 'berral-type'},
                  {key: 'שרשרת תהליכים', value: 'prosses-chain'},
                  {key: 'סוג תזקיק', value: 'spirit-type'},
                ]}
                selection={type}
                onSelectionChange={(selection) => setType(selection)}
                />
            </Grid>
            <Grid item xs={12} style={{height: '70%'}}>
              {type === 'berral-type' && <PieChart
                  data={data['berral-type']}
                  size={size}
                  />}
                {type === 'prosses-chain' && <PieChart
                  data={data['prosses-chain']}
                  size={size}
                  />}
                {type === 'spirit-type' && <PieChart
                  data={data['spirit-type']}
                  size={size}
                  />}
            </Grid>
        </Grid>
        </Paper>

  )

}
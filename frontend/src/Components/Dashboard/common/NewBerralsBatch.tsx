import React, { useState, useEffect } from 'react';
import { Paper, Grid } from '@material-ui/core';
import { BarChart } from './../modules/BarChart';
import { ChartTitle } from './../modules/ChartTitle';
import { BerralBatchController, BerralBatchCounterBy } from '../../../controllers/berralBatch.controller';

export const NewBerralBatchesChart = () => {
    
        const [data, setData] = useState<{[key: string] :{key: string, value: number}[]}>({
          'quarters': [],
          'months': [],
          'years': []
        });
        const [type, setType] = useState<BerralBatchCounterBy>('quarters');

        const updateData = async () => {
          let allData:{[key: string] :{key: string, value: number}[]} = {
            'quarters': [],
            'months': [],
            'years': []
          };
          allData['quarters'] = (await BerralBatchController.getCount('quarters'));
          allData['months'] = (await BerralBatchController.getCount('months'));
          allData['years'] = (await BerralBatchController.getCount('years'));
          setData(allData);
        };    
      useEffect(() => {
        updateData();
      }, [type])

    return (
      <div style={{height: '100%', width: '100%'}}>
      <Grid container direction="row"
            justify="center"
            alignItems="stretch" style={{height: '100%', width: '100%'}}>
            <Grid item xs={12} style={{height: '10%'}}>
              <ChartTitle<BerralBatchCounterBy>
                title={"כמות אצוות חבית לפי"}
                selections={[
                  {key: 'רבעונים', value: 'quarters'},
                  {key: 'חודשים', value: 'months'},
                  {key: 'שנים', value: 'years'},
                ]}
                selection={type}
                onSelectionChange={(selection) => setType(selection)}
                />
            </Grid>
            <Grid item xs={12} style={{}}>
              {type === 'quarters' && <BarChart
                  data={data['quarters']}
                  />}
                {type === 'months' && <BarChart
                  data={data['months']}
                  />}
                {type === 'years' && <BarChart
                  data={data['years']}
                  />}
            </Grid>
        </Grid>
        </div>

  )

}
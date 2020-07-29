import React, { useState, useEffect } from 'react';
import { Paper, Grid } from '@material-ui/core';
import { ChartTitle } from '../modules/ChartTitle';
import { BerralBatchController, BerralBatchStatisticsBy } from '../../../controllers/berralBatch.controller';
import { BerralBatch } from '../../../entity/BerralBatch';
import { BarChart } from '../modules/BarChart';
import { PieChart } from '../modules/PieChart';

export const BerralBatchChart = () => {
    
      const [data, setData] = useState<{key: string, value: number}[]>([]);

      const updateData = async (chainsData: BerralBatch[]) => {
        let starter: {[key: string]: number} = {};
        const result = chainsData.reduce(function(rv, x) {
          if(!rv[x.agingDuration.toString()]){
            rv[x.agingDuration.toString()] = 0;
          }
          rv[x.agingDuration.toString()] += 1;
          return rv;
        }, starter);
        
        setData(Object.entries(result).map(entry => ({key: entry[0], value: entry[1]})));
      };
    
      useEffect(() => {
        BerralBatchController.getAll().then((respond) => {
          updateData(respond.data);
        })
      }, [])

    return (
        <div style={{height: '100%', width: '100%'}}>
          <Grid container direction="row"
                justify="center"
                alignItems="stretch" style={{height: '100%', width: '100%'}}>
            <Grid item xs={12} style={{height: '10%'}}>
              <ChartTitle<BerralBatchStatisticsBy>
                title={"אצוות חבית לפי זמן ישון"}
                />
            </Grid>
            <Grid item xs={12}  
            container direction="row"
            justify="center"
            alignItems="center"
            >
              <BarChart data={data}/>
            </Grid>
        </Grid>
        </div>

  )

}
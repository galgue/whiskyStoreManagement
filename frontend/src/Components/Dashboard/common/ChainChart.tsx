import React, { useRef, useState, useEffect } from 'react';
import { Paper, Grid } from '@material-ui/core';
import { ChartTitle } from '../modules/ChartTitle';
import { BerralBatchController, BerralBatchStatisticsBy } from '../../../controllers/berralBatch.controller';
import { PieChart } from '../modules/PieChart';
import { ProssesChain } from '../../../entity/ProssesChain';
import { ProssesChainController } from '../../../controllers/prossesChain.controller';

export const ChainChart = ({size}: {size: {width: number, height: number}}) => {
    
      const [data, setData] = useState<{key: string, value: number}[]>([]);

      const updateData = async (chainsData: ProssesChain[]) => {
        let allData: {key: string, value: number}[] = [];

        allData.push({key:'1', value:chainsData.filter(chain => chain.numberOfProsseses === 1).length});
        allData.push({key:'2', value:chainsData.filter(chain => chain.numberOfProsseses === 2).length});
        allData.push({key:'3', value:chainsData.filter(chain => chain.numberOfProsseses === 3).length});
        allData.push({key:'4', value:chainsData.filter(chain => chain.numberOfProsseses === 4).length});
        
        setData(allData);
      };
    
      useEffect(() => {
        ProssesChainController.getAll().then((respond) => {
          updateData(respond.data);
        })
      }, [])

    return (
        <Paper style={{height: '100%', width: size.width}}>
          <Grid container direction="row"
                justify="center"
                alignItems="stretch" style={{height: '100%', width: size.width}}>
            <Grid item xs={12} style={{height: '10%'}}>
              <ChartTitle<BerralBatchStatisticsBy>
                title={"שרשרת תהליכים לפי מספר תהליכים"}
                />
            </Grid>
            <Grid item xs={12}  
            container direction="column"
            justify="center"
            alignItems="stretch"
            >
              <PieChart
                  data={data}
                  size={size}
                  />
            </Grid>
        </Grid>
        </Paper>

  )

}
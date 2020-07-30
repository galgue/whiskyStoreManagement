import React, { useRef, useState, useEffect } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import { BerralBatchController, BerralBatchCounterBy } from '../../../controllers/berralBatch.controller';

export const SpiritProfit = ({size}: {size: {width: number, height: number}}) => {
    
      const [data, setData] = useState<{ key: string; value: number; }[]>();

      const updateData = async () => {
        setData(await BerralBatchController.getStatistic('spirit-type-liter'));
      };    
 
      useEffect(() => {
        updateData();
      }, [])

      const findTypeAsMoney = (type: string) => {
        return (data?.find(entry => entry.key === type)?.value || 0) * 100;
      }

      return (
          <div style={{height: size.height, width: size.width}}>
            <Grid container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={3}
            >
              <Grid item xs={12} style={{height: '50%',}}>
                <Typography>{`הכנסות`}</Typography>
              </Grid>
              <Grid item xs={12} style={{height: '50%'}}>
               <Typography>{`וויסקי: ${findTypeAsMoney('וויסקי')}  ש"ח`}</Typography> 
              </Grid>
              <Grid item xs={12} style={{height: '50%'}}>
               <Typography>{`רוטס: ${findTypeAsMoney('רוטס')}  ש"ח`}</Typography> 
              </Grid>
              <Grid item xs={12} style={{height: '50%'}}>
               <Typography>{`ג'ין: ${findTypeAsMoney(`ג'ין`)}  ש"ח`}</Typography> 
              </Grid>
            </Grid>   
          </div>
    )
}
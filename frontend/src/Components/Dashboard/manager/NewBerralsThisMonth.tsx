import React, { useRef, useState, useEffect } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import { BerralBatchController, BerralBatchCounterBy } from '../../../controllers/berralBatch.controller';

export const NewBerralsThisMonth = ({size}: {size: {width: number, height: number}}) => {
    
      const [data, setData] = useState<{thisMonth: number, lastMonth: number}>();

      const updateData = async () => {
        setData(await BerralBatchController.getMonthChange());
      };    
 
      useEffect(() => {
        updateData();
      }, [])

      let raiseFromLastMonth = 0;

      if(data?.lastMonth){
        if(data?.thisMonth){
          raiseFromLastMonth = 100 * ((data?.thisMonth - data?.lastMonth) / data?.lastMonth);
        }
      } else {
        if(data?.thisMonth){
          raiseFromLastMonth = 100;
        } 
      }

      return (
          <div style={{height: size.height}}>
            <Grid container
              direction="column"
              justify="space-around"
              alignItems="center"
              spacing={4}
            >
              <Grid item xs={12}>
                  <Typography variant="h5">{`חביות חדשות החודש: ${data?.thisMonth?data?.thisMonth:0}`}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5">{`שינוי מחודש שעבר: ${raiseFromLastMonth}%`}</Typography> 
              </Grid>
            </Grid>   
          </div>
    )
}
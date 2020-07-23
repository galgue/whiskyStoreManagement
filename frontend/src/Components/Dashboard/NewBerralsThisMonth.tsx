import React, { useRef, useState, useEffect } from 'react';
import { Paper, Grid } from '@material-ui/core';
import { BerralBatchController, BerralBatchCounterBy } from '../../controllers/berralBatch.controller';

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
          <Paper style={{height: size.height, width: size.width}}>
            <Grid container>
              <Grid item xs={12} style={{height: '50%'}}>
                {`חביות חדשות החודש: ${data?.thisMonth}`}
              </Grid>
              <Grid item xs={12} style={{height: '50%'}}>
                {`שינוי משבוע שעבר: ${raiseFromLastMonth}%`}
              </Grid>
            </Grid>   
          </Paper>
    )
}
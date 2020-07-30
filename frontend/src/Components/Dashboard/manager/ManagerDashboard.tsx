import React from 'react'; 

// Material helpers
import { makeStyles, Paper } from '@material-ui/core';

// Material components
import { Grid } from '@material-ui/core';
import { NewBerralBatchesChart } from '../common/NewBerralsBatch';
import { BerralBatchStatisticsPieChart } from '../common/BerralBatchStatistics';
import { NewBerralsThisMonth } from './NewBerralsThisMonth';
import { SpiritProfit } from './SpiritProfite';



const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    width: '100%',
    padding: theme.spacing(4),
  },
  container: {
    height: '100%',
    width: '100%',
  },
  item: {
    height: '100%'
  }
}));

export const ManagerDashboard = () => {
  const classes = useStyles();

  return ( 
      <div className={classes.root}>
        <Grid className={classes.root} container spacing={4}> 
            <Grid item xs={3}>
            </Grid>
            <Grid item xs={3}>
            </Grid>
            <Grid item xs={3}>
              <Paper>
                <SpiritProfit size={{height: 200, width: 200}} />
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper>
                <NewBerralsThisMonth size={{height: 200, width: 200}} />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper>
                <BerralBatchStatisticsPieChart />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper>
                <NewBerralBatchesChart/>
              </Paper>
            </Grid>
        </Grid>
      </div>
  );
};
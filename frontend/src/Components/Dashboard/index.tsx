import React from 'react'; 

// Material helpers
import { makeStyles, Paper } from '@material-ui/core';

// Material components
import { Grid } from '@material-ui/core';
import { NewBerralBatchesChart } from './NewBerralsBatch';
import { BerralBatchStatisticsPieChart } from './BerralBatchStatistics';
import { NewBerralsThisMonth } from './NewBerralsThisMonth';



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

export const Dashboard = () => {
  const classes = useStyles();

  return ( 
      <div className={classes.root}>
        <Grid className={classes.root} container spacing={4}> 
            <Grid item xs={3}>
            </Grid>
            <Grid item xs={3}>
            </Grid>
            <Grid item xs={3}>
            </Grid>
            <Grid item xs={3}>
              <NewBerralsThisMonth size={{height: 100, width: 200}} />
            </Grid>
            <Grid item xs={6}>
              <BerralBatchStatisticsPieChart size={{height: 300, width: 500}}/>
            </Grid>
            <Grid item xs={6}>
              <NewBerralBatchesChart size={{height: 300, width: 500}}/>
            </Grid>
        </Grid>
      </div>
  );
};
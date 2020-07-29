import React from 'react'; 

// Material helpers
import { makeStyles, Paper } from '@material-ui/core';

// Material components
import { Grid } from '@material-ui/core';
import { BerralBatchStatisticsPieChart } from '../common/BerralBatchStatistics';
import { NewBerralBatchesChart } from '../common/NewBerralsBatch';
import { MissionOfUserTable } from './MissionsOfUserTable';



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

export const WorkerDashboard = () => {
  const classes = useStyles();

  return ( 
      <div className={classes.root}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.root}
        >
          <Grid container xs={6}>
            <Grid item xs={12}>
            <Paper style={{height: 500, width: 500}}>
                <MissionOfUserTable height={500}/>
              </Paper>
            </Grid>
          </Grid>
          <Grid container xs={6}
            direction="column"
            justify="center"
            alignItems="stretch" spacing={4}>
            <Grid item >
            <NewBerralBatchesChart />
            </Grid>
            <Grid item>
              <BerralBatchStatisticsPieChart/>
            </Grid>
          </Grid>
        </Grid>
      </div>
  );
};
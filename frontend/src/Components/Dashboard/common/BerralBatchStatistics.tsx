import React, { useRef, useState, useEffect } from 'react';
import { Paper, Grid } from '@material-ui/core';
import { BarChart } from '../modules/BarChart';
import { ChartTitle } from '../modules/ChartTitle';
import { BerralBatchController, BerralBatchStatisticsBy } from '../../../controllers/berralBatch.controller';
import { PieChart } from '../modules/PieChart';
import { BerralBatch } from '../../../entity/BerralBatch';

export const BerralBatchStatisticsPieChart = () => {
    
      const [data, setData] = useState<{[key: string] :{key: string, value: number}[]}>({
        'berral-type': [],
        'prosses-chain': [],
        'spirit-type': []
      });
      const [type, setType] = useState<BerralBatchStatisticsBy>('berral-type');

      const getTypesStat = async(batches: BerralBatch[]) => {
          let starter: {[key: string]: number} = {};
          return Object.entries(batches.reduce(function(rv, batch) {
            if(!rv[batch.berralType.name]){
              rv[batch.berralType.name] = 0;
            }
            rv[batch.berralType.name] += 1;
            return rv;
          }, starter)).map(entry => ({key: entry[0], value: entry[1]}));
      }

      const getChainStat = async(batches: BerralBatch[]) => {
        let starter: {[key: string]: number} = {};
        return Object.entries(batches.reduce(function(rv, batch) {
          if(!rv[batch.prossesChain.name]){
            rv[batch.prossesChain.name] = 0;
          }
          rv[batch.prossesChain.name] += 1;
          return rv;
        }, starter)).map(entry => ({key: entry[0], value: entry[1]}));
       }

       const getSpiritStat = async(batches: BerralBatch[]) => {
        let starter: {[key: string]: number} = {};
        return Object.entries(batches.reduce(function(rv, batch) {
          if(!rv[batch.spiritType]){
            rv[batch.spiritType] = 0;
          }
          rv[batch.spiritType] += 1;
          return rv;
        }, starter)).map(entry => ({key: entry[0], value: entry[1]}));
       }

      const updateData = async () => {
        let allData:{[key: string] :{key: string, value: number}[]} = {
          'berral-type': [],
          'prosses-chain': [],
          'spirit-type': []
        };
        const batches = (await BerralBatchController.getAll()).data;
        allData['berral-type'] = (await getTypesStat(batches));
        allData['prosses-chain'] = (await getChainStat(batches));
        allData['spirit-type'] = (await getSpiritStat(batches));
        setData(allData);
      };
    
      useEffect(() => {
        updateData();
      }, [])

    return (
        <div style={{height: '100%', width: '100%'}}>
          <Grid container direction="row"
                justify="center"
                alignItems="stretch" style={{height: '100%', width: '100%'}}>
            <Grid item xs={12} style={{height: '10%'}}>
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
            <Grid item xs={12}  
            container direction="column"
            justify="center"
            alignItems="stretch"
            >
              {type === 'berral-type' && <PieChart
                  data={data['berral-type']}
                  />}
                {type === 'prosses-chain' && <PieChart
                  data={data['prosses-chain']}
                  />}
                {type === 'spirit-type' && <PieChart
                  data={data['spirit-type']}
                  />}
            </Grid>
        </Grid>
        </div>

  )

}
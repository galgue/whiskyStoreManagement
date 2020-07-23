import { Grid, Typography, InputLabel, Select, MenuItem } from '@material-ui/core';
import React from 'react';

interface TitleProps<T extends string>{
    title: string,
    selections?: {key: string, value:T}[],
    selection?: T, 
    onSelectionChange?: (selection: T) => void,
}

export function ChartTitle<T extends string>({title, onSelectionChange, selections, selection}: TitleProps<T>){    

    return (
      <Grid container spacing={3} justify="center" alignItems="center" style={{height: '100%', width: '100%'}}> 
        <Grid item>
          <Typography variant="h5">{title}</Typography>
        </Grid>
        <Grid item>
          {onSelectionChange && <Select
            id="type-selector"
            value={selection}
            onChange={data => onSelectionChange(data.target.value as T)}
          >
            {
            selections?.map(passibulSelection => 
              <MenuItem value={passibulSelection.value}>{passibulSelection.key}</MenuItem>)
            }
          </Select>}
        </Grid>
      </Grid>
    );

}
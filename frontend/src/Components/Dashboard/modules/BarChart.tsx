import React from 'react';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { ArgumentScale } from '@devexpress/dx-react-chart';

interface ChartData {
    key: string,
    value: number,
}


interface ChartProps {
    data: ChartData[],
    size: {width: number, height: number}
}

export const BarChart = ({data, size}: ChartProps) => {   


    return (
        <Chart
            data={data}
            height={size.height}
            width={size.width}          
            >
            <ArgumentScale />
            <ArgumentAxis />
            <ValueAxis />

            <BarSeries
            valueField="value"
            argumentField="key"
            />
        </Chart>
  )

}
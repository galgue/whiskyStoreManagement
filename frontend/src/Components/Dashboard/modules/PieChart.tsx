import React from 'react';
import {
  Chart,
  PieSeries,
  Tooltip,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { ValueScale } from '@devexpress/dx-react-chart';

interface ChartData {
    key: string,
    value: number,
}


interface ChartProps {
    data: ChartData[],
    size: {width: number, height: number}
}

export const PieChart = ({data, size}: ChartProps) => {

    return (
        <Chart
        data={data}
        height={size.height}
        width={size.width}  >
            <ValueScale name="value" />

            <PieSeries
              valueField="value"
              argumentField="key"
            />
            <Tooltip />
            <Legend />
        </Chart>
  )

}
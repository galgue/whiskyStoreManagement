import React from 'react';
import {
  Chart,
  PieSeries,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import { ValueScale } from '@devexpress/dx-react-chart';
import PieChartDX, {
  Legend,
  Export,
  Series,
  Label,
  Font,
  Connector
} from 'devextreme-react/pie-chart';

interface ChartData {
    key: string,
    value: number,
}


interface ChartProps {
    data: ChartData[],
}

function customizeText(arg: any) {
  return `${arg.valueText} (${arg.percentText})`;
}

export const PieChart = ({data}: ChartProps) => {

    return (

      <PieChartDX id="pie"
        palette="Bright"
        dataSource={data}
        rtlEnabled={true}
      >
        <Legend
          orientation="horizontal"
          itemTextPosition="right"
          horizontalAlignment="center"
          verticalAlignment="bottom"
          columnCount={4} />
        <Export enabled={true} />
        <Series argumentField="key" valueField="value">
          <Label
            visible={true}
            position="columns"
            customizeText={customizeText}>
            <Font size={16} />
            <Connector visible={true} width={0.5} />
          </Label>
        </Series>
      </PieChartDX>
        // <Chart
        // data={data}
        // height={size.height}
        // width={size.width}  >
        //     <ValueScale name="value" />

        //     <PieSeries
        //       valueField="value"
        //       argumentField="key"
        //     />
        //     <Tooltip />
        //     <Legend />
        //     <Export />
        // </Chart>
  )

}
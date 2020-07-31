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

function customizeTextChart(arg: any) {
  return `${arg.valueText} (${arg.percentText})`;
}

function customizeTextLegend(arg: any) {
  let str = arg.pointName;
  var position = str.search(/[\u0590-\u05FF]/);
  if(position >= 0){
    str = str.split("").reverse().join("");
  }
  return str;
}

export const PieChart = ({data}: ChartProps) => {

    return (

      <PieChartDX id="pie"
        palette="Bright"
        dataSource={data}
        rtlEnabled={false}
      >
        <Legend
          orientation="horizontal"
          itemTextPosition="left"
          horizontalAlignment="center"
          verticalAlignment="bottom"
          customizeText={customizeTextLegend}
          columnCount={5} />
        <Export enabled={true} />
        <Series argumentField="key" valueField="value">
          <Label
            visible={true}
            position="columns"
            customizeText={customizeTextChart}>
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
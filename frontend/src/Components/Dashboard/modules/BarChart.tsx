import React from 'react';
import { Chart, Series, CommonSeriesSettings, Label, Format, Legend, Export } from 'devextreme-react/chart';

interface ChartData {
    key: string,
    value: number,
}


interface ChartProps {
    data: ChartData[],
}

export const BarChart = ({data}: ChartProps) => {

    let emptyData: {[key: string]: number|string} = {'state': ''}
    const newData = [data.reduce((rv,entry) => {
        rv[entry.key] = Number(entry.value);
        return rv;
    }, emptyData)]

    const series = Object.entries(newData[0]).map(entry => {
        if(entry[0] !== 'state') {
            return (
                <Series
                    argumentField="state"
                    valueField={entry[0]}
                    name={entry[0]}
                  />
                  )
        }
    })

    return (
        <Chart id="chart" dataSource={newData}>
            <CommonSeriesSettings
                argumentField="state"
                type="bar"
                hoverMode="bar"
                selectionMode="bar"
                >
                <Label visible={true}>
                    <Format type="fixedPoint" precision={0} />
                </Label>
            </CommonSeriesSettings>
            {series}
            <Export enabled={true} />
        </Chart>
  )

}
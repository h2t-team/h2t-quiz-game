import React from 'react';
import { Chart, ChartType } from 'components/Chart/Chart';

const data = [
  {
    name: 'Option 1',
    value: 30,
  },
  {
    name: 'Option 2',
    value: 10,
  },
  {
    name: 'Option 3',
    value: 25,
  },
  {
    name: 'Option 4',
    value: 25,
  },
  {
    name: 'Option 5',
    value: 25,
  },
];

const Result = () => {
  return (
    <div className="mx-auto">
      {/* <Chart type={ChartType.pieChartType} data={data}></Chart> */}
      <Chart type={ChartType.barChartType} data={data}></Chart>
    </div>
  );
};
export default Result;

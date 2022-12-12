import React from 'react';
/* eslint-disable no-unused-vars */
import {
  BarChart,
  XAxis,
  Tooltip,
  Bar,
  PieChart,
  Pie,
  Cell,
  PieLabelRenderProps,
} from 'recharts';

enum ChartType {
  barChartType,
  pieChartType,
} 

interface DataProps {
  name: string;
  value: number;
}

interface ChartProps {
  type?: ChartType;
  data: Array<DataProps>;
}

interface PieLabelProps extends PieLabelRenderProps {
  innerRadius: number;
  outerRadius: number;
  cx: number;
  cy: number;
}
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
  name,
}: PieLabelProps) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 1.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="hanging"
    >
      {name} ({value})
    </text>
  );
};
const COLORS = ['#31BFF3', '#F4889A', '#A484E9', '#FFAF68', '#79D45E'];
const Chart = (props: ChartProps) => {
  switch (props.type) {
    case ChartType.barChartType:
      return (
        <BarChart width={100 * props.data.length} height={500} data={props.data}>
          <XAxis dataKey="name" interval={0} width={50} />
          <Tooltip />
          <Bar dataKey="value" label={{ position: 'top' }}>
            {props.data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      );

    case ChartType.pieChartType:
      return (
        <PieChart width={300 * props.data.length} height={500}>
          <Tooltip />
          <Pie
            data={props.data}
            dataKey="value"
            nameKey="name"
            innerRadius={40}
            outerRadius={100}
            paddingAngle={5}
            label={renderCustomizedLabel}
          >
            {props.data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      );
    default:
      return <div></div>;
  }
};
export { Chart, ChartType };

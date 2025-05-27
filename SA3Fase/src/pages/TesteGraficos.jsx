import React from 'react';
import { ResponsiveLine } from '@nivo/line';

const MyLine = ({ data }) => {
  return (
    <div style={{ height: '400px' }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          legend: 'transportation',
          legendOffset: 36,
        }}
        axisLeft={{
          legend: 'count',
          legendOffset: -40,
        }}
        colors={{ scheme: 'category10' }}
        lineWidth={5}
        pointSize={15}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={10}
        pointBorderColor={{ from: 'seriesColor', modifiers: [] }}
        pointLabelYOffset={-12}
        areaOpacity={1}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            translateX: 100,
            itemWidth: 80,
            itemHeight: 22,
            symbolShape: 'circle',
          },
        ]}
      />
    </div>
  );
};

const TesteGraficos = () => {
  const data = [
    {
      id: 'japan',
      data: [
        { x: 'plane', y: 186 },
        { x: 'helicopter', y: 153 },
        { x: 'boat', y: 160 },
        { x: 'train', y: 42 },
        { x: 'subway', y: 177 },
        { x: 'bus', y: 263 },
        { x: 'car', y: 107 },
        { x: 'moto', y: 224 },
        { x: 'bicycle', y: 22 },
        { x: 'horse', y: 85 },
        { x: 'skateboard', y: 127 },
        { x: 'others', y: 131 },
      ],
    },
    {
      id: 'france',
      data: [
        { x: 'plane', y: 224 },
        { x: 'helicopter', y: 276 },
        { x: 'boat', y: 206 },
        { x: 'train', y: 145 },
        { x: 'subway', y: 52 },
        { x: 'bus', y: 97 },
        { x: 'car', y: 116 },
        { x: 'moto', y: 295 },
        { x: 'bicycle', y: 214 },
        { x: 'horse', y: 284 },
        { x: 'skateboard', y: 219 },
        { x: 'others', y: 125 },
      ],
    },
    // Add other datasets here...
  ];

  return <MyLine data={data} />;
};

export default TesteGraficos;
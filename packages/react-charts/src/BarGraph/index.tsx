import React, { SVGProps } from 'react';

import { isEmpty } from '../utils/helpers';

import './barGraph.css';


const BarGraph = (props: BarGraphProps) => {

  const {
    data,
    topMargin,
    bottomMargin,
    height,
    width,
    maxBarWidth,
    axisColor,
    getBarTopTextUI,
    showAxis,
    bottomAxisHeight,
    axisTextProps
  } = props;


  if (isEmpty(data)) return null;

  const graphHeight = height - bottomAxisHeight;
  let minValue = 0, maxValue = 0;

  data.forEach(d => {
    const yVal = d.value;

    minValue = Math.min(minValue, yVal);
    maxValue = Math.max(maxValue, yVal);
  });

  const xMax = width;
  const yMin = topMargin;

  const yMax = graphHeight - topMargin - (minValue < 0 ? bottomMargin : 0);

  const xScale = {
    range: [ 0, xMax ],
    round: true,
    domain: data.map(d => d.id),
    padding: 0
  };

  const totalXRange = xScale.range[1] - xScale.range[0];
  const barBandwidthCalculated = totalXRange / data.length;
  const barBandwidth = Math.min(barBandwidthCalculated, maxBarWidth);
  const gap = barBandwidthCalculated - barBandwidth;


  const getXScaleValue = (barData: BarData) => {

    const index = xScale.domain.indexOf(barData.id) ?? 0;

    return ((barBandwidth + gap) * index) + gap / 2 + barBandwidth / 2;

  };


  const scaleYData = {
    domain: [ Math.min(0, minValue), maxValue ],
    range: [ yMax, yMin ]
  };


  const yScale = (yVal: number) => {
    return (
      scaleYData.range[0] +
            (yVal - scaleYData.domain[0]) * (scaleYData.range[1] - scaleYData.range[0]) / (scaleYData.domain[1] - scaleYData.domain[0])
    );
  };

  const yScale0 = yScale(0);

  const axisBottomY = yMax + (minValue < 0 ? bottomMargin : 0);

  const defaultAxisTextProps = {
    fill: 'var(--subText)',
    textAnchor: 'middle',
    fontSize: 12
  };


  return (
    <svg width={width}
      height={height}
    >
      <g>
        {
          data.map(d => {
            const y = d.value;
            const barY = yScale(y);

            const isNegative = y < 0;
            const barX = getXScaleValue(d) ?? 0;

            const barHeight = Math.abs(barY - yScale0);
            const textY = isNegative ? barY + 12 : barY - 5;


            return (
              <React.Fragment key={d.id}>
                {getBarTopTextUI(barX, textY, d)}
                <line
                  className='bar21animation'
                  x1={barX}
                  x2={barX}
                  y1={yScale0}
                  y2={barY}
                  stroke-width={barBandwidth}
                  height={barHeight}
                  stroke={d.color}
                >
                </line>

                {
                  showAxis &&
                  <g>
                    <text
                      transform-origin={`${barX} ${axisBottomY + bottomMargin}`}
                      x={barX}
                      y={axisBottomY + bottomMargin }
                      {...defaultAxisTextProps}
                      {...axisTextProps}
                    >
                      <tspan > {d.label} </tspan>
                    </text>
                  </g>
                }

              </React.Fragment>
            );
          })
        }
        <line
          x1={0}
          y1={yScale0 }
          x2= {xMax}
          y2= {yScale0 }
          stroke={axisColor}
          strokeWidth={1}
        />
        <line
          x1={0}
          y1={axisBottomY}
          x2= {xMax}
          y2= {axisBottomY}
          stroke={axisColor}
          strokeWidth={1}
        />
      </g>
    </svg>
  );
};


export type BarData = {
  id: string;
  label: string;
  value: number;
  color: string;
}


type DefaultProps = {
  axisColor: string;
  topMargin: number;
  bottomMargin: number;
  maxBarWidth: number;
  getBarTopTextUI: (textX : number, textY: number, barData: BarData) => SVGElement | null;
  showAxis: boolean;
  bottomAxisHeight: number;
  axisTextProps: SVGProps<SVGTextElement>;
}


type RequiredProps = {
  data: BarData[];
  width: number;
  height: number;
}

BarGraph.defaultProps = {
  axisColor: 'var(--subText)',
  topMargin: 0,
  bottomMargin: 0,
  maxBarWidth: 20,
  getBarTopTextUI: () => null,
  showAxis: true,
  bottomAxisHeight: 22,
  axisTextProps: {}
} as DefaultProps;


export type BarGraphProps = RequiredProps & DefaultProps;

export default BarGraph;

import React, { SVGProps, useState } from 'react';

import { Pie } from '@visx/shape';

import { isEmpty } from '../utils/helpers';

import { PieData } from './pieTypes';


const getValue = (d: PieData) => {
  return d.value;
};


const PieChart = (props: PieChartProps) => {

  const [ hoveredPie, setHoveredPie ] = useState<PieData | null>(null);
  const { data, height, width, donutThickness, hoveredPieThicknes, children, textClass, showArcsValue, ...restProps } = props;


  const radius = Math.min(height, width) / 2 - (hoveredPieThicknes);
  const center = radius + hoveredPieThicknes;


  const onMouseEnter = (d: PieData) => {
    const { onMouseEnter } = props;

    setHoveredPie(d);
    if (onMouseEnter instanceof Function) {
      onMouseEnter(d);
    }
  };


  const onMouseLeave = () => {
    const { onMouseLeave } = props;

    setHoveredPie(null);

    if (onMouseLeave instanceof Function) {
      onMouseLeave();
    }
  };


  const getInnerPieUI = () => {
    return (
      <Pie
        data={data}
        pieValue={getValue}
        outerRadius={radius}
        innerRadius={radius - donutThickness}
        padAngle={0}
        pieSortValues={null}
        x="-180"
        y="-300"
      >
        {
          (pie: any) => {
            return pie.arcs.map((arc: any, i: number) => {
              const [ centroidX, centroidY ] = pie.path.centroid(arc);

              return (
                <g key={`letters-${arc.data.value}-${i}`}>
                  <path
                    d={pie.path(arc) ?? undefined}
                    fill={arc.data.color}
                    onMouseEnter={() => onMouseEnter(arc.data)}
                    onMouseLeave={() => onMouseLeave()}
                  />
                  {
                    showArcsValue && (
                      <text
                        fill="black"
                        textAnchor="middle"
                        x={centroidX}
                        y={centroidY}
                        dy=".33em"
                        className={textClass}
                      >
                        {arc.data.value > 1 ? arc.data.value : ''}
                      </text>
                    )
                  }
                </g>
              );
            });
          }
        }
      </Pie>
    );
  };

  return (
    <svg width={width}
      height={height}
      {...restProps}
    >
      <g transform={`translate(${center},${center})`}>
        <Pie
          data={data}
          pieValue={getValue}
          outerRadius={radius + hoveredPieThicknes}
          innerRadius={radius + 1}
          padAngle={0}
          pieSortValues={null}
        >
          {
            (pie1) => {
              const arc = pie1.arcs.find(arc => arc.data.id === hoveredPie?.id);


              return (
                <>
                  {
                    !(isEmpty(arc) || arc === undefined) &&
                    <g key={`letters-${arc?.data.value}`}>
                      <path
                        d={pie1.path(arc) ?? ''}
                        fill={arc?.data.color}
                        fillOpacity={0.5}
                      />
                    </g>
                  }
                  {getInnerPieUI()}
                  {/* <g> */}
                  {children}
                  {/* </g> */}
                </>
              );
            }
          }
        </Pie>
      </g>
    </svg>
  );
};


type PieChartProps = Exclude<SVGProps<SVGSVGElement>, 'onMouseEnter' | 'onMouseLeave'> & {
  data: Array<PieData>;
  height: number;
  width: number;
  donutThickness: number;
  hoveredPieThicknes: number;
  children?: React.ReactNode;
  onMouseEnter: (d: PieData) => void;
  onMouseLeave: () => void;
  textClass: string;
  showArcsValue?: boolean;
}
// Exclude<SVGProps<SVGAElement>, 'onCopy'>

export default PieChart;
export type { PieData };

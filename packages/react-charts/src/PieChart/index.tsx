import React, { useState } from 'react';
import type { PieData } from './pieTypes';
import { Pie } from '@visx/shape';


const getValue = (d: PieData) => {
  return d.value;
};


const PieChart = (props: PieChartProps) => {

  const [ hoveredVal, setHoveredVal ] = useState<string>('');
  const { data, height, width, donutThickness, hoveredPieThicknes, children, textClass, showArcsValue } = props;

  const radius = Math.min(height, width) / 2 - (hoveredPieThicknes);
  const center = radius + hoveredPieThicknes;


  const onMouseEnter = (d: PieData) => {
    const { onMouseEnter } = props;

    setHoveredVal(d.title);
    if (onMouseEnter instanceof Function) {
      onMouseEnter(d);
    }
  };


  const onMouseLeave = () => {
    const { onMouseLeave } = props;

    setHoveredVal('');
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
      >
        {
          (pie) => {
            return pie.arcs.map((arc, i) => {
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
    >
      <g transform={`translate(${center},${center})`}>
        <Pie
          data={data}
          pieValue={getValue}
          outerRadius={radius + hoveredPieThicknes}
          innerRadius={radius + 1}
          padAngle={0.005}
          pieSortValues={null}
        >
          {
            (pie1) => {
              return (
                <>
                  {
                    pie1.arcs.filter(arc => arc.data.title === hoveredVal).map(arc => {
                      return (
                        <g key={`letters-${arc.data.value}`}>
                          <path
                            d={pie1.path(arc) ?? undefined}
                            fill={arc.data.color}
                            fillOpacity={0.5}
                          />
                        </g>
                      );
                    })
                  }
                  {getInnerPieUI()}
                  <g>
                    {children}
                  </g>
                </>
              );
            }
          }
        </Pie>
      </g>
    </svg>
  );
};


type PieChartProps = {
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


export default PieChart;
export type { PieData };

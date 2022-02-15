import React, { useState } from 'react';

import { min, max, bisector } from 'd3-array';

import { LinePath } from '@visx/shape';
import { localPoint } from '@visx/event';

import type { EventType } from '../utils/commonTypes';
import { isEmpty } from '../utils/helpers';

import type { Point, LinePathData, LineGraphProps, ToolTipData } from './lineGraphTypes';

import './lineGraph.css';


const LineGraph = (props: LineGraphProps) => {

  const [ tooltipData, setToolTipData ] = useState<Array<ToolTipData>>([]);

  const {
    paddingVert,
    paddingHorz,
    height,
    width,
    linePaths,
    onMouseLeave
  } = props;

  if (isEmpty(linePaths)) {
    return null;
  }


  const getXaxisValue = (d:Point) => d[0];


  const getYaxisValue = (d: Point): number => d[1];

  let minY: number = Number.MAX_SAFE_INTEGER;
  let maxY:number = Number.MIN_SAFE_INTEGER;
  let minX = Number.MAX_SAFE_INTEGER;
  let maxX = Number.MIN_SAFE_INTEGER;

  linePaths.forEach(lp => {
    if (lp.isSeriesToScale) {
      const tempMinY = min(lp.series, getYaxisValue);
      const tempMaxY = max(lp.series, getYaxisValue);
      const tempMinX = min(lp.series, getXaxisValue);
      const tempMaxX = max(lp.series, getXaxisValue);

      if (tempMinY !== undefined) { minY = Math.min(minY, tempMinY); }

      if (tempMaxY !== undefined) { maxY = Math.max(maxY, tempMaxY); }

      if (tempMinX !== undefined) { minX = Math.min(minX, tempMinX); }

      if (tempMaxX !== undefined) { maxX = Math.max(maxX, tempMaxX); }
    }
  });


  const scaleX = {
    domain: [ minX, maxX ],
    range: [ 0 + paddingHorz, width - paddingHorz ]
  };


  const scaleY = {
    domain: [ minY, maxY ],
    range: [ height - paddingVert, paddingVert ]
  };


  const yScale = (yVal: number) => {
    return (
      scaleY.range[0] +
        (yVal - scaleY.domain[0]) * (scaleY.range[1] - scaleY.range[0]) / (scaleY.domain[1] - scaleY.domain[0])
    );
  };


  const xScale = (xVal: number) : number => {
    return (
      scaleX.range[0] +
        (xVal - scaleX.domain[0]) * (scaleX.range[1] - scaleX.range[0]) / (scaleX.domain[1] - scaleX.domain[0])
    );
  };


  const invertX = (x: number): number => {
    return (
      scaleX.domain[0] +
        ((x - scaleX.range[0]) * (scaleX.domain[1] - scaleX.domain[0]) / (scaleX.range[1] - scaleX.range[0]))
    );
  };


  const onMouseOut = () => {
    onMouseLeave?.();
    setToolTipData([]);
  };


  const handleTooltip = (e: EventType) => {
    e.preventDefault();
    const { onMouseEnter } = props;


    const { x } = localPoint(e) || { x: 0 };

    const x0 = invertX(x);

    const bisectXAxix = bisector(getXaxisValue).left;
    const toolTipData: Array<ToolTipData> = [];

    linePaths?.map((lp: LinePathData) => {
      const series = lp.series;
      const seriesLen = series.length;

      let index = bisectXAxix(series, x0, 0);

      if (index === seriesLen) {
        index = seriesLen - 1;
      }

      const hoveredPoint: Point = series[index];

      toolTipData.push({
        point: hoveredPoint,
        tooltipLeft: lp?.isSeriesToScale ? xScale(getXaxisValue(hoveredPoint)) : getXaxisValue(hoveredPoint),
        tooltipTop: lp?.isSeriesToScale ? yScale(getYaxisValue(hoveredPoint)) : getYaxisValue(hoveredPoint)
      });
    });

    onMouseEnter?.(toolTipData);
    setToolTipData(toolTipData);

  };


  const showBlinkingPointUI = (lp: LinePathData) => {

    const lastPoint = lp.series[lp.series.length - 1];
    const lastPointY = yScale(getYaxisValue(lastPoint));
    const lastPointX = xScale(getXaxisValue(lastPoint));

    if (!lp.showLastPointBlinking) {
      return null;
    }

    return (
      <g>
        <circle
          cx={lastPointX}
          cy={lastPointY}
          r={lp.strokeWidth * 1.5}
          fill={lp.color}
          stroke='var(--primaryBg)'
          strokeWidth={lp.strokeWidth / 2}
          pointerEvents="none"
          style={lp.style}
          className='lg430LastPointBlinking'
        />
      </g>
    );
  };


  const getToolTipUI = () => {
    const {
      getTooltipUI,
      toolTipLeftUpdated,
      toolTipTopUpdated
    } = props;

    const tooltipStyle : React.CSSProperties = {
      top: 0,
      left: 0,
      boxShadow: 'none',
      padding: 0,
      backgroundColor: 'var(--constantTransparent)',
      position: 'absolute',
      borderRadius: '3px',
      transform: `translate(${toolTipLeftUpdated}px, ${toolTipTopUpdated}px)`

    };


    if (!tooltipData || !getTooltipUI) {
      return null;
    }

    return (
      <div
        style={tooltipStyle}
      >
        {getTooltipUI(tooltipData)}
      </div>
    );
  };


  const showHoveredPoints = (lp: LinePathData, idx: number) => {
    if (!lp.allowToolTip || isEmpty(tooltipData)) {
      return null;
    }

    const currTooltipData = tooltipData?.[idx];

    return (
      <>
        <circle
          cx={currTooltipData?.tooltipLeft}
          cy={currTooltipData?.tooltipTop}
          r={lp.strokeWidth * 1.5}
          fill={lp.color}
          stroke='var(--primaryBg)'
          strokeWidth={lp.strokeWidth}
          pointerEvents="none"
        />
        <circle
          cx={currTooltipData?.tooltipLeft}
          cy={currTooltipData?.tooltipTop}
          r={lp.strokeWidth * 1.5}
          fill='var(--constantTransparent)'
          stroke={lp.color}
          className='lg43Opacity3'
          strokeWidth={lp.strokeWidth * 0.5}
          pointerEvents="none"
        />
      </>
    );
  };

  return (
    <>
      <svg width={width}
        height={height}
        onMouseMove={handleTooltip}
        onTouchMove={handleTooltip}
        onTouchStart={handleTooltip}
        onMouseLeave={onMouseOut}
        onTouchEnd={onMouseOut}
      >
        <g>
          {
            linePaths.map(lp => {
              return (
                <>
                  <LinePath
                    style={{ ...lp.style }}
                    key={lp.key}
                    data={lp.series}
                    x={d => lp.isSeriesToScale ? xScale(getXaxisValue(d)) : getXaxisValue(d)}
                    y={d => lp.isSeriesToScale ? yScale(getYaxisValue(d)) : getYaxisValue(d)}
                    stroke={lp.color}
                    strokeWidth={lp.strokeWidth}
                    strokeOpacity={lp.strokeOpacity}
                    shapeRendering="geometricPrecision"
                  />
                </>
              );
            })

          }
          {
            linePaths.map((lp, idx) => {
              return (
                <>
                  {showBlinkingPointUI(lp)}
                  {showHoveredPoints(lp, idx)}
                </>
              );
            })
          }
        </g>
      </svg>
      {getToolTipUI()}
    </>
  );
};


export default LineGraph;
export type { Point, LinePathData, LineGraphProps, ToolTipData };

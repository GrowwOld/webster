import React, { useState } from 'react';

import { min, max, bisector } from 'd3-array';

import { localPoint } from '@visx/event';
import { area } from '@visx/shape';

import type { EventType } from '../utils/commonTypes';
import { isEmpty } from '../utils/helpers';

import type { Point, LinePathData, LineGraphProps, ToolTipData, ToolTipSeriesData } from './lineGraphTypes';


import './lineGraph.css';

const DefaultStrokeMultiplier = 1.5;


const LineGraph = (props: LineGraphProps) => {
  const [ tooltipData, setToolTipData ] = useState<ToolTipData | null>(null);

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


  //get y-scale value from absolute y value
  const getYScaleValue = (yVal: number) => {
    return (
      scaleY.range[0] +
        (yVal - scaleY.domain[0]) * (scaleY.range[1] - scaleY.range[0]) / (scaleY.domain[1] - scaleY.domain[0])
    );
  };

  //get x-scale value from absolute x value
  const getXScaleValue = (xVal: number) : number => {
    return (
      scaleX.range[0] +
        (xVal - scaleX.domain[0]) * (scaleX.range[1] - scaleX.range[0]) / (scaleX.domain[1] - scaleX.domain[0])
    );
  };


  // get x value from x-scale value
  const invertX = (x: number): number => {
    return (
      scaleX.domain[0] +
        ((x - scaleX.range[0]) * (scaleX.domain[1] - scaleX.domain[0]) / (scaleX.range[1] - scaleX.range[0]))
    );
  };

  // get y value from y-scale value
  const invertY = (y: number): number => {
    return (
      scaleY.domain[0] +
        ((y - scaleY.range[0]) * (scaleY.domain[1] - scaleY.domain[0]) / (scaleY.range[1] - scaleY.range[0]))
    );
  };


  const onMouseOut = () => {
    onMouseLeave?.();
    setToolTipData(null);
  };


  const handleTooltip = (e: EventType) => {
    e.preventDefault();
    const { onMouseEnter } = props;


    const { x, y } = localPoint(e) || { x: 0, y: 0 };

    const x0 = invertX(x);
    const y0 = invertY(y);

    const bisectXAxix = bisector(getXaxisValue).left;


    const toolTipSeriesData: Array<ToolTipSeriesData> = [];

    linePaths?.map((lp: LinePathData) => {
      const series = [ ...lp.series ];
      const seriesLen = series.length;

      let index = bisectXAxix(series, x0, 0);

      //checking for perferct intersection of hovered point with current line
      const isPerfectIntersection = index !== 0 && !isEmpty(series?.[index]?.[0]) && series?.[index]?.[0] >= x0;


      if (index === seriesLen) {
        index = seriesLen - 1;
      }

      // next and prev points on line
      const nextPoint: Point = series[index];
      const prevPoint: Point = series[index > 0 ? index - 1 : index];

      const slope = (nextPoint[1] - prevPoint[1]) / (nextPoint[0] - prevPoint[0]);

      const calculatedYAtHoveredPoint = slope * (x0 - prevPoint[0]) + prevPoint[1];

      toolTipSeriesData.push({
        point: nextPoint,
        tooltipLeft: lp?.isSeriesToScale ? getXScaleValue(getXaxisValue(nextPoint)) : getXaxisValue(nextPoint),
        tooltipTop: lp?.isSeriesToScale ? getYScaleValue(getYaxisValue(nextPoint)) : getYaxisValue(nextPoint),
        isPerfectIntersection: isPerfectIntersection,
        intersectionPointOnLine: {
          coords: { x: getXScaleValue(x0), y: getYScaleValue(calculatedYAtHoveredPoint) },
          invertedValues: { x: x0, y: calculatedYAtHoveredPoint }
        } });
    });

    const toolTipData: ToolTipData = {
      seriesData: toolTipSeriesData,
      otherData: {
        coords: { x: x as number, y: y as number },
        invertedValues: { x: x0, y: y0 }
      }
    };

    onMouseEnter?.(toolTipData);
    setToolTipData(toolTipData);

  };


  const showBlinkingPointUI = (lp: LinePathData) => {

    const lastPoint = lp.series[lp.series.length - 1];
    const lastPointY = getYScaleValue(getYaxisValue(lastPoint));
    const lastPointX = getXScaleValue(getXaxisValue(lastPoint));

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


  const showHighlightedPoints = (lp: LinePathData) => {


    if (!lp.hasHighlightedPoints) {
      return;
    }

    const strokeMultiplier = lp.highlightPointStrokeMultiplier ?? DefaultStrokeMultiplier;

    return (
      <g>
        {
          lp.series.map((point: Point) => {
            if (point?.[3]?.highlightPoint) {
              return (
                <circle
                  cx={getXScaleValue(getXaxisValue(point))}
                  cy={getYScaleValue(getYaxisValue(point))}
                  r={lp.strokeWidth * strokeMultiplier}
                  fill={lp.color}
                  stroke={lp.color}
                  strokeWidth={lp.strokeWidth * strokeMultiplier / 2}
                  pointerEvents="none"
                />
              );
            }
          })
        }
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

    const { hoverPointStrokeMultiplier } = lp;

    const hoverExactPoint = lp.hoverExactPoint;

    const currTooltipData = tooltipData?.seriesData?.[idx];
    let x = 0, y = 0;

    if (hoverExactPoint) {
      if (currTooltipData?.isPerfectIntersection) {
        x = currTooltipData.intersectionPointOnLine.coords.x;
        y = currTooltipData.intersectionPointOnLine.coords.y;

      } else {
        return;
      }

    } else {
      x = currTooltipData?.tooltipLeft as number;
      y = currTooltipData?.tooltipTop as number;
    }

    const strokeMultiplier = (hoverPointStrokeMultiplier ?? DefaultStrokeMultiplier);

    if (scaleX.range[0] <= x && x <= scaleX.range[1] && scaleY.range[1] <= y && y <= scaleY.range[0]) {
      return (
        <>
          <circle
            cx={x}
            cy={y}
            r={lp.strokeWidth * strokeMultiplier}
            fill={lp.color}
            stroke='var(--primaryBg)'
            strokeWidth={lp.strokeWidth }
            pointerEvents="none"
          />
          <circle
            cx={x}
            cy={y}
            r={lp.strokeWidth * strokeMultiplier}
            fill='var(--constantTransparent)'
            stroke={lp.color}
            className='lg43Opacity3'
            strokeWidth={lp.strokeWidth * strokeMultiplier / 2}
            pointerEvents="none"
          />
        </>
      );
    }
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
              const x = (d) => lp.isSeriesToScale ? getXScaleValue(getXaxisValue(d)) : getXaxisValue(d);


              const y = (d) => lp.isSeriesToScale ? getYScaleValue(getYaxisValue(d)) : getYaxisValue(d);

              const { areaProps } = lp || {};


              const toShowArea = areaProps && (!isEmpty(areaProps?.toX) || !isEmpty(areaProps?.toY));

              const areaPath = area({});
              const linePath = area({ x, y });

              const { toX, toY } = areaProps || {};

              if (!isEmpty(toX)) {
                areaPath.y(y);
                areaPath.x0(getXScaleValue(toX ?? 0));
                areaPath.x1(x);

              } else if (!isEmpty(toY)) {
                areaPath.x(x);
                areaPath.y0(getYScaleValue(toY ?? 0));
                areaPath.y1(y);

              }


              return (
                <>
                  {
                    toShowArea &&
                      <path
                        d={areaPath(lp.series) || ''}
                        fill={areaProps?.fill}
                        opacity={areaProps?.opacity}
                        style={{ ...areaProps.style }}
                        key={lp.key + 'Area'}
                      />
                  }
                  <path
                    d={linePath(lp.series) || ''}
                    opacity={areaProps?.opacity}
                    stroke={lp.color}
                    style={{ ...lp.style }}
                    key={lp.key}
                    strokeOpacity={lp.strokeOpacity}
                    shapeRendering="geometricPrecision"
                    strokeWidth={lp.strokeWidth}
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
                  {showHighlightedPoints(lp)}
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

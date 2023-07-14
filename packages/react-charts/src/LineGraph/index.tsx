import React, { useState } from 'react';

import { min, max, bisector } from 'd3-array';

import { localPoint } from '@visx/event';
import { area } from '@visx/shape';

import type { EventType } from '../utils/commonTypes';
import { isEmpty } from '../utils/helpers';

import type { Point, LinePathData, LineGraphProps, ToolTipData, ToolTipSeriesData, DragData } from './lineGraphTypes';


import './lineGraph.css';

const DefaultStrokeMultiplier = 1.5;



const LineGraph = (props: LineGraphProps) => {
  const [ tooltipData, setToolTipData ] = useState<ToolTipData | null>(null);
  const [ dragPoints, setDragPoints ] = useState<DragData | null>(null);

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


  const getXaxisValue = (d: Point) => d?.[0];


  const getYaxisValue = (d: Point): number => d?.[1];

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


  const getDragColor = (lp: LinePathData) => {
    const { startPoint, endPoint } = dragPoints ?? {};
    const { fill = lp?.color, lineColor, negativeLineColor } = lp?.draggableConfig ?? {};

    if (startPoint === undefined || endPoint === undefined) return lp?.color;
    const lpStart = lp?.series?.[startPoint]?.[1];
    const lpEnd = lp?.series?.[endPoint]?.[1];
    const line = lineColor ?? fill;
    const negativeLine = negativeLineColor ?? lineColor ?? fill;

    if (startPoint < endPoint) return lpStart < lpEnd ? line : negativeLine;
    return lpStart > lpEnd ? line : negativeLine;
  };


  const onMouseDown = (e: EventType) => {
    props.onMouseDown?.();
    if (!props.isDragAllowed) return;

    const { x } = localPoint(e) || { x: 0 };

    const x0 = invertX(x).toString();

    setDragPoints({ startPoint: Math.trunc(parseInt(x0)) });
  };


  const onMouseUp = () => {
    props.onMouseUp?.();
    setDragPoints(null);
  };


  const onMouseOut = () => {
    onMouseLeave?.();
    setToolTipData(null);
    setDragPoints(null);
  };


  const handleTooltip = (e: EventType) => {
    e.preventDefault();
    const { onMouseEnter } = props;


    const { x, y } = localPoint(e) || { x: 0, y: 0 };

    const x0 = invertX(x);
    const y0 = invertY(y);

    const bisectXAxis = bisector(getXaxisValue).left;


    const toolTipSeriesData: Array<ToolTipSeriesData> = [];

    linePaths?.map((lp: LinePathData) => {
      const { isDraggable } = lp;
      const series = [ ...lp.series ];
      const seriesLen = series.length;

      let index = bisectXAxis(series, x0, 0);

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

      const tempTooltipData = {
        point: nextPoint,
        tooltipLeft: lp?.isSeriesToScale ? getXScaleValue(getXaxisValue(nextPoint)) : getXaxisValue(nextPoint),
        tooltipTop: lp?.isSeriesToScale ? getYScaleValue(getYaxisValue(nextPoint)) : getYaxisValue(nextPoint),
        isPerfectIntersection: isPerfectIntersection,
        intersectionPointOnLine: {
          coords: { x: getXScaleValue(x0), y: getYScaleValue(calculatedYAtHoveredPoint) },
          invertedValues: { x: x0, y: calculatedYAtHoveredPoint }
        } };

      if (isDraggable && dragPoints) {
        const prevPoint: Point = series[dragPoints?.startPoint];

        toolTipSeriesData.push({
          ...tempTooltipData,
          prevPoint,
          prevTooltipLeft: getXScaleValue(dragPoints?.startPoint)
        });

        if (x0 <= seriesLen && dragPoints.startPoint !== undefined) {
          setDragPoints({
            ...dragPoints,
            endPoint: Math.max(Math.trunc(x0), 0)
          });
        }

      } else {
        toolTipSeriesData.push(tempTooltipData);
      }

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


  const getDragLinePoints = (series: Point[]) => {
    let { startPoint, endPoint } = dragPoints ?? {};

    if (startPoint === undefined || endPoint === undefined) return [];
    if (startPoint > endPoint) {
      [ startPoint, endPoint ] = [ endPoint, startPoint + 1 ];

    } else {
      endPoint += 1;
    }

    return series?.slice(startPoint, endPoint);
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
    if (!lp.hasHighlightedPoints) return;

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
      toolTipTopUpdated,
      isDragAllowed
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

    if (isDragAllowed && dragPoints?.endPoint) {
      return getTooltipUI(tooltipData);
    }

    return (
      <div style={tooltipStyle}>
        {getTooltipUI(tooltipData)}
      </div>
    );
  };


  const getHoveredPointUI = (x: number, y: number, color: string, strokeWidth: number, hoverPointStrokeMultiplier?: number) => {
    const strokeMultiplier = hoverPointStrokeMultiplier ?? DefaultStrokeMultiplier;

    return (
      <>
        <circle
          cx={x}
          cy={y}
          r={strokeWidth * strokeMultiplier}
          fill={color}
          stroke='var(--primaryBg)'
          strokeWidth={strokeWidth }
          pointerEvents="none"
        />
        <circle
          cx={x}
          cy={y}
          r={strokeWidth * strokeMultiplier}
          fill='var(--constantTransparent)'
          stroke={color}
          className='lg43Opacity3'
          strokeWidth={strokeWidth * strokeMultiplier / 2}
          pointerEvents="none"
        />
      </>
    );
  };


  const showDraggedPoints = (lp: LinePathData) => {
    if (!lp.allowToolTip || !dragPoints?.endPoint) {
      return null;
    }

    const { hoverPointStrokeMultiplier, strokeWidth } = lp;

    const x = getXScaleValue(dragPoints?.startPoint) + 2;
    const y = getYScaleValue(lp.series?.[dragPoints.startPoint]?.[1]);
    const color = getDragColor(lp);

    if (scaleX.range[0] <= x && x <= scaleX.range[1] && scaleY.range[1] <= y && y <= scaleY.range[0]) {
      return getHoveredPointUI(x, y, color, strokeWidth, hoverPointStrokeMultiplier);
    }
  };


  const showHoveredPoints = (lp: LinePathData, idx: number) => {
    if (!lp.allowToolTip || isEmpty(tooltipData)) {
      return null;
    }

    const { hoverPointStrokeMultiplier, strokeWidth } = lp;

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

    const color = dragPoints?.endPoint ? getDragColor(lp) : lp?.color;

    if (scaleX.range[0] <= x && x <= scaleX.range[1] && scaleY.range[1] <= y && y <= scaleY.range[0]) {
      return getHoveredPointUI(x, y, color, strokeWidth, hoverPointStrokeMultiplier);
    }
  };


  return (
    <>
      <svg width={width}
        height={height}

        onTouchMove={handleTooltip}
        onMouseMove={handleTooltip}

        onTouchStart={handleTooltip}

        onTouchEnd={onMouseOut}
        onMouseLeave={onMouseOut}

        onMouseUp={onMouseUp}

        onMouseDown={onMouseDown}
      >
        {props.getDefs?.()}
        <g>
          {
            linePaths.map(lp => {
              const x = (d:Point) => lp.isSeriesToScale ? getXScaleValue(getXaxisValue(d)) : getXaxisValue(d);


              const y = (d:Point) => lp.isSeriesToScale ? getYScaleValue(getYaxisValue(d)) : getYaxisValue(d);

              const { areaProps } = lp || {};


              const toShowArea = areaProps && (!isEmpty(areaProps?.toX) || !isEmpty(areaProps?.toY));

              const areaPath = area({});
              const linePath = area({ x, y });

              const { toX, toY } = areaProps || {};

              if (!isEmpty(toX)) {
                areaPath.y(y as any);
                areaPath.x0(getXScaleValue(toX ?? 0));
                areaPath.x1(x as any);

              } else if (!isEmpty(toY)) {
                areaPath.x(x as any);
                areaPath.y0(getYScaleValue(toY ?? 0));
                areaPath.y1(y as any);

              }


              const toShowDrag = lp.isDraggable && dragPoints?.endPoint;
              const dragLinePoints = toShowDrag ? getDragLinePoints(lp?.series) : [];
              const dragLineColor = getDragColor(lp);
              const dragPath = area({});

              dragPath.x(x as any);
              dragPath.y0(height);
              dragPath.y1(y as any);

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
                  {
                    toShowDrag && <>
                      <path
                        d={dragPath(dragLinePoints) || ''}
                        fill={lp?.draggableConfig?.fill}
                        key={lp.key + 'DragArea'}
                      />
                      <path
                        d={linePath(dragLinePoints) || ''}
                        stroke={dragLineColor}
                        style={{ ...lp.style }}
                        key={lp.key + 'DragLine'}
                        strokeOpacity={lp.strokeOpacity}
                        shapeRendering="geometricPrecision"
                        strokeWidth={lp.strokeWidth}
                      />
                    </>
                  }
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
                  {showDraggedPoints(lp)}
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
export type { Point, LinePathData, LineGraphProps, ToolTipData, ToolTipSeriesData };

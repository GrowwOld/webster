import React, { useState } from 'react';
import { max, min, bisector } from 'd3-array';
import { localPoint } from '@visx/event';

import { isEmpty } from '../utils/helpers';
import type { Candle, CandleChartDefaultProps, CandleChartRequiredProps, CandleToolTipData } from './candleChartTypes';
import type { EventType } from '../utils/commonTypes';

import './candleChart.css';

let toolTipRef: HTMLDivElement | null = null;


const CandleChart = (props: Props) => {

  const [ tooltipData, setToolTipData ] = useState<CandleToolTipData>();

  const {
    currentGraphData,
    toolTipFormatter,
    paddingVert,
    paddingHorz,
    height,
    width,
    allowTooltip,
    showVolumeBars,
    candleWidth,
    candleColor,
    volumeBarMaxHeight,
    toolTipHeight,
    minX,
    maxX,
    minY,
    maxY
  } = props;

  if (isEmpty(currentGraphData)) {
    return null;
  }

  const series = currentGraphData ?? [];


  const getIndex = (d: Candle) => d[0];


  const getHigh = (d: Candle) => d[2];


  const getLow = (d: Candle) => d[3];


  const getVol = (d: Candle) => d[5];
  let minYValue: number = minY ?? Number.MAX_SAFE_INTEGER;
  let maxYValue:number = maxY ?? Number.MIN_SAFE_INTEGER;
  let minXValue = minX ?? Number.MAX_SAFE_INTEGER;
  let maxXValue = maxX ?? Number.MIN_SAFE_INTEGER;
  let maxVol = Number.MIN_SAFE_INTEGER;
  let minVol = Number.MAX_SAFE_INTEGER;

  const tempMinY = min(currentGraphData, getLow);
  const tempMaxY = max(currentGraphData, getHigh);
  const tempMinX = min(currentGraphData, getIndex);
  const tempMaxX = max(currentGraphData, getIndex);
  const tempMinVol = min(currentGraphData, getVol);
  const tempMaxVol = max(currentGraphData, getVol);


  if (tempMinY !== undefined) { minYValue = Math.min(minYValue, tempMinY); }

  if (tempMaxY !== undefined) { maxYValue = Math.max(maxYValue, tempMaxY); }

  if (tempMinX !== undefined) { minXValue = Math.min(minXValue, tempMinX); }

  if (tempMaxX !== undefined) { maxXValue = Math.max(maxXValue, tempMaxX); }

  if (tempMinVol !== undefined) { minVol = Math.min(minVol, tempMinVol); }

  if (tempMaxVol !== undefined) { maxVol = Math.max(maxVol, tempMaxVol); }


  const scaleXData = {
    domain: [ minXValue, maxXValue ],
    range: [ 0 + paddingHorz, width - paddingHorz ]
  };


  const scaleYData = {
    domain: [ minYValue, maxYValue ],
    range: [ height - paddingVert, paddingVert ]
  };

  const scaleYVolumeData = {
    domain: [ minVol, maxVol ],
    range: [ height, height - paddingVert - volumeBarMaxHeight ]
  };


  const yScale = (yVal: number) => {
    return (
      scaleYData.range[0] +
          (yVal - scaleYData.domain[0]) * (scaleYData.range[1] - scaleYData.range[0]) / ((scaleYData.domain[1] - scaleYData.domain[0]) || scaleYData.domain[1])
    );
  };


  const yScaleVolume = (yVal: number) => {
    return (
      scaleYVolumeData.range[0] +
          (yVal - scaleYVolumeData.domain[0]) * (scaleYVolumeData.range[1] - scaleYVolumeData.range[0]) / ((scaleYVolumeData.domain[1] - scaleYVolumeData.domain[0]) || scaleYVolumeData.domain[1])
    );
  };


  const xScale = (xVal: number) : number => {
    return (
      scaleXData.range[0] +
          (xVal - scaleXData.domain[0]) * (scaleXData.range[1] - scaleXData.range[0]) / ((scaleXData.domain[1] - scaleXData.domain[0]) || scaleXData.domain[1])
    );
  };


  const invertX = (x: number): number => {
    return (
      scaleXData.domain[0] +
          ((x - scaleXData.range[0]) * (scaleXData.domain[1] - scaleXData.domain[0]) / (scaleXData.range[1] - scaleXData.range[0]))
    );
  };


  const getToolTipUI = () => {

    if (!tooltipData) {
      return null;
    }

    const contentWidth = toolTipRef?.offsetWidth ?? 0;
    const minVal = 0;
    const maxVal = width - contentWidth - 15;
    const finalToolTipLeft = Math.min(maxVal, Math.max(minVal, tooltipData?.tooltipLeft - (contentWidth / 2)));

    const tooltipStyle : React.CSSProperties = {
      top: 0,
      left: 0,
      boxShadow: 'none',
      padding: 0,
      backgroundColor: 'var(--constantTransparent)',
      position: 'absolute',
      borderRadius: '3px',
      transform: `translate(${finalToolTipLeft}px, ${-1 * toolTipHeight}px)`

    };

    return (
      <div ref={
        ref => {
          toolTipRef = ref;
        }
      }
      style={tooltipStyle}
      >
        {toolTipFormatter(tooltipData)}
      </div>
    );
  };


  const hideTooltip = () => {
    const { onMouseLeave } = props;

    setToolTipData(undefined);
    onMouseLeave?.();

  };


  const handleTooltip = (e: EventType) => {
    e.preventDefault();

    const { onMouseEnter } = props;

    const { x } = localPoint(e) || { x: 0 };
    const x0 = invertX(x);
    const bisectDate = bisector(getIndex).left;

    let index = bisectDate(series, x0, 0);

    if (index === series.length) {
      index = series.length - 1;
    }

    const indexData = series[index];

    setToolTipData({
      candle: indexData,
      tooltipLeft: xScale(getIndex(indexData)),
      tooltipTop: 0
    });
    onMouseEnter?.(indexData);
  };

  return (
    <>
      <svg
        width={width}
        height={height}
        onMouseMove={handleTooltip}
        onMouseLeave={hideTooltip }
        onTouchMove={handleTooltip}
        onTouchStart={handleTooltip}
        onTouchEnd={hideTooltip}
        onTouchCancel={hideTooltip}
      >
        <g key={'linesxssedc'}>
          {
            tooltipData && allowTooltip && (

              <line
                x1={tooltipData.tooltipLeft}
                y1={0}
                x2={tooltipData.tooltipLeft}
                y2={height}
                stroke='var(--border)'
                strokeWidth={1}
                pointerEvents="none"
              />
            )
          }
          {
            series.map((d, j) => {
              const [ ts, o, h, l, c, v ] = d;
              const xVal = xScale(ts);
              const clr = o > c ? candleColor[1] : candleColor[0];


              const barY = yScaleVolume(v);

              const yo = yScale(o);
              const yh = yScale(h);
              const yl = yScale(l);
              const yc = o === c ? yo + 1 : yScale(c);


              return (
                <>
                  <line
                    className='cc41Candle'
                    key={j}
                    x1={xVal}
                    x2={xVal}
                    y1={yh}
                    y2={yl}
                    stroke={clr}
                    strokeWidth={candleWidth[0]}
                    pointerEvents="none"
                  />
                  <line
                    className='cc41Candle'
                    key={'fad' + j}
                    x1={xVal}
                    x2={xVal}
                    y1={yo}
                    y2={yc}
                    stroke={clr}
                    strokeWidth={candleWidth[1]}
                    pointerEvents="none"
                  />
                  {
                    showVolumeBars &&
                        <line
                          className="cc41Opacity3"
                          key={'asd' + j}
                          x1={xVal}
                          x2={xVal}
                          y1={height}
                          y2={barY}
                          stroke={clr}
                          strokeWidth={candleWidth[2]}
                        />
                  }
                </>
              );
            })
          }
        </g>
      </svg>
      {
        tooltipData && allowTooltip && (
          getToolTipUI()
        )
      }
    </>
  );
};


type Props = CandleChartDefaultProps & CandleChartRequiredProps

CandleChart.defaultProps = {
  toolTipHeight: 10,
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  onTouchEnd: () => {},
  showVolumeBars: true
} as CandleChartDefaultProps;


export default CandleChart;
export type { Candle, CandleChartRequiredProps, CandleChartDefaultProps, CandleToolTipData };

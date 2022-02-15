export type Candle = [number, number, number, number, number, number, any];


export type CandleChartRequiredProps= {
  currentGraphData: Array<Candle>;
  toolTipFormatter: (toolTipData: CandleToolTipData) => React.ReactNode;
  maxCandles: number;
  key: string;
  paddingVert: number;
  paddingHorz: number;
  height: number;
  width: number;
  allowTooltip: boolean;
  candleWidth: [number, number, number]; // candle width for body, tail and volume part respectively
  candleColor: [string, string]; // candle colors for positive and negative change resp
  volumeBarMaxHeight: number;
  minX?: number;
  maxX?: number;
  minY?:number;
  maxY?: number;
}

export type CandleChartDefaultProps = {
  toolTipHeight: number;
  onMouseEnter?: (candle: Candle) => void;
  onMouseLeave?: () => void;
  onTouchEnd?: () => void;
  showVolumeBars: boolean;
}

export type CandleToolTipData = {
  candle: Candle;
  tooltipLeft: number;
  tooltipTop: number;
}

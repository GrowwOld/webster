export type Point = [number, number, any, OptionsType?];

export type OptionsType = {
  highlightPoint?: boolean;
}

export type LinePathData= {
  series: Array<Point>;            // series in Array<Point> format
  color: string;                   // color of series
  strokeWidth: number;             // stroke width
  key: string;                     // unique key
  style?: React.CSSProperties;     // style (optional) default-null
  showLastPointBlinking?: boolean; // flag to show last point blinking. optional. Default- false
  strokeOpacity: number;           // opacity of stoke. optional. default-1
  isSeriesToScale: boolean;         // flag to know whether to scale series or not. optional. default-true
  allowToolTip: boolean;           // flag to know whether to allow tooltip on series or not. optional. default-false
  areaProps?: AreaProps;
  hasHighlightedPoints?: boolean;
  hoverExactPoint?: boolean;
  hoverPointStrokeMultiplier?: number;
  highlightPointStrokeMultiplier?: number;
  isDraggable?: boolean;
  draggableConfig?: {
    fill?: string,
    lineColor?: string,
    negativeLineColor?: string,
  };
}

export type AreaProps = {
  toX?: number;
  toY?: number;
  fill: string;
  opacity: number;
  style?: React.CSSProperties;     // style (optional) default-null
}


export type LineGraphProps = {
  linePaths: Array<LinePathData>;    //Array of linePath for graph plotting
  width: number;                 // width of graph
  height: number;                // height of graph
  paddingVert: number;           // vertical padding (might be req for tooltip positioning)
  paddingHorz: number;           // horizontal padding (might be req for tooltip positioning)

  onMouseEnter?: (td: ToolTipData) => void; //on mouse enter callback
  onMouseLeave?: ()=> void;        // on Mouse leave callback
  onMouseUp?: ()=> void;        // on Mouse Up callback
  onMouseDown?: ()=> void;        // on Mouse Down callback

  toolTipLeftUpdated?: number;   // calculated/updated toolTipLeft
  toolTipTopUpdated?: number;    // calculated/updated toolTipTop
  getTooltipUI?: (toolTipData: ToolTipData) => JSX.Element; //get tool tip ui
  getDefs?: () => JSX.Element; //get defs for ui
  maxX?: number;
  minX?: number;
  maxY?: number;
  minY?: number;

  isDragAllowed: boolean; // if dragging is allowed inside graph area
}

export type XYCoords = {x: number; y: number};


//tooltip point for every linePath
export type ToolTipSeriesData = {
  point: Point;
  tooltipLeft: number;
  tooltipTop: number;
  isPerfectIntersection: boolean;
  intersectionPointOnLine: HoveredPointData;
  prevPoint?: Point;
  prevTooltipLeft?: number;
}

export type HoveredPointData = {
  coords: XYCoords;
  invertedValues: XYCoords;
};

//tooltip data which is irrespective of series data
export type ToolTipData = {
  seriesData: ToolTipSeriesData[];
  otherData: HoveredPointData;
}

export type DragData = {
  startPoint: number;
  endPoint?: number;
}

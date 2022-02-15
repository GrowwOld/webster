export type Point = [number, number, any];


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
}


export type LineGraphProps = {
  linePaths: Array<LinePathData>;    //Array of linePath for graph plotting
  width: number;                 // width of graph
  height: number;                // height of graph
  paddingVert: number;           // vertical padding (might be req for tooltip positioning)
  paddingHorz: number;           // horizontal padding (might be req for tooltip positioning)

  onMouseEnter?: (td: Array<ToolTipData>) => void; //on mouse enter callback
  onMouseLeave?: ()=> void;        // on Mouse leave callback

  toolTipLeftUpdated?: number;   // calculated/updated toolTipLeft
  toolTipTopUpdated?: number;    // calculated/updated toolTipTop
  getTooltipUI?: (toolTipData: Array<ToolTipData>) => JSX.Element; //get tool tip ui
  maxX?: number;
  minX?: number;
  maxY?: number;
  minY?: number;
}


export type ToolTipData = {
  point: Point;
  tooltipLeft: number;
  tooltipTop: number;
}

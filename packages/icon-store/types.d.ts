/* Ref: https://github.com/levrik/mdi-react/blob/master/scripts/generate-react.js */
import {
  ComponentType,
  SVGProps,
} from 'react';

export interface ReactIconProps extends SVGProps<SVGSVGElement> {
  /**
   * size is a common prop for height and width
   * @example
   * size => 24 will set height => 24, width => 24
   *  */
  size?: number | string;
  /** Enable the icon component to inherit old svg image props*/
  custom?: boolean;
}

export type ReactIconComponentType = ComponentType<ReactIconProps>;

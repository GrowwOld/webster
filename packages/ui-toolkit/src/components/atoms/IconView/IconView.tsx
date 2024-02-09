import React from 'react';
import cn from 'classnames';

import { ReactIconProps } from '@groww-tech/icon-store';

import { ICON_VIEW_SIZES } from './iconView.constants';

import './iconView.css';

export default function IconView(props: Props) {
  const { iconComponent, size, isContained } = props;


  const getIconSize = () => {
    switch (size) {
      case ICON_VIEW_SIZES.SMALL:
        return 16;

      case ICON_VIEW_SIZES.BASE:
        return 20;

      case ICON_VIEW_SIZES.LARGE:
        return 24;

      case ICON_VIEW_SIZES.XLARGE:
        return 28;

      default:
        return 20;
    }
  };

  const iconProps = {
    className: 'absolute-center',
    size: getIconSize()
  };

  const iconViewClasses = cn(`iv98IconContainer iv98${size} circle`, {
    backgroundTertiary: isContained
  });

  return <div className={iconViewClasses}>{iconComponent(iconProps as ReactIconProps)}</div>;
}


type RequiredProps = {
  iconComponent: (props: ReactIconProps) => JSX.Element;
};


type DefaultProps = {
  size?: ValueOf<typeof ICON_VIEW_SIZES>;
  isContained?: boolean;
};

IconView.defaultProps = {
  size: ICON_VIEW_SIZES.BASE,
  isContained: false
};

export type Props = RequiredProps & DefaultProps;

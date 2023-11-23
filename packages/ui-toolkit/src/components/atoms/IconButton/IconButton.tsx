import React from 'react';
import cn from 'classnames';

import { ReactIconProps } from '@groww-tech/icon-store';

import { SIZES } from '../../../utils/constants';
import { Loader, LOADER_TYPE } from '../Loader';
import { ICON_BUTTON_SIZE } from './iconButton.constants';

import './iconButton.css';

export default function IconButton(props: Props) {
  const {
    iconComponent,
    isLoading,
    isDisabled,
    isSelected,
    size
  } = props;


  const getIconSize = () => {
    switch (size) {

      case SIZES.SMALL: return 16;

      case SIZES.BASE: return 20;

      case SIZES.LARGE: return 24;

      case SIZES.XLARGE: return 28;

      default: return 20;
    }
  };

  const iconProps = {
    className: 'absolute-center',
    color: isDisabled ? 'var(--gray400)' : 'var(--gray900)',
    size: getIconSize()
  };

  const iconClasses = cn(
    'ib31IconDefault',
    {
      backgroundSecondary: isDisabled,
      borderDisabled: isSelected && isDisabled,
      borderNeutral: isSelected && !isDisabled,
      ib31IconSelected: isSelected,
      ib31IsLoading: isLoading
    });

  return (
    isLoading
      ? <Loader loaderType={LOADER_TYPE.CIRCULAR}
        loaderClassName='iconLoader'
        dimension={size}
      />
      : <div className={iconClasses}>
        {iconComponent(iconProps as any)}
      </div>
  );
}


type RequiredProps = {
  iconComponent: (props: ReactIconProps) => JSX.Element;
  onClick: (e: React.MouseEvent) => void;
};


type DefaultProps = {
  size?: ValueOf <typeof ICON_BUTTON_SIZE>;
  isSelected?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
};


IconButton.defaultProps = {
  size: SIZES.BASE,
  isSelected: false,
  isDisabled: false,
  isLoading: false
};

export type Props = RequiredProps & DefaultProps;

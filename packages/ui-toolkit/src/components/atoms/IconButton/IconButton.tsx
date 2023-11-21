import React from 'react';
import cn from 'classnames';

import { ReactIconProps } from '@groww-tech/icon-store';

import { Loader, LOADER_TYPE } from '../Loader';

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
      case 'XSmall': return 24;

      case 'Small': return 32;

      case 'Base': return 40;

      case 'Large': return 48;

      case 'XLarge': return 56;

      default: return 40;
    }
  };

  const iconProps = {
    className: 'absolute-center',
    color: isDisabled ? 'var(--gray400)' : 'var(--green500)',
    size: getIconSize()
  };

  const iconClasses = cn(
    'ib31IconDefault',
    {
      'ib31Disabled': isDisabled,
      'ib31IconSelected': isSelected,
      'ib31IsLoading': isLoading
    });

  return (
    isLoading
      ? <Loader loaderType={LOADER_TYPE.CIRCULAR}
        loaderClassName='iconLoader'
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
  size?: 'XSmall' | 'Small' | 'Base' | 'Large' | 'XLarge';
  isSelected?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
};


IconButton.defaultProps = {
  size: 'Base',
  isSelected: false,
  isDisabled: false,
  isLoading: false
};

export type Props = RequiredProps & DefaultProps;

import React from 'react';
import cn from 'classnames';

import { Loader, LOADER_TYPE } from '../Loader';

import './iconButton.css';
import { ReactIconProps } from '@groww-tech/icon-store';

export default function IconButton(props: Props) {
  const {
    iconComponent,
    isLoading,
    isDisabled,
    isSelected,
    iconClass
  } = props;

  const iconProps = {
    className: cn(iconClass, 'ib31Icon absolute-center'),
    color: 'var(--green500)'
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
  iconClass?: string;
  isSelected?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
};


IconButton.defaultProps = {
  iconClass: '',
  isSelected: false,
  isDisabled: false,
  isLoading: false
};

export type Props = RequiredProps & DefaultProps;

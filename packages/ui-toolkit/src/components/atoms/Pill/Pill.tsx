import React from 'react';
import cn from 'classnames';

import { ReactIconProps } from '@groww-tech/icon-store';

import './pill.css';


const Pill = (props: Props) => {
  const {
    size,
    text,
    leadingIcon,
    trailingIcon,
    isAccent,
    isSelected,
    isOutlined
  } = props;


  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    const { onClick } = props;

    onClick(e);
  };

  const pillIconProps = {
    size: 20
  };

  const labelClassName = cn({
    bodySmall: size === 'Small' || size === 'XSmall',
    bodyBase: size === 'Base',
    bodyLarge: size === 'Large',
    bodyXLarge: size === 'XLarge'
  });

  return (
    <div
      className={
        cn(
          'backgroundPrimary',
          'contentPrimary',
          'absolute-center',
          'cur-po',
          'valign-wrapper',
          `pill12Size${size}`,
          {
            pill12Pill: true,
            pill12PillHover: !isSelected && !isAccent,
            'borderNeutral': isOutlined && !isAccent,
            'borderAccent': isAccent && isOutlined,
            pill12SelectedPill: !isAccent && isSelected,
            'backgroundPositiveSubtle contentAccent borderAccent': isSelected && isAccent
          }
        )
      }
      onClick={handleClick}
    >
      <span className='valign-wrapper'>{leadingIcon?.(pillIconProps)}</span>

      <span className={labelClassName}>{text}</span>

      <span>{trailingIcon?.(pillIconProps)}</span>
    </div>
  );
};


type RequiredProps = {
  text: string;
}


type DefaultProps = {
  size: 'XSmall' | 'Small' | 'Base' | 'Large' | 'XLarge';
  onClick: (e: React.MouseEvent<HTMLImageElement>) => void;
  isSelected: boolean;
  isAccent: boolean;
  isOutlined: boolean;
  leadingIcon: ((props: ReactIconProps) => JSX.Element) | null;
  trailingIcon: ((props: ReactIconProps) => JSX.Element) | null;
};

export type Props = RequiredProps & DefaultProps;

Pill.defaultProps = {
  size: 'Base',
  onClick: () => { },
  isSelected: false,
  isOutlined: true,
  isAccented: false,
  leadingIcon: null,
  trailingIcon: null
};

export default React.memo(Pill);
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
    bodyRegular12: size === 'Small' || size === 'XSmall',
    bodyRegular14: size === 'Base',
    bodyRegular16: size === 'Large',
    bodyRegular18: size === 'XLarge'
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
            pill12Outlined: isOutlined,
            pill12SelectedPill: !isAccent && isSelected,
            pill12SelectedAccentPill: isSelected && isAccent
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

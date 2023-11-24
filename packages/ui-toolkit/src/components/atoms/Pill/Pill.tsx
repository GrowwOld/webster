import React from 'react';
import cn from 'classnames';

import { ReactIconProps } from '@groww-tech/icon-store';
import { SIZES } from '../../../utils/constants';

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

  const baseClasses = cn('contentPrimary', 'absolute-center', 'cur-po', 'valign-wrapper', `pill12Size${size}`,
    {
      pill12Pill: true,
      pill12PillHover: !isSelected && !isAccent,
      borderNeutral: isSelected && !isAccent,
      borderAccent: isAccent,
      pill12SelectedPill: !isAccent && isSelected,
      contentAccent: isAccent,
      backgroundPositiveSubtle: isSelected && isAccent
    });

  const labelClasses = cn({
    bodySmallHeavy: size === SIZES.SMALL || size === SIZES.XSMALL,
    bodyBaseHeavy: size === SIZES.BASE,
    bodyLargeHeavy: size === SIZES.LARGE || size === SIZES.XLARGE
  });

  return (
    <div className={baseClasses}
      onClick={handleClick}
    >
      {leadingIcon && <span className='valign-wrapper'>{leadingIcon?.(pillIconProps)}</span>}

      <span className={labelClasses}>{text}</span>

      {trailingIcon && <span className='valign-wrapper'>{trailingIcon?.(pillIconProps)}</span>}
    </div>
  );
};


type RequiredProps = {
  text: string;
}


type DefaultProps = {
  size: ValueOf <typeof SIZES>;
  onClick: (e: React.MouseEvent<HTMLImageElement>) => void;
  isSelected: boolean;
  isAccent: boolean;
  isOutlined: boolean;
  leadingIcon: ((props: ReactIconProps) => JSX.Element) | null;
  trailingIcon: ((props: ReactIconProps) => JSX.Element) | null;
};

export type Props = RequiredProps & DefaultProps;

Pill.defaultProps = {
  size: SIZES.BASE,
  onClick: () => {},
  isSelected: false,
  isOutlined: true,
  isAccented: true,
  leadingIcon: null,
  trailingIcon: null
};

export default React.memo(Pill);

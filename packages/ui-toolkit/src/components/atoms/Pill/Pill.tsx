import React from 'react';
import cn from 'classnames';

import { ReactIconProps } from '@groww-tech/icon-store';

import './pill.css';


const Pill = (props: Props) => {
  const {
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
    size: 14
  };

  return (
    <div
      className={
        cn('backgroundPrimary', 'contentPrimary', 'absolute-center', 'bodyMedium12', 'cur-po', {
          pill12Pill: true,
          pill12PillHover: !isSelected && !isAccent,
          pill12Outlined: isOutlined,
          pill12SelectedPill: !isAccent && isSelected,
          pill12SelectedAccentPill: isSelected && isAccent
        })
      }
      onClick={handleClick}
    >
      {leadingIcon?.(pillIconProps)}

      <span>{text}</span>

      {trailingIcon?.(pillIconProps)}
    </div>
  );
};


type RequiredProps = {
  text: React.ReactNode;
}


type DefaultProps = {
  onClick: (e: React.MouseEvent<HTMLImageElement>) => void;
  isSelected: boolean;
  isAccent: boolean;
  isOutlined: boolean;
  leadingIcon: ((props: ReactIconProps) => JSX.Element) | null;
  trailingIcon: ((props: ReactIconProps) => JSX.Element) | null;
};

export type Props = RequiredProps & DefaultProps;

Pill.defaultProps = {
  onClick: () => { },
  isSelected: false,
  isOutlined: true,
  isAccented: false,
  leadingIcon: null,
  trailingIcon: null
};

export default React.memo(Pill);

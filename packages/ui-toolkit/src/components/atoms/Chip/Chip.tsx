import React from 'react';
import cn from 'classnames';

import { ReactIconProps } from '@groww-tech/icon-store';

import './chip.css';


const Chip = (props: Props) => {
  const {
    text,
    textClass,
    parentClass,
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

  const chipIconProps = {
    size: 14
  };

  return (
    <div
      className={
        cn('backgroundPrimary', 'contentPrimary', 'absolute-center', 'bodyMedium12', 'cur-po', {
          chip12Chip: true,
          chip12ChipHover: !isSelected && !isAccent,
          chip12Outlined: isOutlined,
          chip12SelectedChip: !isAccent && isSelected,
          chip12SelectedAccentChip: isSelected && isAccent,
          [`${parentClass}`]: true
        })
      }
      onClick={handleClick}
    >
      {leadingIcon?.(chipIconProps)}

      <span className={textClass}>{text}</span>

      {trailingIcon?.(chipIconProps)}
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
  parentClass: string;
  textClass: string;
};

export type Props = RequiredProps & DefaultProps;

Chip.defaultProps = {
  onClick: () => { },
  isSelected: false,
  isOutlined: true,
  isAccented: false,
  leadingIcon: null,
  trailingIcon: null,
  textClass: '',
  parentClass: ''
};

export default React.memo(Chip);

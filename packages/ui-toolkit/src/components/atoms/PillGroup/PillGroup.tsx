import React, { useState } from 'react';
import cn from 'classnames';

// eslint-disable-next-line import/no-unresolved
import { ReactIconProps } from '@groww-tech/icon-store';
import { SIZES } from '../../../utils/constants';

import './pillGroup.css';
import { Pill } from '../Pill';


const PillGroup = (props: Props) => {
  const { data, isOutlined, isMultiselect, onPillSelect } = props;

  const [ pills, setPills ] = useState(() => {
    return data.map((pill, index) => ({
      id: `${pill.text}-${index}`,
      ...pill
    }));
  });


  const handleClick = (pill: Pill & { id: string }) => {
    if (isMultiselect) {
      setPills((prevPills) =>
        prevPills.map((item) =>
          item.id === pill.id
            ? {
              ...item,
              isSelected: !item.isSelected
            }
            : item
        )
      );

    } else {
      setPills((prevPills) =>
        prevPills.map((item) =>
          item.id === pill.id
            ? {
              ...item,
              isSelected: true
            }
            : {
              ...item,
              isSelected: false
            }
        )
      );
    }

    onPillSelect(pills);
  };

  const baseClasses = cn('pillGroup43PillGroup valign-wrapper');

  return (
    <div className={baseClasses}>
      {
        pills.map((pill, index) => (
          <Pill
            key={pill.id}
            text={pill.text}
            isSelected={pill.isSelected}
            isOutlined={isOutlined}
            isAccent={false}
            leadingIcon={pill.leadingIcon}
            trailingIcon={pill.trailingIcon}
            onClick={(e) => handleClick(pill)}
            size={pill.size}
          />
        ))
      }
    </div>
  );
};


type RequiredProps = {
  data: Pill[];
  onPillSelect: (pills: Pill[]) => void;
};


type DefaultProps = {
  isOutlined: boolean;
  isMultiselect: boolean;
};


type Pill = {
  text: string;
  isSelected: boolean;
  size?: ValueOf<typeof SIZES>;
  leadingIcon?: ((props: ReactIconProps) => JSX.Element) | null;
  trailingIcon?: ((props: ReactIconProps) => JSX.Element) | null;
};

export type Props = RequiredProps & DefaultProps;

PillGroup.defaultProps = {
  isOutlined: true,
  isMultiselect: true
} as DefaultProps;

export default React.memo(PillGroup);

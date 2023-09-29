import React from 'react';

import { CheckBox as CheckBoxChecked, CheckBoxOutlineBlank } from '@groww-tech/icon-store/mi';

import './checkBox.css';

export const CHECKBOX_DIRECTION = {
  LEFT: 'left',
  RIGHT: 'right'
};


const CheckBox = (props: Props) => {

  const {
    label,
    size,
    labelComponent,
    isChecked,
    handleOnClick,
    value,
    isDisabled,
    checkBoxDirection,
    dataTestId
  } = props;


  const checkBoxClick = (e: React.MouseEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>) => {
    if (!isDisabled) {
      handleOnClick?.(value, !isChecked, e);
    }
  };


  return (
    <div
      onClick={(e) => checkBoxClick(e)}
      data-test-id={dataTestId.length ? dataTestId : null}
      className={`c11AlignCenter c11Pointer  ${checkBoxDirection === CHECKBOX_DIRECTION.RIGHT ? 'c11checkOnRight' : ''}`}
    >
      {
        isChecked ? (
          <CheckBoxChecked
            size={size}
            color={isDisabled ? 'var(--gray400)' : 'var(--green500)'}
          />
        ) : (
          <CheckBoxOutlineBlank
            size={size}
            color={isDisabled ? 'var(--gray400)' : 'var(--gray700)'}
          />
        )
      }
      {label && <div className="c11CLabel">{label}</div>}
      {labelComponent && labelComponent()}
    </div>
  );
};


type DefaultProps = {
  size: number;
  label: React.ReactNode;
  value: string;
  isChecked: boolean;
  isDisabled: boolean;
  labelComponent: () => React.ReactNode;
  checkBoxDirection: ValueOf<typeof CHECKBOX_DIRECTION>;
  dataTestId: string;
}


type RequiredProps = {
  handleOnClick: (value: string, isChecked: boolean, e?: React.MouseEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>) => void;
}

CheckBox.defaultProps = {
  size: 14,
  label: '',
  value: '',
  isChecked: false,
  isDisabled: false,
  labelComponent: () => null,
  checkBoxDirection: CHECKBOX_DIRECTION.LEFT,
  dataTestId: ''
} as DefaultProps;

export type Props = DefaultProps & RequiredProps;

export default CheckBox;

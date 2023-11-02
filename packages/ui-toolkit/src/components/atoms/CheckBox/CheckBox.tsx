import React from 'react';
import cn from 'classnames';

import './checkBox.css';

export const CHECKBOX_DIRECTION = {
  LEFT: 'Left',
  RIGHT: 'Right'
};


const CheckBox = (props: Props) => {
  const {
    size,
    label,
    isChecked,
    handleOnClick,
    value,
    isDisabled,
    checkBoxDirection,
    dataTestId
  } = props;

  const activeColor = isDisabled ? 'var(--gray400)' : 'var(--green500)';


  const checkBoxClick = (
    e: React.MouseEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!isDisabled) {
      handleOnClick(value, !isChecked, e);
    }
  };


  const inactive_svg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 14 14"
    >
      <path
        fill="transparent"
        fillRule="evenodd"
        stroke={activeColor}
        d="M2.564.5c-.737 0-1.017.054-1.305.208a1.317 1.317 0 0 0-.551.551C.554 1.547.5 1.827.5 2.564v8.872c0 .737.054 1.017.208 1.305.128.239.312.423.551.551.288.154.568.208 1.305.208h8.872c.737 0 1.017-.054 1.305-.208.239-.128.423-.312.551-.551.154-.288.208-.568.208-1.305V2.564c0-.737-.054-1.017-.208-1.305a1.317 1.317 0 0 0-.551-.551C12.453.554 12.173.5 11.436.5H2.564z"
      />
    </svg>
  );

  const active_svg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 14 14"
    >
      <g fill="none"
        fillRule="evenodd"
      >
        <path
          fill={activeColor}
          stroke={activeColor}
          d="M2.564.5c-.737 0-1.017.054-1.305.208a1.317 1.317 0 0 0-.551.551C.554 1.547.5 1.827.5 2.564v8.872c0 .737.054 1.017.208 1.305.128.239.312.423.551.551.288.154.568.208 1.305.208h8.872c.737 0 1.017-.054 1.305-.208.239-.128.423-.312.551-.551.154-.288.208-.568.208-1.305V2.564c0-.737-.054-1.017-.208-1.305a1.317 1.317 0 0 0-.551-.551C12.453.554 12.173.5 11.436.5H2.564z"
        />
        <path
          fill={'white'}
          fillRule="nonzero"
          d="M9.69 5.173a.591.591 0 1 1 .837.836L6.98 9.556a.591.591 0 0 1-.836 0l-1.97-1.97a.591.591 0 0 1 .835-.836l1.553 1.552L9.69 5.173z"
        />
      </g>
    </svg>
  );


  const labelClasses = cn({
    'bodyRegular12': size === 'Small' || size === 'XSmall',
    'bodyRegular14': size === 'Base',
    'bodyRegular16': size === 'Large',
    'bodyRegular18': size === 'XLarge'
  });

  return (
    <div
      onClick={(e) => checkBoxClick(e)}
      data-test-id={dataTestId.length ? dataTestId : null}
      className={`c11Default valign-wrapper c11Pointer c11Size${size} ${checkBoxDirection === CHECKBOX_DIRECTION.RIGHT ? 'c11checkOnRight' : ''}`}
    >
      <div className='valign-wrapper'>{isChecked ? active_svg : inactive_svg}</div>

      {label && <div className={labelClasses}>{label}</div>}
    </div>
  );
};


type DefaultProps = {
  size: 'XSmall' | 'Small' | 'Base' | 'Large' | 'XLarge';
  label: string;
  value: string;
  isChecked: boolean;
  isDisabled: boolean;
  checkBoxDirection: 'Left' | 'Right';
  dataTestId: string;
};


type RequiredProps = {
  handleOnClick: (
    value: string,
    isChecked: boolean,
    e?: React.MouseEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>
  ) => void;
};

CheckBox.defaultProps = {
  size: 'Base',
  label: '',
  value: '',
  isChecked: false,
  isDisabled: false,
  labelComponent: () => null,
  checkBoxDirection: 'Left',
  dataTestId: ''
} as unknown as DefaultProps;

export type Props = DefaultProps & RequiredProps;

export default CheckBox;

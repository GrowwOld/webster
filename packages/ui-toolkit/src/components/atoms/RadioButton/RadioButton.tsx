import React from 'react';
import cn from 'classnames';

import { RadioButtonChecked, RadioButtonUnchecked } from '@groww-tech/icon-store/mi';

import './radioButton.css';

export const RADIO_DIRECTION = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
};


const RadioButton = (props: Props) => {

  const {
    label,
    selected,
    onSelect,
    labelClassName,
    parentClassName,
    iconClassName,
    radioDirection,
    dataTestId,
    isDisabled
  } = props;

  const labelParentClassName = cn({
    'contentPrimary bodyRegular16 radioLs2': true,
    [`${labelClassName}`]: true,
    'radioCo11LabelRight': radioDirection === RADIO_DIRECTION.RIGHT,
    'radioCo11LabelLeft': radioDirection === RADIO_DIRECTION.LEFT
  });


  const radioButtonClick = () => {
    if (!isDisabled) {
      onSelect();
    }
  };

  return (
    <div
      onClick={radioButtonClick}
      data-test-id={dataTestId.length ? dataTestId : null}
      className={`radioCo11Box ${parentClassName}  ${radioDirection === RADIO_DIRECTION.RIGHT ? 'radioCo11BoxReverse' : ''}`}
    >
      {
        selected
          ? (
            <RadioButtonChecked
              size={20}
              color={isDisabled ? 'var(--gray400)' : 'var(--green500)'}
              className={`radioCo11Icon ${iconClassName}`}
            />
          )
          : (
            <RadioButtonUnchecked
              size={20}
              color={isDisabled ? 'var(--gray400)' : 'var(--green500)'}
              className={`radioCo11Icon ${iconClassName}`}
            />
          )
      }
      <div className={labelParentClassName}>
        {label}
      </div>
    </div>
  );
};


const defaultProps: DefaultProps = {
  iconClassName: '',
  labelClassName: '',
  parentClassName: 'bas11RadioParent',
  dataTestId: '',
  radioDirection: RADIO_DIRECTION.LEFT,
  isDisabled: false
};


type DefaultProps = {
  labelClassName: string;
  parentClassName: string;
  radioDirection: ValueOf<typeof RADIO_DIRECTION>;
  iconClassName: string;
  dataTestId: string;
  isDisabled: boolean;
}


type RequiredProps = {
  value?: React.ReactNode;
  label: React.ReactNode;
  selected: boolean;
  onSelect: () => void;
}


RadioButton.defaultProps = defaultProps;

export type Props = RequiredProps & DefaultProps;

export default React.memo(RadioButton);

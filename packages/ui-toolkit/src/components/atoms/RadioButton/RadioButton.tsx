import React from 'react';
import cn from 'classnames';

import { RadioButtonChecked, RadioButtonUnchecked } from '@groww-tech/icon-store/mi';

import './radioButton.css';

export const RADIO_DIRECTION = {
  LEFT: 'Left',
  RIGHT: 'Right'
};


const RadioButton = (props: Props) => {

  const {
    size,
    label,
    isSelected,
    onSelect,
    radioDirection,
    dataTestId,
    isDisabled
  } = props;

  const labelParentClassName = cn({
    'contentPrimary radioLs2': true,
    'radioCo11LabelRight': radioDirection === RADIO_DIRECTION.RIGHT,
    'radioCo11LabelLeft': radioDirection === RADIO_DIRECTION.LEFT,
    'bodyRegular12': size === 'Small' || size === 'XSmall',
    'bodyRegular14': size === 'Base',
    'bodyRegular16': size === 'Large',
    'bodyRegular18': size === 'XLarge'
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
      className={
        `radioCo11Box valign-wrapper ${
          radioDirection === 'Right' ? 'radioCo11BoxReverse' : ''
        }`
      }
    >
      <div className='valign-wrapper'>
        {
          isSelected ? (
            <RadioButtonChecked
              size={20}
              color={isDisabled ? 'var(--gray400)' : 'var(--green500)'}
            />
          ) : (
            <RadioButtonUnchecked
              size={20}
              color={isDisabled ? 'var(--gray400)' : 'var(--green500)'}
            />
          )
        }
      </div>
      <div className={labelParentClassName}>{label}</div>
    </div>
  );
};


const defaultProps: DefaultProps = {
  size: 'Base',
  dataTestId: '',
  radioDirection: 'Left',
  isDisabled: false
};


type DefaultProps = {
  size: 'XSmall' | 'Small' | 'Base' | 'Large' | 'XLarge';
  dataTestId: string;
  radioDirection: 'Left' | 'Right';
  isDisabled: boolean;
}


type RequiredProps = {
  value?: React.ReactNode;
  label: React.ReactNode;
  isSelected: boolean;
  onSelect: () => void;
}


RadioButton.defaultProps = defaultProps;

export type Props = RequiredProps & DefaultProps;

export default React.memo(RadioButton);

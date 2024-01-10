import React from 'react';

import { KEYBOARD_EVENTS } from '../../../utils/constant';
import { preventDefaultEventBehaviour, preventNumberInputWheelChangeOnBlur, preventNumberInputWheelChangeOnFocus } from './helpers';
import { NumberInputProps } from './NumberInput';
import { Container, Input } from './styles';

const BaseNumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>((props, ref) => {
  const {
    SuffixComponent = null,
    PrefixComponent = null,
    value = 0,
    onChange,
    min = Number.NEGATIVE_INFINITY,
    max = Number.POSITIVE_INFINITY,
    step = 1,
    allowSpecialCharacters = false,
    disableDecimal = false,
    onKeyDown = () => { }
  } = props;
  const { size, disableScroll = true, ...rest } = props;

  const numberValue = Number(value);


  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };


  const _onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const preventSpecialChar = (allowSpecialCharacters && [ '+', '-', 'e' ].includes(e.key));
    const preventDecimal = disableDecimal && [ '.' ].includes(e.key);
    const preventDoubleDecimal = (e.key === '.' && value.toString().includes('.'));

    const isDelete = e.code === KEYBOARD_EVENTS.delete || e.code === KEYBOARD_EVENTS.backspace || e.key === KEYBOARD_EVENTS.delete || e.key === KEYBOARD_EVENTS.backspace;
    const isArrowKey = /^Arrow/.test(e.code) || /^Arrow/.test(e.key);
    const isValidKey = /^[0-9]*$/.test(e.key) || /^\./.test(e.key) || isDelete || isArrowKey;

    if (!isValidKey || preventSpecialChar || preventDecimal || preventDoubleDecimal) {
      e.preventDefault();
    }

    if (e.key === KEYBOARD_EVENTS.arrowDown) {
      onDecrement();
    }

    if (e.key === KEYBOARD_EVENTS.arrowUp) {
      onIncrement();
    }

    onKeyDown(e);
  };


  const onIncrement = () => {
    if (max >= numberValue + step) {
      const increasedVal = numberValue + step;
      const floorValue = Math.floor(increasedVal / step) * step;

      // @ts-ignore : to prevent onChange re writing as it can be passed by user
      //we are synthentically generating custome event to set value
      onChange({ target: { value: floorValue } });
    }
  };


  const onDecrement = () => {
    if (min <= numberValue - step) {
      const increasedVal = numberValue - step;
      const floorValue = Math.floor(increasedVal / step) * step;

      // @ts-ignore : to prevent onChange re writing as it can be passed by user
      //we are synthentically generating custome event to set value
      onChange({ target: { value: floorValue } });
    }
  };

  let restPropsUpdated = { ...rest };


  const onFocus = (e: any) => { preventNumberInputWheelChangeOnFocus(e, preventDefaultEventBehaviour); };


  const onBlur = (e: any) => { preventNumberInputWheelChangeOnBlur(e, preventDefaultEventBehaviour); };


  if (disableScroll) {
    restPropsUpdated = {
      ...restPropsUpdated,
      onFocus,
      onBlur
    };
  }


  return (
    <Container variant={props.variant}>
      {PrefixComponent && <span>{PrefixComponent()} </span>}
      <Input
        className={calculateInputClass(size)}
        max={max}
        min={min}
        onKeyDown={_onKeyDown}
        type="number"
        {...restPropsUpdated}
        onChange={_onChange}
        ref={ref}
      />
      {SuffixComponent && <span>{SuffixComponent()}</span>}
    </Container>
  );
});


const calculateInputClass = (size: NumberInputProps['size']): string => {
  let className = '';

  switch (size) {
    case 'small':
      className = 'bodyLargeHeavy';
      break;

    case 'medium':
      className = 'bodyXLargeHeavy';
      break;

    case 'large':
      className = 'headingLarge';
      break;

    default:
      className = 'bodyXLargeHeavy';
      break;

  }

  return className;
};


export default BaseNumberInput;

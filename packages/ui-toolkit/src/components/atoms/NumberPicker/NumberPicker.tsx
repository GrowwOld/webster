import React, { useEffect, useRef, useState } from 'react';

import { NumberInput } from '../index';

import './numberPicker.css';

const VARIANTS = {
  disabled: 'disabled',
  warning: 'warning',
  error: 'error',
  unstyled: 'unstyled',
  default: 'default'
};


const NumberPicker = (props: Props) => {

  const {
    value,
    minValue,
    onInput,
    onKeyDown,
    stepValue,
    shouldFocusOnMount,
    disabled,
    variant,
    maxWidth,
    width
  } = props;

  const textInput: React.Ref<HTMLInputElement> = useRef(null);

  useEffect(() => {

    if (shouldFocusOnMount) {
      if (textInput?.current) {
        textInput.current.focus();
      }
    }

    const parentInputList = document.querySelectorAll('#numPicker #txtinput88');


    //added from msite
    const parentInputListToArr = Array.from(parentInputList);
    /* resolved using this link :- https://stackoverflow.com/questions/41054259/how-can-i-make-queryselectorall-or-foreach-work-in-firefox */


    parentInputListToArr.forEach((element: any) => {
      const len = Number(value).toString().length;

      if (len > 4) {
        const newWidth = width + (len - 4) * 12;

        if (newWidth < maxWidth) {
          element.style.width = newWidth + 'px';
        }

      } else {
        element.style.width = width + 'px';
      }
    });

  }, [ value ]);


  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);

    onInput(val);
  };


  const getVariant = () => {

    if (disabled) {
      return VARIANTS.disabled as Variant;
    }

    if (VARIANTS.hasOwnProperty(variant)) {
      return variant as Variant;
    }

    return VARIANTS.default as Variant;

  };

  return (
    <span id="numPicker"
      className="np15Root"
    >
      <NumberInput
        ref={textInput}
        id="numberPicker"
        variant={getVariant()}
        step={stepValue}
        showSteper
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={value}
        min={minValue}
        placeholder=""
      />

    </span>
  );
};


type RequiredProps = {
  value: number;
  stepValue: number;
};


type DefaultProps = {
  minValue: number;
  onInput: Function;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputClass: string;
  shouldFocusOnMount: boolean;
  disabled: boolean;
  variant: Variant;
  maxWidth: number;
  width: number;
};


export type Props = RequiredProps & DefaultProps;


type Variant = 'warning' | 'error' | 'default' | 'disabled' | 'unstyled';


NumberPicker.defaultProps = {
  value: 1,
  stepValue: 1,
  onInput: () => { },
  onKeyDown: () => { },
  inputClass: 'np15Input',
  width: 50,
  maxWidth: 98,
  shouldFocusOnMount: false,
  disabled: false,
  variant: VARIANTS.default
};

export default NumberPicker;

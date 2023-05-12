import React from "react";

import {
  Add,
  Remove
} from "@groww-tech/icon-store/mi";

import BaseNumberInput from "./BaseNumberInput";
import { NumberInputProps } from "./NumberInput";

const INPUT_ACTION_TYPE = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT'
};

export const NumberInputStepper = React.forwardRef<HTMLInputElement, NumberInputProps>((props, ref) => {
  return (
    <BaseNumberInput
      {...props}
      ref={ref}
      PrefixComponent={() => StepPrefixComponent(props)}
      SuffixComponent={() => StepSuffixComponent(props)}
    />
  );
});


const StepSuffixComponent = ({ step = 1, max = Number.POSITIVE_INFINITY, value, onChange }: NumberInputProps) => {
  const numberValue = Number(value);


  const onClick = () => {
    if (max >= numberValue + step) {
      const increasedVal = numberValue + step;
      const floorValue = Math.floor(increasedVal / step) * step;

      // @ts-ignore : to prevent onChange re writing as it can be passed by user
      //we are synthentically generating custome event to set value
      // sending actionType to detect that value has been increased by clicking on the + icon
      onChange({ target: { value: floorValue }, actionType: INPUT_ACTION_TYPE.INCREMENT });
    }
  };

  return (
    <Add
      size={28}
      style={{ marginTop: '3px' }}
      className="cur-po"
      onClick={onClick}
    />
  );

};


const StepPrefixComponent = ({ step = 1, min = Number.NEGATIVE_INFINITY, value, onChange }: NumberInputProps) => {

  const numberValue = Number(value);


  const onClick = () => {

    if (min <= numberValue - step) {
      const increasedVal = numberValue - step;
      const floorValue = Math.floor(increasedVal / step) * step;

      // @ts-ignore : to prevent onChange re writing as it can be passed by user
      //we are synthentically generating custome event to set value
      // sending actionType to detect that value has been decreased by clicking on the - icon
      onChange({ target: { value: floorValue }, actionType: INPUT_ACTION_TYPE.DECREMENT });
    }
  };

  return (
    <Remove
      size={28}
      style={{ marginTop: '3px' }}
      className="cur-po"
      onClick={onClick}
    />
  );
};

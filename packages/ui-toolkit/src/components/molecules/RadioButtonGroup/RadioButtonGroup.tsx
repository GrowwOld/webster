import React from 'react';

import { RadioButton } from '../../atoms';
import { RadioButtonType } from './radioButtonGroupTypes';

import './radioButtonGroup.css';


const RadioButtonGroup = (props: Props) => {

  const { radioButtons, containerClassName, onSelect, selected, dataTestId, ...restProps } = props;

  return (
    <div id="container"
      className={containerClassName}
      data-test-id={dataTestId + '-parent'}
    >
      {
        radioButtons.map((item: RadioButtonType, index: number) => {
          return (
            <div key={`${item.value}${index}`}
              {...restProps}
            >
              <RadioButton
                selected={selected === item.value}
                onSelect={() => onSelect(item.value)}
                label={item.label}
                labelClassName={item.labelClassName}
                parentClassName={item.parentClassName}
                radioDirection={item.radioDirection}
                dataTestId={dataTestId + '-' + index + '-radio-button'}
              />
            </div>
          );
        })
      }
    </div>
  );
};


const defaultProps: DefaultProps = {
  containerClassName: '',
  dataTestId: 'test-id-radio-button'
};


type DefaultProps = {
  containerClassName: string;
  dataTestId: string;
}


type RequiredProps = {
  radioButtons: RadioButtonType[];
  selected: string | number;
  onSelect: (value: string | number) => void;
}


export type Props = DefaultProps & RequiredProps;

RadioButtonGroup.defaultProps = defaultProps;

export default React.memo(RadioButtonGroup);

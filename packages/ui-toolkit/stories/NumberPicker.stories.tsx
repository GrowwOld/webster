import React, { useState } from 'react';

import { Story } from '@storybook/react';

import { NumberPicker } from '../src/components/atoms';
import { Props as NumberPickerProps } from '../src/components/atoms/NumberPicker/NumberPicker';


export default {
  title: 'NumberPicker',
  component: NumberPicker
};


const Template: Story<NumberPickerProps> = (args) => {

  const [ value, setValue ] = useState(1);

  return (
    <NumberPicker
      {...args}
      value={value}
      stepValue={1}
      minValue={1}
      onInput={(val) => setValue(val)}
    />
  );
};

export const Primary = Template.bind({});
Primary.args = {
  minValue: 1,
  stepValue: 1,
  variant: 'default'
};

export const Warning = Template.bind({});
Warning.args = {
  minValue: 1,
  stepValue: 1,
  variant: 'warning'
};

export const Error = Template.bind({});
Error.args = {
  minValue: 1,
  stepValue: 1,
  variant: 'error'
};

export const Default = Template.bind({});
Default.args = {
  minValue: 1,
  stepValue: 1,
  variant: 'default'
};

export const Disabled = Template.bind({});
Disabled.args = {
  minValue: 1,
  stepValue: 1,
  variant: 'disabled'
};

export const Unstyled = Template.bind({});
Unstyled.args = {
  minValue: 1,
  stepValue: 1,
  variant: 'unstyled'
};

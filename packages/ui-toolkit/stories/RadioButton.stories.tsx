import React, { useState } from 'react';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Props as RadioButtonProps } from '../src/components/atoms/RadioButton/RadioButton';
import { RadioButton } from '../src/components/atoms';

export default {
  title: 'RadioButton',
  component: RadioButton
};


const Template: Story<RadioButtonProps> = (args) => {
  const [ selected, setSelected ] = useState(false);


  const onSelect = () => {
    setSelected(!selected);
    return action('On Select');
  };

  return <RadioButton {...args}
    isSelected={selected}
    onSelect={onSelect}
  />;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Radio Button Label'
};


export const unSelected = Template.bind({});
Default.args = {
  label: 'Radio Button Label',
  isSelected: true
};


export const OnRight = Template.bind({});
OnRight.args = {
  ...Default.args,
  label: <span>Radio Button</span>,
  radioDirection: 'Right'
};

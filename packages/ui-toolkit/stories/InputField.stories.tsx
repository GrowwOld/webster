import React, { useState } from 'react';

import { Story } from '@storybook/react';

import { InputField } from '../src/components/atoms';
import { Props as InputFieldProps } from '../src/components/atoms/InputField/InputField';


export default {
  title: 'InputField',
  component: InputField
};


const Template: Story<InputFieldProps> = (args) => {
  const [ value, setValue ] = useState('');


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <InputField
      {...args}
      value={value}
      onInput={onChange}
    />
  );
};

export const Primary = Template.bind({});
Primary.args = {
  label: 'Email'
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Email',
  disabled: true
};

export const Error = Template.bind({});
Error.args = {
  label: 'Email',
  showError: true,
  errorText: 'There\'s an error',
  value: 'type something'
};

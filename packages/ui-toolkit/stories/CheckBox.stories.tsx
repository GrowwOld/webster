import React from 'react';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { CheckBox } from '../src/components/atoms';
import { Props as CheckBoxProps } from '../src/components/atoms/CheckBox/CheckBox';

export default {
  title: 'CheckBox',
  component: CheckBox
};


const Template: Story<CheckBoxProps> = (args) => <CheckBox {...args}/>;


export const Checked = Template.bind({});
Checked.args = {
  label: 'Check Actions',
  handleOnClick: action('onCheckBoxClick'),
  size: 'Base',
  value: '',
  isChecked: false,
  isDisabled: false,
  checkBoxDirection: 'Left',
  dataTestId: ''
};


export const OnRight = Template.bind({});
OnRight.args = {
  ...Checked.args,
  label: <span style={{ marginRight: '8px' }}>Checkbox</span>,
  checkBoxDirection: 'Right',
  handleOnClick: action('onCheckBoxClick')
};

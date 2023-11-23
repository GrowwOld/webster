import React from 'react';

import { ArrowDropDown, Cancel, Sort } from '@groww-tech/icon-store/mi';
import { ReactIconProps } from '@groww-tech/icon-store';

import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';

import { Pill } from '../src/components/atoms';
import { Props as PillProps } from '../src/components/atoms/Pill/Pill';

import './style.css';

export default {
  title: 'Pill',
  component: Pill
};


const Template: Story<PillProps> = (args) => (
  <Pill {...args} />
);

export const Text = Template.bind({});
Text.args = {
  text: 'Pill label',
  size: 'Base',
  onClick: action('onPillClick'),
  isSelected: false,
  isAccent: true,
  isOutlined: true
};

export const WithLeadingIcon = Template.bind({});
WithLeadingIcon.args = {
  ...Text.args,
  leadingIcon: (iconProps: ReactIconProps) => (
    <Sort {...iconProps} />
  )
};

export const WithTrailingIcon = Template.bind({});
WithTrailingIcon.args = {
  ...Text.args,
  trailingIcon: (iconProps: ReactIconProps) => (
    <ArrowDropDown {...iconProps} />
  )
};

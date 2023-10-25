import React from 'react';

import { ArrowDropDown, Cancel, Sort } from '@groww-tech/icon-store/mi';
import { ReactIconProps } from '@groww-tech/icon-store';

import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';

import { Chip } from '../src/components/atoms';
import { Props as ChipProps } from '../src/components/atoms/Chip/Chip';

import './style.css';

export default {
  title: 'Chip',
  component: Chip
};


const Template: Story<ChipProps> = (args) => (
  <Chip {...args} />
);

export const Text = Template.bind({});
Text.args = {
  text: 'Pill label',
  onClick: action('onChipClick')
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

import React from 'react';

import { Search } from '@groww-tech/icon-store/mi';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';

import { Button } from '../src/components/atoms/Button';
import { Props as ButtonProps } from '../src/components/atoms/Button/Button';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: [ 'Primary', 'Secondary', 'Tertiary', 'Positive', 'Negative' ]
      }
    }
  }
};


const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  buttonText: 'BUTTON',
  onClick: action('onButtonClick')
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Primary.args,
  variant: 'Secondary'
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  ...Primary.args,
  variant: 'Tertiary'
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Primary.args,
  isDisabled: true
};

export const Loading = Template.bind({});
Loading.args = {
  ...Primary.args,
  isLoading: false
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  ...Primary.args,
  isFullWidth: true
};

export const WithLeadingIcon = Template.bind({});
WithLeadingIcon.args = {
  ...Primary.args,
  buttonText: 'SEARCH',
  leadingIcon: (iconProps: any) => <Search {...iconProps} />
};

export const WithTrailingIcon = Template.bind({});
WithTrailingIcon.args = {
  ...Primary.args,
  buttonText: 'SEARCH',
  trailingIcon: (iconProps: any) => <Search {...iconProps} />
};

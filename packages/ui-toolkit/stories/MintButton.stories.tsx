import React from 'react';

import { Search } from '@groww-tech/icon-store/mi';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';

import { MintButton } from '../src/components/atoms/MintButton';
import { Props as MintButtonProps } from '../src/components/atoms/Button/Button';

export default {
  title: 'MintButton',
  component: MintButton,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: [ 'Primary', 'Secondary', 'Tertiary', 'Positive', 'Negative' ]
      }
    }
  }
};


const Template: Story<MintButtonProps> = (args) => <MintButton {...args} />;

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
  width: '100%'
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  ...Primary.args,
  buttonText: 'SEARCH',
  iconPosition: 'Left',
  iconComponent: (iconProps: any) => (
    <Search {...iconProps}
      size={20}
    />
  )
};

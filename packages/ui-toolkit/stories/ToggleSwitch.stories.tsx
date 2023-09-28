import React from 'react';
import { Story } from "@storybook/react";
import { action } from '@storybook/addon-actions';

import { Props as ToggleSwitchProps } from '../src/components/atoms/ToggleSwitch/ToggleSwitch';
import { ToggleSwitch } from '../src/components/atoms';

export default {
  title: 'ToggleSwitch',
  component: ToggleSwitch,
  argTypes: {
  }
};


const Template: Story<ToggleSwitchProps> = (args) => {
  const [ checked, setChecked ] = React.useState(true);


  const onChange = () => {
    setChecked(!checked);
  };

  return (
    <div className="valign-wrapper">
      <ToggleSwitch {...args}
        isActive={checked}
        onChange={onChange}
      />
    </div>
  );
}

export const Default = Template.bind({});
Default.args = {
  leftText: '',
  rightText: '',
  isActive: 'true',
  isDisabled: 'true'
}

export const WithText = Template.bind({});
WithText.args = {
  ...Default.args,
  leftText: <div style={{ marginRight: 10 }}>Off</div>,
  rightText: <div style={{ marginLeft: 10 }}>On</div>
}

export const SwitchCircle = Template.bind({});
SwitchCircle.args = {
  ...Default.args,
  switchCircleColor: 'var(--red500)'
}

export const Custom = Template.bind({});
Custom.args = {
  ...Default.args,
  inactiveBackgroundColor: 'var(--red500)',
  activeBackgroundColor: 'var(--purple500)'
};

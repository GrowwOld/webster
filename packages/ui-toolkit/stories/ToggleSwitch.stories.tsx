import React from 'react';
import { Story } from '@storybook/react';

import { Props as ToggleSwitchProps } from '../src/components/atoms/ToggleSwitch/ToggleSwitch';
import { ToggleSwitch } from '../src/components/atoms';

export default {
  title: 'ToggleSwitch',
  component: ToggleSwitch
};


const Template: Story<ToggleSwitchProps> = (args) => {
  const [ isChecked, setIsChecked ] = React.useState(args.isActive);


  const onChange = () => {
    setIsChecked(prevState => !prevState);
  };

  return (
    <div className="valign-wrapper">
      <ToggleSwitch {...args}
        isActive={isChecked}
        onChange={onChange}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  size: 'Base',
  leftText: '',
  rightText: '',
  isActive: false,
  isDisabled: false
};

export const WithText = Template.bind({});
WithText.args = {
  ...Default.args,
  leftText: <div style={{ marginRight: 10 }}>Off</div>,
  rightText: <div style={{ marginLeft: 10 }}>On</div>
};

export const SwitchCircle = Template.bind({});
SwitchCircle.args = {
  ...Default.args
};

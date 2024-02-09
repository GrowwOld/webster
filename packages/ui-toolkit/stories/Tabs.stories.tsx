import React from 'react';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Props as TabsProps } from '../src/components/atoms/Tabs/Tabs';
import { Tabs } from '../src/components/atoms';

export default {
  title: 'Tabs',
  component: Tabs,
  argTypes: {}
};


const Template: Story<TabsProps> = (args) => <Tabs {...args} />;

export const Default = Template.bind({});

const data = [
  {
    name: 'Option 1'
  },
  {
    name: 'Option 2'
  },
  {
    name: 'Option 3'
  },
  {
    name: 'Option 4'
  }
];

Default.args = {
  data,
  showBottomBorder: true,
  onTabSelect: (index) => console.log(data.at(index)),
  isFitted: false
};

export const Fitted = Template.bind({});
Fitted.args = {
  ...Default.args,
  isFitted: true
};

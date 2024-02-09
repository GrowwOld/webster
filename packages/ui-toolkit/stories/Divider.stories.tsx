import React from 'react';

import { Story } from '@storybook/react';

import { Divider } from '../src/components/atoms';

export default {
  title: 'Divider',
  component: Divider
};


const Template: Story = () => <Divider />;

export const Default = Template.bind({});

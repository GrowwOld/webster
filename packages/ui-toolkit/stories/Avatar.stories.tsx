import React from 'react';
import { Story } from '@storybook/react';

import { Avatar } from '../src/components/atoms';
import { Props as AvatarProps } from '../src/components/atoms/Avatar/Avatar';

export default {
  title: 'Avatar',
  component: Avatar,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: [ 'XSmall', 'Small', 'Base', 'Large', 'XLarge' ]
      }
    },
    shape: {
      control: {
        type: 'select',
        options: [ 'Circular', 'Rectangular' ]
      }
    }
  }
};


const Template: Story<AvatarProps> = (args) => <Avatar {...args} />;

export const Circular = Template.bind({});
Circular.args = {
  name: 'Dan Abramov',
  src: 'https://bit.ly/dan-abramov',
  size: 'Base',
  isDisabled: false,
  shape: 'Circular'
};

export const CircularPlaceholder = Template.bind({});
CircularPlaceholder.args = {
  name: 'Dan Abramov',
  src: 'https://bit.ly/broken-image',
  size: 'Base',
  isDisabled: false,
  shape: 'Circular'
};

export const Rectangular = Template.bind({});
Rectangular.args = {
  name: 'Navi Nifty 50 Index Fund Direct Growth',
  src: 'https://assets-netstorage.groww.in/mf-assets/logos/peerless_groww.png',
  size: 'Base',
  isDisabled: false,
  shape: 'Rectangular'
};

export const RectangularPlaceholder = Template.bind({});
RectangularPlaceholder.args = {
  name: 'Navi Nifty 50 Index Fund Direct Growth',
  src: 'https://bit.ly/broken-image',
  size: 'Base',
  isDisabled: false,
  shape: 'Rectangular'
};

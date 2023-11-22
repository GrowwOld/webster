import React from 'react';

import { Story } from '@storybook/react';

import { MessageBox } from '../src/components/atoms/MessageBox';
import { Props as MessageBoxProps } from '../src/components/atoms/MessageBox/MessageBox';


export default {
  title: 'MessageBox',
  component: MessageBox,
  argTypes: {
    background: {
      control: {
        type: 'select',
        options: [ 'Neutral', 'Warning', 'Error', 'Positive' ]
      }
    }
  }
};


const Template: Story<MessageBoxProps> = (args) => <MessageBox {...args} />;


export const Neutral = Template.bind({});
Neutral.args = {
  background: 'Neutral',
  isCompact: false,
  content: `This is a informaton box. This can be used for anything,
   from a notice box to a notification box to anything you need it to be!!.
  Just kidding it\'s just a template text to fill up space. :P`
};

export const Warning = Template.bind({});
Warning.args = {
  ...Neutral.args,
  background: 'Warning'
};

export const Error = Template.bind({});
Error.args = {
  ...Neutral.args,
  background: 'Error'
};


export const Positive = Template.bind({});
Positive.args = {
  ...Neutral.args,
  background: 'Positive',
  content: 'This is the body that can span upto three lines. It can contain CTAs in the form of inline links'
};

export const WithoutIcon = Template.bind({});
WithoutIcon.args = {
  ...Neutral.args,
  background: 'Neutral',
  isIconPresent: false
};

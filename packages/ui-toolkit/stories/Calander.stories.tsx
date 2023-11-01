import React from 'react';

import { Story } from '@storybook/react';

import { Calendar } from '../src/components/molecules';
import { Props, CALENDAR_TYPE } from '../src/components/molecules/Calendar/Calendar';

export default {
  title: 'Calendar',
  component: Calendar
};


const Template: Story<Props> = (args) => <Calendar {...args} />;


export const Month = Template.bind({});
Month.args = {
  type: CALENDAR_TYPE.MONTH
};

export const Date = Template.bind({});
Date.args = {
  type: CALENDAR_TYPE.DATE
};

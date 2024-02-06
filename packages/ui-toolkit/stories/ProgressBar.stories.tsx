import React from 'react';
import { Story } from '@storybook/react';

import { ProgressBar } from '../src/components/atoms';
import { Props as ProgressBarProps } from '../src/components/atoms/ProgressBar/ProgressBar';

export default {
  title: 'ProgressBar',
  component: ProgressBar
};


const Template: Story<ProgressBarProps> = (args) => {
  return (
    <div style={{ margin: 24 }}>
      <ProgressBar {...args} />
    </div>
  );
};

export const Linear = Template.bind({});
Linear.args = {
  name: 'Linear Progress bar',
  color: 'var(--purple500)',
  fillerThickness: 8,
  containerThickness: 5,
  backgroundColor: 'var(--gray150)',
  size: 420,
  completedValue: 80
};

export const Circular = Template.bind({});
Circular.args = {
  name: 'Cicular progress bar',
  isCircular: true,
  color: 'var(--green500)',
  backgroundColor: 'var(--gray150)',
  text: 'Hello',
  addTextClass: 'contentAccent',
  fillerThickness: 6,
  containerThickness: 2,
  size: 100,
  completedValue: 50
};

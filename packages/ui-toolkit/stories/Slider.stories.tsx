import React, { useState } from 'react';
import { Story } from '@storybook/react';

import Slider, { Props as SliderProps } from '../src/components/atoms/Slider/Slider';

import './style.css';

export default {
  title: 'Slider',
  component: Slider
};


const Template: Story<SliderProps> = (args) => {

  return (
    <div className='scalc101MainContainer'>
      <Slider
        {...args}
        onSliderChange={(e) => console.log('Slider Value: ', e)}
      />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  min: 0,
  max: 100,
  sliderWrapperClass: 'sliderWrapper',
  thumbClassName: 'sliderThumb',
  trackClassName: 'sliderTrack'
};

export const WithSteps = Template.bind({});

WithSteps.args = {
  ...Default.args,
  step: 10
};

export const WithMarks = Template.bind({});

WithMarks.args = {
  ...Default.args,
  marks: 10,
  markClassName: 'sliderMark'
};

export const DefaultValue = Template.bind({});

DefaultValue.args = {
  ...Default.args,
  defaultValue: 25
};

export const MarkedSteps = Template.bind({});

MarkedSteps.args = {
  ...Default.args,
  step: 10,
  marks: 10,
  markClassName: 'sliderMark'
};

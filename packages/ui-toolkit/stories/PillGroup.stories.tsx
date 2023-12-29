import React from 'react';

import { AutoAwesome } from '@groww-tech/icon-store/mi';
import { ReactIconProps } from '@groww-tech/icon-store';

import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';

import { PillGroup } from '../src/components/atoms';
import { Props as PillGroupProps } from '../src/components/atoms/PillGroup/PillGroup';

import './style.css';

export default {
  title: 'PillGroup',
  component: PillGroup
};


const Template: Story<PillGroupProps> = (args) => <PillGroup {...args} />;

export const MultiSelect = Template.bind({});
MultiSelect.args = {
  data: [
    {
      text: 'Option 1',
      isSelected: true
    },
    {
      text: 'Option 2',
      isSelected: true
    },
    {
      text: 'Option 3',
      isSelected: true
    },
    {
      text: 'Option 4',
      isSelected: false
    },
    {
      text: 'Option 5',
      isSelected: false
    }
  ],
  onClick: action('onPillClick'),
  isOutlined: true,
  isMultiselect: true
};

export const SingleSelect = Template.bind({});
SingleSelect.args = {
  data: [
    {
      text: 'Option 1',
      isSelected: true
    },
    {
      text: 'Option 2',
      isSelected: false
    },
    {
      text: 'Option 3',
      isSelected: false
    },
    {
      text: 'Option 4',
      isSelected: false
    },
    {
      text: 'Option 5',
      isSelected: false
    }
  ],
  onClick: action('onPillClick'),
  isOutlined: true,
  isMultiselect: false
};

export const WithIcons = Template.bind({});
WithIcons.args = {
  data: [
    {
      text: 'Option 1',
      isSelected: true,
      leadingIcon: (iconProps: ReactIconProps) => <AutoAwesome {...iconProps} />
    },
    {
      text: 'Option 2',
      isSelected: false,
      leadingIcon: (iconProps: ReactIconProps) => <AutoAwesome {...iconProps} />
    },
    {
      text: 'Option 3',
      isSelected: false,
      leadingIcon: (iconProps: ReactIconProps) => <AutoAwesome {...iconProps} />
    },
    {
      text: 'Option 4',
      isSelected: false,
      leadingIcon: (iconProps: ReactIconProps) => <AutoAwesome {...iconProps} />
    },
    {
      text: 'Option 5',
      isSelected: false,
      leadingIcon: (iconProps: ReactIconProps) => <AutoAwesome {...iconProps} />
    }
  ],
  onClick: action('onPillClick'),
  isOutlined: true,
  isMultiselect: false
};

export const Sizes = Template.bind({});
Sizes.args = {
  data: [
    {
      text: 'Option 1',
      isSelected: true,
      size: 'XSmall'
    },
    {
      text: 'Option 2',
      isSelected: false,
      size: 'XSmall'
    },
    {
      text: 'Option 3',
      isSelected: false,
      size: 'XSmall'
    },
    {
      text: 'Option 4',
      isSelected: false,
      size: 'XSmall'
    },
    {
      text: 'Option 5',
      isSelected: false,
      size: 'XSmall'
    }
  ],
  onClick: action('onPillClick'),
  isOutlined: true,
  isMultiselect: false
};

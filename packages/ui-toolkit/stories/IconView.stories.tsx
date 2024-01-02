import React, { useState } from 'react';
import { Story } from '@storybook/react';

import { IconView } from '../src/components/atoms/IconView';
import { Props as IconViewProps } from '../src/components/atoms/IconView/IconView';
import { Edit } from '@groww-tech/icon-store/mi';

export default {
  title: 'IconView',
  component: IconView,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: [ 'Small', 'Base', 'Large', 'XLarge' ]
      }
    }
  }
};


const Template: Story<IconViewProps> = (args) => (
  <div style={{ margin: 8 }}>
    <IconView {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  iconComponent: (iconProps: any) => <Edit {...iconProps} />,
  size: 'Base'
};

export const Contained = Template.bind({});
Contained.args = {
  iconComponent: (iconProps: any) => <Edit {...iconProps} />,
  size: 'Base',
  isContained: true
};

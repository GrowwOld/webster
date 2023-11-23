import React, { useState } from 'react';
import { Story } from '@storybook/react';

import { Props as CheckBoxGroupProps } from '../src/components/molecules/CheckBoxGroup/CheckBoxGroup';
import { CheckBoxGroup } from '../src/components/molecules';

export default {
  title: 'CheckBoxGroup',
  component: CheckBoxGroup
};


const Template: Story<CheckBoxGroupProps> = (args) => {
  const [ checkedList, setCheckedList ] = useState<string[]>([]);


  const onCheck = (value: string | undefined) => {
    const newCheckList = [ ...checkedList ];

    if (value) {
      const valueIndex = checkedList.indexOf(value);

      if (valueIndex === -1) {
      //checkbox wasn't checked
        newCheckList.push(value);

      } else {
      //checkbox was checked
        newCheckList.splice(valueIndex, 1);
      }

      setCheckedList(newCheckList);
    }
  };

  return (
    <CheckBoxGroup {...args}
      onCheck={onCheck}
      checkedList={checkedList}
    />
  );
};

const hobbiesArray = [
  { label: 'Music', value: 'MUSIC' },
  { label: 'Sports', value: 'SPORTS' },
  { label: 'Cooking', value: 'COOKING' },
  { label: 'Gaming', value: 'GAMING' }
];

export const Default = Template.bind({});
Default.args = {
  containerClassName: '',
  checkBoxes: hobbiesArray
};

const skillsArray = [
  {
    label: <span style={{ marginRight: '87px' }}>React</span>,
    value: 'REACT',
    checkBoxDirection: 'Right'
  },
  {
    label: <span style={{ marginRight: '82px' }}>Spring</span>,
    value: 'SPRING',
    checkBoxDirection: 'Right'
  },
  {
    label: <span style={{ marginRight: '73px' }}>Express</span>,
    value: 'EXPRESS',
    checkBoxDirection: 'Right'
  },
  {
    label: <span style={{ marginRight: '8px' }}>Angular(disabled)</span>,
    value: 'ANGULAR',
    checkBoxDirection: 'Right',
    isDisabled: true
  },
  {
    label: <span style={{ marginRight: '78px' }}>Django</span>,
    value: 'DJANGO',
    checkBoxDirection: 'Right',
    activeColor: 'var(--red500)'
  }
];

export const Custom = Template.bind({});
Custom.args = {
  containerClassName: '',
  checkBoxes: skillsArray
};

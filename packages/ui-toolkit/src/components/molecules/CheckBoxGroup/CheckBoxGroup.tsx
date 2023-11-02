import React from 'react';

import { CheckBox, CHECKBOX_DIRECTION } from '../../atoms/CheckBox';

import './checkBoxGroup.css';


const CheckBoxGroup = (props: Props) => {
  const { containerClassName, checkBoxes, checkedList, onCheck } = props;

  return (
    <div className={`cbg29ParentDiv ${containerClassName}`}>
      {
        checkBoxes.map((checkBox: CheckBox, index) => {
          return (
            <CheckBox
              key={`${checkBox.value}${index}`}
              isChecked={checkedList.indexOf(checkBox?.value || '') !== -1}
              handleOnClick={onCheck}
              {...checkBox}
            />
          );
        })
      }
    </div>
  );
};


const defaultProps: DefaultProps = {
  containerClassName: ''
};


type DefaultProps = {
  containerClassName: string;
}


type RequiredProps = {
  checkBoxes: CheckBox[];
  checkedList: string[];
  onCheck: (value?: string, isChecked?: boolean) => void;
}


type CheckBox = {
  size?: 'XSmall' | 'Small' | 'Base' | 'Large' | 'XLarge';
  label?: string;
  value?: string;
  isDisabled?: boolean;
  checkBoxDirection?: 'Left' | 'Right';
};

CheckBoxGroup.defaultProps = defaultProps;

export type Props = DefaultProps & RequiredProps;

export default React.memo(CheckBoxGroup);
export { CHECKBOX_DIRECTION };

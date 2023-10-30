import React from 'react';

import '@groww-tech/mint-css/dist/index.css';

import './toggleSwitch.css';


const ToggleSwitch = (props: Props) => {
  const {
    size,
    onChange,
    isDisabled,
    isActive,
    leftText,
    rightText,
    dataTestId
  } = props;

  const getFontClass = () => {
    if(size === "XLarge") return "bodyXLarge";
    if(size === "Large") return "bodyLarge";
    if(size === "Base") return "bodyBase";
    if(size === "Small") return "bodySmallHeavy";
    if(size === "XSmall") return "bodySmall";

  }
  // circleDiameter is the diameter of the circular slider which should be smaller than the size of the parent component so as to provide offset between the slider and it's parent
  const circleDiameter = 20;

  const switchLabelStyle = {
    borderRadius: '24px',
    top: '0px', // required here, as somewhere in the project(globally) these values are altered
    left: '0px' // required here
  };

  const inputStyle = {
    margin: '0px' // required here, as somewhere in the project(globally) these values are altered
  };


  const switchDivisonStyle = {
    pointerEvents: isDisabled ? 'none' : 'unset'
  };

  const switchButtonStyle = {
    transform: isActive ? 'translateX(16px)' : 'none'
  };

  return (
    <div className="valign-wrapper">
      <div className={fontClass}>
         {leftText}
      </div>
      <div
        className='sw348reactSwitchDivision'
        data-test-id={dataTestId.length ? dataTestId : null}
        onClick={(e) => onChange(e)}
        style={switchDivisonStyle}
      >
        <input
          style={inputStyle}
          checked={isActive}
          onChange={(e) => onChange(e)}
          className="sw348reactSwitchCheckbox"
          id="reactSwitchId"
          type="checkbox"
        />
        <div style={switchLabelStyle}
          className={isDisabled ? 'backgroundTertiary sw348reactSwitchLabel' : isActive ? 'backgroundPositive sw348reactSwitchLabel' : 'backgroundTertiary sw348reactSwitchLabel'}
        >
          <div style={switchButtonStyle}
            className={'sw348reactSwitchButton backgroundAlwaysLight'}  //check the 'backgrpundPrimary' property, according to design language
          />
        </div>
      </div>
      <div className={fontClass}>
        {rightText}
      </div>
    </div>
  );

};


const defaultProps: DefaultProps = {
  leftText: '',
  rightText: '',
  isActive: true,
  isDisabled: false,
  dataTestId: '',
  size: 'Base' 
};


type RequiredProps = {
  isActive: boolean;
  onChange: (e?: React.MouseEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>) => void;
}


type DefaultProps = {
  leftText: React.ReactNode;
  rightText: React.ReactNode;
  dataTestId: string;
  isActive: boolean;
  isDisabled: boolean;
  size: 'XLarge'| 'Large' | 'Base' | 'Small' | 'XSmall';
}


ToggleSwitch.defaultProps = defaultProps;

export type Props = RequiredProps & DefaultProps;

export default React.memo(ToggleSwitch);

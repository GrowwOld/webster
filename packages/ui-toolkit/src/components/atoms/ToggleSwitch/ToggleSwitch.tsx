import React from 'react';
import cn from 'classnames';

import '@groww-tech/mint-css/dist/index.css';
import { SIZES } from '../../../utils/constants';

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

  const labelClasses = cn({
    bodySmallHeavy: size === SIZES.SMALL,
    bodyXLarge: size === SIZES.XLARGE,
    bodyBase: size === SIZES.BASE,
    bodyLarge: size === SIZES.LARGE,
    bodyXSmall: size === SIZES.XSMALL
  });

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


  const switchButtonStyle = {
    transform: isActive ? 'translateX(16px)' : 'none'
  };

  const baseClasses = cn('contentPrimary', 'absolute-center', 'valign-wrapper', {
    'cur-po': !isDisabled
  });

  return (
    <div className={baseClasses}>
      <div className={labelClasses}>
        {leftText}
      </div>
      <div
        className='sw348reactSwitchDivision'
        data-test-id={dataTestId.length ? dataTestId : null}
        onClick={(e) => onChange(e)}
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
            className={'sw348reactSwitchButton backgroundAlwaysLight'}
          />
        </div>
      </div>
      <div className={labelClasses}>
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
  size: SIZES.BASE
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
  size: ValueOf <typeof SIZES>;
}


ToggleSwitch.defaultProps = defaultProps;

export type Props = RequiredProps & DefaultProps;

export default React.memo(ToggleSwitch);

import React from 'react';
import cn from 'classnames';

import './mintButton.css';
import { Loader, LOADER_TYPE } from '../Loader';


const MintButton = (props: Props) => {

  const {
    size,
    buttonText,
    buttonType,
    onClick,
    isAccent,
    isCompact,
    isDisabled,
    iconComponent,
    iconPosition,
    isLoading,
    loadingText,
    fontSize,
    textColor,
    backgroundColor,
    dataTestId,
    fixToBottom
  } = props;

  const primaryButtonClassnames = cn({

  });

  const classname = cn(
    'btn96DefaultClass',
    'absolute-center',
    'cur-po',
    {
      'btn96SmallButton': size === 'Small' && !isCompact,
      'btn96MediumButton': size === 'Medium' && !isCompact,
      'btn96LargeButton': size === 'Large' && !isCompact,
      'btn96PrimaryButton': buttonType === 'Primary',
      'btn96ButtonDisabled': buttonType !== 'Tertiary' && isDisabled,
      'btn96TertiaryButtonDisabled': buttonType === 'Tertiary' && isDisabled,
      'btn96SecondaryButtonWithAccent': buttonType === 'Secondary' && isAccent && !isDisabled,
      'btn96SecondaryButtonWithoutAccent': buttonType === 'Secondary' && !isAccent && !isDisabled,
      'btn96SecondaryButtonWithoutAccentDisabled': buttonType === 'Secondary' && !isAccent && isLoading,
      'btn96CompactButton': buttonType === 'Tertiary' && isCompact,
      'btn96TertiaryButtonWithAccent': buttonType === 'Tertiary' && isAccent && !isDisabled,
      'btn96TertiaryButtonWithoutAccent': buttonType === 'Tertiary' && !isAccent && !isDisabled
    });


  const loaderClasses = cn({
    'btn96PrimaryButtonLoader': buttonType === 'Primary',
    'btn96LoaderWithAccent': buttonType !== 'Primary' && isAccent,
    'btn96LoaderWithoutAccent': buttonType !== 'Primary' && !isAccent
  });


  const getIconUI = () => {
    const buttonIconProps = {
      className: `btn51Icon${iconPosition}`,
      fill: 'currentColor'
    };

    return iconComponent?.(buttonIconProps as any) || null;
  };


  const onButtonClick = (e: React.MouseEvent) => {
    if (!isDisabled && !isLoading) {
      onClick(e);
    }
  };


  const getComputedStyle = () => {
    const {
      size,
      fontSize,
      textColor,
      backgroundColor,
      ...restProps
    } = props;

    return {
      size,
      fontSize,
      backgroundColor,
      color: textColor,
      ...restProps
    };
  };

  return (
    <div className={fixToBottom ? 'btn96BottomFixed backgroundPrimary' : ''}>
      <div
        className={classname}
        data-test-id={dataTestId.length ? dataTestId : null}
        onClick={onButtonClick}
        style={getComputedStyle()}
      >
        {
          isLoading && !isDisabled ? (
            <div className='absolute-center btn96LoaderContainer'>
              <Loader
                loaderType="circular"
                loaderClassName={cn(loaderClasses, 'btn96LoaderSize')}
              />
            </div>
          )
            : <div className="absolute-center">
              {iconPosition === 'Left' && getIconUI()}

              <span className='btn96ParentDimension'>{!isLoading && buttonText}</span>

              {iconPosition === 'Right' && getIconUI()}
            </div>
        }
      </div>
    </div>
  );
};


type RequiredProps = {
  buttonText: string;
  onClick: (e: React.MouseEvent) => void;
}


type DefaultProps = {
  size: 'Large' | 'Medium' | 'Small';
  buttonType: 'Primary' | 'Secondary' | 'Tertiary';
  isAccent: boolean;
  isCompact: boolean;
  fixToBottom: boolean;
  isDisabled: boolean;
  iconComponent: ((props: any) => JSX.Element) | null;
  iconPosition: 'Left' | 'Right';
  isLoading: boolean;
  loadingText: string;
  fontSize: string | number;
  textColor: string;
  dataTestId: string;
  backgroundColor: string;
}


MintButton.defaultProps = {
  size: 'Medium',
  buttonType: 'Primary',
  isAccent: false,
  isCompact: false,
  fixToBottom: false,
  isDisabled: false,
  iconComponent: null,
  iconPosition: 'Left',
  isLoading: false,
  loadingText: 'Loading...',
  fontSize: '',
  textColor: '',
  backgroundColor: '',
  dataTestId: ''
} as DefaultProps;


export type Props = RequiredProps & DefaultProps;


export default MintButton;

import React from 'react';
import cn from 'classnames';

import './mintButton.css';
import { Loader, LOADER_TYPE } from '../Loader';


const MintButton = (props: Props) => {

  const {
    size,
    buttonText,
    variant,
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

  const classname = cn(
    'btn96DefaultClass',
    'absolute-center',
    'cur-po',
    {
      'btn96SmallButton': size === 'Small',
      'btn96MediumButton': size === 'Medium',
      'btn96LargeButton': size === 'Large',
      'btn96CompactButton': variant === 'Tertiary' && isCompact,
      'btn96PrimaryButton': variant === 'Primary',
      'btn96PositiveButton': variant === 'Positive',
      'btn96NegativeButton': variant === 'Negative',
      'btn96SecondaryButtonWithAccent': variant === 'Secondary' && isAccent && !isDisabled,
      'btn96SecondaryButtonWithoutAccent': variant === 'Secondary' && !isAccent && !isDisabled,
      'btn96SecondaryButtonWithoutAccentDisabled': variant === 'Secondary' && !isAccent && isLoading,
      'btn96TertiaryButtonDisabled': variant === 'Tertiary' && isDisabled,
      'btn96TertiaryButtonWithAccent': variant === 'Tertiary' && isAccent && !isDisabled,
      'btn96TertiaryButtonWithoutAccent': variant === 'Tertiary' && !isAccent && !isDisabled,
      'btn96ButtonDisabled': variant !== 'Tertiary' && isDisabled
    });


  const loaderClasses = cn({
    'btn96PrimaryButtonLoader': variant === 'Primary' || variant === 'Positive' || variant === 'Negative',
    'btn96LoaderWithAccent': (variant === 'Secondary' || variant === 'Tertiary') && isAccent,
    'btn96LoaderWithoutAccent': (variant === 'Secondary' || variant === 'Tertiary') && !isAccent
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
  variant: 'Primary' | 'Secondary' | 'Tertiary' | 'Positive' | 'Negative';
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
  variant: 'Primary',
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

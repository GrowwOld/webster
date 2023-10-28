import React from 'react';
import cn from 'classnames';

import { Loader, LOADER_TYPE } from '../Loader';

import './button.css';


const VARIANTS = {
  PRIMARY: 'Primary',
  SECONDARY: 'Secondary',
  TERTIARY: 'Tertiary',
  POSITIVE: 'Positive',
  NEGATIVE: 'Negative'
};


const Button = (props: Props) => {
  const {
    size,
    buttonText,
    variant,
    onClick,
    isAccent,
    isCompact,
    isDisabled,
    leadingIcon,
    trailingIcon,
    isLoading,
    isFullWidth,
    dataTestId,
    isFixToBottom
  } = props;

  const primaryButtonClasses = cn(
    {
      'backgroundAccent': !isDisabled,
      btn96ButtonLabel: !isDisabled && !isLoading,
      btn96ButtonHover: !isDisabled
    });

  const secondaryButtonClasses = cn({
    btn96SecondaryButtonWithAccent: isAccent && !isDisabled,
    btn96SecondaryButtonWithoutAccent: !isAccent && !isDisabled,
    btn96SecondaryButtonWithoutAccentDisabled: !isAccent && isLoading
  });

  const tertiaryButtonClasses = cn({
    btn96TertiaryButtonDisabled: isDisabled,
    btn96TertiaryButtonWithAccent: isAccent && !isDisabled,
    btn96TertiaryButtonWithoutAccent: !isAccent && !isDisabled
  });

  const postiveButtonClasses = cn({
    'backgroundPositive': !isDisabled,
    btn96ButtonLabel: !isDisabled && !isLoading,
    btn96ButtonHover: !isDisabled
  });

  const negativeButtonClasses = cn({
    'backgroundNegative': !isDisabled,
    btn96ButtonLabel: !isDisabled && !isLoading,
    btn96ButtonHover: !isDisabled
  });


  const classname = cn('btn96DefaultClass', 'absolute-center', 'cur-po',
    {
      btn96SmallButton: size === 'Small',
      btn96MediumButton: size === 'Medium',
      btn96LargeButton: size === 'Large',
      btn86FullWidth: isFullWidth,
      btn96LoadingButton: isLoading && !isDisabled,
      btn96CompactButton: variant === VARIANTS.TERTIARY && isCompact,
      btn96ButtonLabel: variant !== VARIANTS.TERTIARY && !isDisabled,
      btn96ButtonDisabled: variant !== VARIANTS.TERTIARY && isDisabled
    });


  const getButtonClasses = (variant: string) => {
    switch (variant) {
      case VARIANTS.PRIMARY:
        return cn(primaryButtonClasses, classname);

      case VARIANTS.SECONDARY:
        return cn(secondaryButtonClasses, classname);

      case VARIANTS.TERTIARY:
        return cn(tertiaryButtonClasses, classname);

      case VARIANTS.POSITIVE:
        return cn(postiveButtonClasses, classname);

      case VARIANTS.NEGATIVE:
        return cn(negativeButtonClasses, classname);
    }
  };


  const loaderClasses = cn({
    btn96PrimaryButtonLoader: variant === VARIANTS.PRIMARY || variant === VARIANTS.POSITIVE || variant === VARIANTS.NEGATIVE,
    btn96LoaderWithAccent: (variant === VARIANTS.SECONDARY || variant === VARIANTS.TERTIARY) && isAccent,
    btn96LoaderWithoutAccent: (variant === VARIANTS.SECONDARY || variant === VARIANTS.TERTIARY) && !isAccent
  });


  const getIconSize = () => {
    if (size === 'Small') return 16;
    if (size === 'Medium') return 20;
    if (size === 'Large') return 24;
  };


  const getIconUI = (position: string) => {
    const buttonIconProps = {
      className: `btn96Icon${position}`,
      fill: 'currentColor',
      size: getIconSize()
    };

    if (position === 'Leading') return leadingIcon?.(buttonIconProps as any) || null;
    if (position === 'Trailing') return trailingIcon?.(buttonIconProps as any) || null;
  };


  const onButtonClick = (e: React.MouseEvent) => {
    if (!isDisabled && !isLoading) {
      onClick(e);
    }
  };


  return (
    <div className={isFixToBottom ? 'btn96BottomFixed' : ''}>
      <div
        className={getButtonClasses(variant)}
        data-test-id={dataTestId.length ? dataTestId : null}
        onClick={onButtonClick}
      >
        {
          isLoading && !isDisabled &&
            <div className="absolute-center btn96LoaderContainer">
              <Loader
                loaderType={LOADER_TYPE.CIRCULAR}
                loaderClassName={cn(loaderClasses, 'btn96LoaderSize')}
              />
            </div>
        }
        <div className="absolute-center">
          {leadingIcon && getIconUI('Leading')}

          <span className="btn96ParentDimension">
            {buttonText}
          </span>

          {trailingIcon && getIconUI('Trailing')}
        </div>

      </div>
    </div>
  );
};


type RequiredProps = {
  buttonText: string;
  onClick: (e: React.MouseEvent) => void;
};


type DefaultProps = {
  size: 'Large' | 'Medium' | 'Small';
  variant: 'Primary' | 'Secondary' | 'Tertiary' | 'Positive' | 'Negative';
  isAccent: boolean;
  isCompact: boolean;
  isFixToBottom: boolean;
  isFullWidth: boolean;
  isDisabled: boolean;
  leadingIcon: ((props: any) => JSX.Element) | null;
  trailingIcon: ((props: any) => JSX.Element) | null;
  isLoading: boolean;
  dataTestId: string;
};

Button.defaultProps = {
  size: 'Medium',
  variant: VARIANTS.POSITIVE,
  isAccent: false,
  isCompact: false,
  isFixToBottom: false,
  isFullWidth: false,
  isDisabled: false,
  leadingIcon: null,
  trailingIcon: null,
  isLoading: false,
  dataTestId: ''
} as DefaultProps;

export type Props = RequiredProps & DefaultProps;

export default Button;

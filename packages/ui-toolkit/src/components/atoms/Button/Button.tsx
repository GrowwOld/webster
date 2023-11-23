import React from 'react';
import cn from 'classnames';

import { ReactIconProps } from '@groww-tech/icon-store';

import { VARIANTS, BUTTON_SIZES } from './Button.contants';
import { Loader, LOADER_TYPE } from '../Loader';
import { ICON_POSITION } from '../../../utils/constants';

import './button.css';


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
      contentOnColour: !isLoading && !isDisabled,
      backgroundAccent: !isDisabled || (isLoading && isDisabled),
      btn96ButtonHover: !isDisabled,
      backgroundSecondary: isDisabled && !isLoading
    });

  const secondaryButtonClasses = cn({
    btn96SecondaryButtonWithoutAccent: !isAccent,
    backgroundAccentSubtle: (isAccent && !isDisabled) || (isAccent && isDisabled && isLoading),
    contentDisabled: isDisabled,
    borderPrimary: !isAccent,
    backgroundSecondary: isDisabled
  });

  const tertiaryButtonClasses = cn({
    btn96TertiaryButtonDisabled: isDisabled && !isLoading,
    btn96TertiaryButtonWithAccent: isAccent && !isDisabled && !isLoading,
    btn96TertiaryButtonWithoutAccent: !isAccent && !isDisabled
  });

  const postiveButtonClasses = cn({
    contentOnColour: !isDisabled && !isLoading,
    backgroundPositive: !isDisabled,
    btn96ButtonLabel: !isDisabled && !isLoading,
    btn96ButtonHover: !isDisabled
  });

  const negativeButtonClasses = cn({
    contentOnColour: !isDisabled && !isLoading,
    backgroundNegative: !isDisabled,
    btn96ButtonLabel: !isDisabled && !isLoading,
    btn96ButtonHover: !isDisabled
  });

  const fontClasses = cn({
    bodySmallHeavy: size === BUTTON_SIZES.SMALL,
    bodyBaseHeavy: size === BUTTON_SIZES.BASE,
    bodyLargeHeavy: size === BUTTON_SIZES.LARGE,
    bodyXLargeHeavy: size === BUTTON_SIZES.XLARGE,
    contentDisabled: isDisabled,
    contentPrimary: !isAccent && !isDisabled,
    contentAccent: isAccent && !isDisabled
  });


  const baseClasses = cn('btn96DefaultClass absolute-center', fontClasses,
    {
      'cur-po': !isLoading && !isDisabled,
      btn96SmallButton: size === BUTTON_SIZES.SMALL,
      btn96MediumButton: size === BUTTON_SIZES.BASE,
      btn96LargeButton: size === BUTTON_SIZES.LARGE,
      btn96XLargeButton: size === BUTTON_SIZES.XLARGE,
      btn86FullWidth: isFullWidth,
      btn96LoadingButton: isLoading,
      btn96CompactButton: variant === VARIANTS.TERTIARY && isCompact,
      btn96ButtonLabel: variant !== VARIANTS.TERTIARY && !isDisabled
    });


  const getButtonClasses = (variant: string) => {
    switch (variant) {
      case VARIANTS.PRIMARY:
        return cn(baseClasses, primaryButtonClasses);

      case VARIANTS.SECONDARY:
        return cn(baseClasses, secondaryButtonClasses);

      case VARIANTS.TERTIARY:
        return cn(baseClasses, tertiaryButtonClasses);

      case VARIANTS.POSITIVE:
        return cn(baseClasses, postiveButtonClasses);

      case VARIANTS.NEGATIVE:
        return cn(baseClasses, negativeButtonClasses);
    }
  };


  const loaderClasses = cn('btn96LoaderSize btn96LoaderMargin', {
    btn96PrimaryButtonLoader: variant === VARIANTS.PRIMARY || variant === VARIANTS.POSITIVE || variant === VARIANTS.NEGATIVE,
    btn96LoaderWithAccent: (variant === VARIANTS.SECONDARY || variant === VARIANTS.TERTIARY) && isAccent,
    btn96LoaderWithoutAccent: (variant === VARIANTS.SECONDARY || variant === VARIANTS.TERTIARY) && !isAccent
  });

  const fixedToBottomClass = cn({
    btn96BottomFixed: isFixToBottom,
    borderPrimary: isFixToBottom
  });

  const borderBottomClasses = cn({
    btn96TertiaryButtonBorder: variant === VARIANTS.TERTIARY && !isAccent,
    borderNeutral: variant === VARIANTS.TERTIARY && !isDisabled && !isLoading && !isAccent,
    borderDisabled: variant === VARIANTS.TERTIARY && isDisabled && !isLoading && !isAccent
  });


  const getIconSize = () => {
    if (size === BUTTON_SIZES.SMALL) return 16;
    if (size === BUTTON_SIZES.BASE) return 20;
    if (size === BUTTON_SIZES.LARGE || size === BUTTON_SIZES.XLARGE) return 24;
  };


  const getIconUI = (position: string) => {
    const buttonIconProps = {
      fill: 'currentColor',
      size: getIconSize()
    };

    if (position === ICON_POSITION.LEADING) return leadingIcon?.(buttonIconProps as ReactIconProps) || null;
    if (position === ICON_POSITION.TRAILING) return trailingIcon?.(buttonIconProps as ReactIconProps) || null;
  };


  const onButtonClick = (e: React.MouseEvent) => {
    if (!isDisabled && !isLoading) {
      onClick(e);

    } else {
      e.stopPropagation();
    }
  };


  return (
    <div className={fixedToBottomClass}>
      <div
        className={getButtonClasses(variant)}
        data-test-id={dataTestId.length ? dataTestId : null}
        onClick={onButtonClick}
      >
        {
          isLoading &&
            <div className="absolute-center btn96LoaderContainer">
              <Loader
                loaderType={LOADER_TYPE.CIRCULAR}
                loaderClassName={loaderClasses}
              />
            </div>
        }
        <>
          {leadingIcon && getIconUI(ICON_POSITION.LEADING)}

          <span className={borderBottomClasses}>
            {buttonText}
          </span>

          {trailingIcon && getIconUI(ICON_POSITION.TRAILING)}
        </>

      </div>
    </div>
  );
};


type RequiredProps = {
  buttonText: string;
  onClick: (e: React.MouseEvent) => void;
};


type DefaultProps = {
  size: ValueOf<typeof BUTTON_SIZES>;
  variant: ValueOf<typeof VARIANTS>;
  isLoading: boolean;
  isAccent: boolean;
  isCompact: boolean;
  isFixToBottom: boolean;
  isFullWidth: boolean;
  isDisabled: boolean;
  leadingIcon: ((props: any) => JSX.Element) | null;
  trailingIcon: ((props: any) => JSX.Element) | null;
  dataTestId: string;
};

Button.defaultProps = {
  size: BUTTON_SIZES.BASE,
  variant: VARIANTS.PRIMARY,
  isLoading: false,
  isAccent: false,
  isCompact: false,
  isFixToBottom: false,
  isFullWidth: false,
  isDisabled: false,
  leadingIcon: null,
  trailingIcon: null,
  dataTestId: ''
} as DefaultProps;

export type Props = RequiredProps & DefaultProps;

export default Button;

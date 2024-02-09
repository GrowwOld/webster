import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { AccountBalance } from '@groww-tech/icon-store/mi';

import { AVATAR_SHAPES, AVATAR_SIZES } from './avatar.constants';

import './avatar.css';


function getInitials(name: string) {
  const names = name.trim().split(' ');
  const firstName = names[0] ?? '';
  const lastName = names.length > 1 ? names[names.length - 1] : '';

  const initial = firstName && lastName ? `${firstName.charAt(0)}${lastName.charAt(0)}` : firstName.charAt(0);

  return initial.toUpperCase();
}


type Status = 'loading' | 'failed' | 'pending' | 'loaded';


const useImage = (src: string): Status => {
  const [ status, setStatus ] = useState<Status>('pending');

  useEffect(() => {
    const image = new Image();

    image.src = src;

    image.onload = () => {
      setStatus('loaded');
    };

    image.onerror = () => {
      setStatus('failed');
    };

    setStatus('loading');

    return () => {
      // Cleanup on unmount or if src changes
      image.onload = null;
      image.onerror = null;
    };
  }, [ src ]);

  return status;
};


const Avatar = (props: Props) => {
  const { src, name, size, isDisabled, shape } = props;

  const status = useImage(src);

  const initials = getInitials(name);


  const getAvatarSize = () => {
    switch (size) {
      case AVATAR_SIZES.XSMALL:
        return 24;

      case AVATAR_SIZES.SMALL:
        return 32;

      case AVATAR_SIZES.BASE:
        return 40;

      case AVATAR_SIZES.LARGE:
        return 48;

      case AVATAR_SIZES.XLARGE:
        return 56;

      default:
        return 40;
    }
  };

  const avatarSize = getAvatarSize();

  const avatarDimensionClasses = cn(`av91Avatar${size}`);

  const avatarInitialClasses = cn('av91AvatarInitialContainer absolute-center circle');

  const avatarImgClasses = cn({
    circle: shape === AVATAR_SHAPES.CIRCULAR,
    av91AvatarRectangular: shape === AVATAR_SHAPES.RECTANGULAR,
    av91AvatarImageDisabled: isDisabled
  });

  const avatarIconContainerClasses = cn('av91AvatarInitialContainer absolute-center', {
    av91AvatarRectangular: shape === AVATAR_SHAPES.RECTANGULAR,
    backgroundTertiary: !isDisabled,
    backgroundSecondary: isDisabled
  });

  const avatarIconClasses = cn({
    contentDisabled: isDisabled,
    contentSecondary: !isDisabled
  });

  const backgroundClasses = cn({
    backgroundAccentSubtle: !isDisabled,
    backgroundTertiary: isDisabled
  });

  const fontClasses = cn({
    bodySmallHeavy: size === AVATAR_SIZES.XSMALL || size === AVATAR_SIZES.SMALL,
    bodyBaseHeavy: size === AVATAR_SIZES.BASE,
    bodyLargeHeavy: size === AVATAR_SIZES.LARGE,
    bodyXLargeHeavy: size === AVATAR_SIZES.XLARGE,
    contentPositive: !isDisabled,
    contentDisabled: isDisabled
  });

  const avatarInitial = (
    <div role="img"
      className={cn(avatarInitialClasses, fontClasses, backgroundClasses, avatarDimensionClasses)}
    >
      {initials}
    </div>
  );

  const avatarIcon = (
    <div role="img"
      className={cn(avatarIconContainerClasses, avatarDimensionClasses)}
    >
      <AccountBalance className={avatarIconClasses} />
    </div>
  );

  const avatarImage = <img className={avatarImgClasses}
    src={src}
    alt={name}
    height={avatarSize}
    width={avatarSize}
  />;
  const avatarDisabled = shape === AVATAR_SHAPES.RECTANGULAR ? avatarIcon : avatarInitial;

  switch (status) {
    case 'loading':
      return avatarDisabled;

    case 'failed':
      return avatarDisabled;

    case 'loaded':
      return avatarImage;

    case 'pending':
      return avatarDisabled;

    default:
      return avatarDisabled;
  }
};


type RequiredProps = {
  name: string;
  src: string;
};


type DefaultProps = {
  size: ValueOf<typeof AVATAR_SIZES>;
  shape: ValueOf<typeof AVATAR_SHAPES>;
  isDisabled: boolean;
};

export type Props = RequiredProps & DefaultProps & Partial<HTMLImageElement>;

Avatar.defaultProps = {
  isDisabled: false,
  size: AVATAR_SIZES.BASE,
  shape: AVATAR_SHAPES.CIRCULAR
} as DefaultProps;

export default Avatar;

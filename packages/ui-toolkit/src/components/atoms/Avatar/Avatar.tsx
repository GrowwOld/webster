import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { AccountBalance } from '@groww-tech/icon-store/mi';

import { SIZES } from '../../../utils/constants';
import { AVATAR_SHAPE } from './avatar.constants';

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
      case SIZES.XSMALL:
        return 24;

      case SIZES.SMALL:
        return 32;

      case SIZES.BASE:
        return 40;

      case SIZES.LARGE:
        return 48;

      case SIZES.XLARGE:
        return 56;

      default:
        return 40;
    }
  };

  const avatarSize = getAvatarSize();

  const avatarDimensionClasses = cn(`av91Avatar${size}`);

  const avatarInitialClasses = cn('av91AvatarInitialContainer absolute-center circle');

  const avatarImgClasses = cn({
    circle: shape === AVATAR_SHAPE.CIRCULAR,
    av91AvatarRectangular: shape === AVATAR_SHAPE.RECTANGULAR,
    av91AvatarImageDisabled: isDisabled
  });

  const avatarIconContainerClasses = cn('av91AvatarInitialContainer absolute-center', {
    av91AvatarRectangular: shape === AVATAR_SHAPE.RECTANGULAR,
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
    bodySmallHeavy: size === SIZES.XSMALL || size === SIZES.SMALL,
    bodyBaseHeavy: size === SIZES.BASE,
    bodyLargeHeavy: size === SIZES.LARGE,
    bodyXLargeHeavy: size === SIZES.XLARGE,
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
  const avatarDisabled = shape === AVATAR_SHAPE.RECTANGULAR ? avatarIcon : avatarInitial;

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
  size: ValueOf<typeof SIZES>;
  shape: ValueOf<typeof AVATAR_SHAPE>;
  isDisabled: boolean;
};

export type Props = RequiredProps & DefaultProps & Partial<HTMLImageElement>;

Avatar.defaultProps = {
  isDisabled: false,
  size: 'Base',
  shape: 'Circular'
} as DefaultProps;

export default Avatar;

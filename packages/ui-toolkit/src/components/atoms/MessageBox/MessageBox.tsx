import React from 'react';
import cn from 'classnames';

import { Info } from '@groww-tech/icon-store/mi';

import { BACKGROUNDS } from './messageBox.constants';
import { SIZES } from '../../../utils/constants';

import './messageBox.css';


const MessageBox = (props: Props) => {
  const {
    size,
    isIconPresent,
    background,
    content,
    dataTestId,
    isCompact
  } = props;

  const baseClasses = cn(`mb45${size} valign-wrapper infbd45ParentDiv`, {
    backgroundTertiary: background === BACKGROUNDS.NEUTRAL,
    backgroundWarningSubtle: background === BACKGROUNDS.WARNING,
    backgroundNegativeSubtle: background === BACKGROUNDS.ERROR,
    backgroundPositiveSubtle: background === BACKGROUNDS.POSITIVE,
    mb76CompactBox: isCompact
  });

  const labelClasses = cn('contentPrimary', {
    bodySmall: size === SIZES.SMALL || size === SIZES.XSMALL,
    bodyBase: size === SIZES.BASE,
    bodyLarge: size === SIZES.LARGE,
    bodyXLarge: size === SIZES.XLARGE
  });

  return (
    <div
      className={baseClasses}
      data-test-id={dataTestId.length ? dataTestId : null}
    >
      <div className='valign-wrapper'>
        {
          isIconPresent &&
        <Info
          size={20}
          color='contentPrimary'
        />
        }
      </div>
      <span className={labelClasses}>{content}</span>
    </div>
  );
};


type RequiredProps = {
  content: React.ReactNode;
};


type DefaultProps = {
  isIconPresent: boolean;
  dataTestId: string;
  size: ValueOf<typeof SIZES>;
  background: ValueOf<typeof BACKGROUNDS>;
  isCompact: boolean;
};


MessageBox.defaultProps = {
  isIconPresent: true,
  background: BACKGROUNDS.NEUTRAL,
  dataTestId: '',
  isOutlined: false,
  size: SIZES.SMALL,
  isCompact: false
} as DefaultProps;

export type Props = RequiredProps & DefaultProps;

export default React.memo(MessageBox);

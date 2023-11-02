import React from 'react';
import cn from 'classnames';

import { Info } from '@groww-tech/icon-store/mi';

import './messageBox.css';

const BACKGROUNDS = {
  NEUTRAL: 'Neutral',
  WARNING: 'Warning',
  ERROR: 'Error',
  POSITIVE: 'Positive'
};


const MessageBox = (props: Props) => {
  const {
    size,
    isIconPresent,
    background,
    content,
    dataTestId,
    isCompact
  } = props;

  const parentDivClass = cn({
    'valign-wrapper infbd45ParentDiv': true,
    'backgroundTertiary': background === BACKGROUNDS.NEUTRAL,
    'backgroundWarningSubtle': background === BACKGROUNDS.WARNING,
    'backgroundNegativeSubtle': background === BACKGROUNDS.ERROR,
    'backgroundPositiveSubtle': background === BACKGROUNDS.POSITIVE,
    'mb76CompactBox': isCompact === true
  });

  const labelClassNames = cn({
    'bodyRegular12': size === 'Small' || size === 'XSmall',
    'bodyRegular14': size === 'Base',
    'bodyRegular16': size === 'Large',
    'bodyRegular18': size === 'XLarge'
  });

  return (
    <div
      className={cn(parentDivClass, isCompact ? `mb45${size}` : 'mb76CompactBox')}
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
      <span className={cn('contentPrimary', labelClassNames)}>{content}</span>
    </div>
  );
};


type RequiredProps = {
  content: string;
};


type DefaultProps = {
  isIconPresent: boolean;
  dataTestId: string;
  size: 'XSmall' | 'Small' | 'Base' | 'Large' | 'XLarge';
  background: 'Neutral' | 'Error' | 'Warning' | 'Positive';
  isCompact: boolean;
};


MessageBox.defaultProps = {
  isIconPresent: true,
  background: 'Neutral',
  dataTestId: '',
  isOutlined: false,
  size: 'XSmall',
  isCompact: false
} as DefaultProps;

export type Props = RequiredProps & DefaultProps;

export default React.memo(MessageBox);

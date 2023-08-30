import React from 'react';
import cn from 'classnames';

import { ReactIconProps } from '@groww-tech/icon-store';
import { Info } from '@groww-tech/icon-store/mi';

import './informationBox.css';

const COLOR_TYPE = {
  POSITIVE: 'var(--green100)',
  NEUTRAL: 'var(--gray50)',
  DEFAULT: 'var(--dangerouslySetPrimaryBg)',
  WARNING: 'var(--yellow100)',
  ERROR: 'var(--red100)'
};

const BORDER_COLOR = {
  POSITIVE: 'var(--green100)',
  NEUTRAL: 'var(--gray150)',
  DEFAULT: 'var(--gray150)',
  WARNING: 'var(--yellow500)',
  ERROR: 'var(--red500)'
};


const InformationBox = (props: Props) => {
  const {
    type,
    width,
    height,
    content,
    showIcon,
    iconComponent,
    outlined,
    informationBoxClass,
    informationBoxStyle,
    dataTestId
  } = props;

  const parentDivClass = cn({
    'valign-wrapper infbd45ParentDiv bodyRegular14': true,
    [`${informationBoxClass}`]: informationBoxClass !== ''
  });

  const parentDivStyle = {
    height: height,
    width: width,
    ...(
      outlined
        ? { border: `1px solid ${BORDER_COLOR[type]}` }
        : { background: COLOR_TYPE[type] }
    ),
    ...informationBoxStyle
  };

  const infoIconProps = {
    size: 20,
    className: 'contentPrimary infbd45InfoIcon'
  };


  return (
    <div style={parentDivStyle}
      className={parentDivClass}
      data-test-id={dataTestId.length ? dataTestId : null}
    >
      {
        showIcon
          ? iconComponent?.(infoIconProps)
          : null
      }

      <span>{content}</span>

    </div>
  );
};

const defaultProps: DefaultProps = {
  showIcon: true,
  iconComponent: (props: ReactIconProps) => <Info {...props} />,
  width: 'auto',
  height: 'auto',
  outlined: false,
  type: 'DEFAULT',
  informationBoxClass: '',
  informationBoxStyle: {},
  dataTestId: ''
};


type RequiredProps = {
  content: React.ReactNode;
}


type DefaultProps = {
  showIcon: boolean;
  /**
   * iconComponent function returns svg icon component, we pass some extra props from InformationBox component
   */
  iconComponent: (props: ReactIconProps) => JSX.Element;
  outlined: boolean;
  width: number | 'auto';
  height: number | 'auto';
  informationBoxClass: string;
  informationBoxStyle: React.CSSProperties;
  dataTestId: string;
  type: 'DEFAULT' | 'POSITIVE' | 'NEUTRAL' | 'ERROR' | 'WARNING';
}


InformationBox.defaultProps = defaultProps;

export type Props = RequiredProps & DefaultProps;

export default React.memo(InformationBox);

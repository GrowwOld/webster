'use strict';

import React from 'react';
import classnames from 'classnames';
import { ArrowForwardIos, ArrowBackIos } from '@groww-tech/icon-store/mi';
import { canGoNext } from './utils/innerSliderUtils';

export class PrevArrow extends React.PureComponent {

  render() {
    const { currentSlide, slideCount, slidesToShow, infinite } = this.props;
    const customProps = { currentSlide, slideCount };
    const disableArrow = !infinite && (currentSlide === 0 || slideCount <= slidesToShow);

    const prevClasses = { 'carousel14Arrow': true, 'carousel14Prev contentInversePrimary': true };
    let prevHandler = this.clickHandler.bind(this, { message: 'previous' });

    if (disableArrow) {
      prevClasses.carousel14Disabled = true;
      prevHandler = null;
    }

    const prevArrowProps = {
      key: '0',
      'data-role': 'none',
      className: classnames(prevClasses),
      onClick: prevHandler
    };

    let prevArrow;

    if (this.props.prevArrow) {
      prevArrow = React.cloneElement(this.props.prevArrow, {
        ...prevArrowProps,
        ...customProps
      });

    } else {
      prevArrow = (
        <button
          key="0"
          type="button"
          {...prevArrowProps}
        >
          <ArrowBackIos/>
        </button>
      );
    }

    return prevArrow;
  }


  clickHandler(options, e) {
    if (e) {
      e.preventDefault();
    }

    this.props.clickHandler(options, e);
  }
}

export class NextArrow extends React.PureComponent {

  render() {
    const { currentSlide, slideCount } = this.props;
    const customProps = { currentSlide, slideCount };

    const nextClasses = { 'carousel14Arrow': true, 'carousel14Next contentInversePrimary': true };
    let nextHandler = this.clickHandler.bind(this, { message: 'next' });

    if (!canGoNext(this.props)) {
      nextClasses.carousel14Disabled = true;
      nextHandler = null;
    }

    const nextArrowProps = {
      key: '1',
      'data-role': 'none',
      className: classnames(nextClasses),
      onClick: nextHandler
    };


    let nextArrow;

    if (this.props.nextArrow) {
      nextArrow = React.cloneElement(this.props.nextArrow, {
        ...nextArrowProps,
        ...customProps
      });

    } else {
      nextArrow = (
        <button
          key="1"
          type="button"
          {...nextArrowProps}
        >
          <ArrowForwardIos />
        </button>
      );
    }

    return nextArrow;
  }


  clickHandler(options, e) {
    if (e) {
      e.preventDefault();
    }

    this.props.clickHandler(options, e);
  }
}

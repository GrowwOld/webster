import React from 'react';
import cn from 'classnames';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@groww-tech/icon-store/mi';

import './monthCalendar.css';
import { compareDate } from '../calendarUtils';
import { CalendarProps as Props } from '../calendar.types';

const MONTHS = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

class MonthCalendar extends React.PureComponent<Props, State> {
  static defaultProps = {
    highlightCurrentDate: true,
    minDate: null,
    maxDate: null
  };


  state:State = {
    dateToShow: this.props.currentDate,
    selectedDate: null
  };


  render() {
    const { dateToShow, selectedDate } = this.state;
    const maxDate = this.props.maxDate ? new Date(this.props.maxDate) : null;
    const minDate = this.props.minDate ? new Date(this.props.minDate) : null;

    const hasNextYear = !(maxDate && dateToShow.getFullYear() === maxDate.getFullYear());
    const hasPrevYear = !(minDate && dateToShow.getFullYear() === minDate.getFullYear());

    const handlers = {
      'PREVIOUS_MONTH': () => {
        if (hasPrevYear) this.goToPreviousYear();
      },
      'NEXT_MONTH': () => {
        if (hasNextYear) this.goToNextYear();
      }
    };

    return (
      <div className='contentPrimary'>
        <div className='card borderPrimary mn12Box'>
          <div className="valign-wrapper mn12YearRow">
            <div className="valign-wrapper cur-po">
              <KeyboardArrowLeft
                fontSize={21}
                onClick={handlers.PREVIOUS_MONTH}
                className={cn({ 'contentSecondary cur-no': !hasPrevYear })}
              />
            </div>
            <span>{dateToShow.getFullYear()}</span>
            <div className="valign-wrapper cur-po">
              <KeyboardArrowRight
                fontSize={21}
                onClick={handlers.NEXT_MONTH}
                className={cn({ 'contentSecondary cur-no': !hasNextYear })}
              />
            </div>
          </div>
          <div className="valign-wrapper mn12MonthBox">
            {
              MONTHS.map((month, index) => {
                const newDate = new Date(dateToShow);

                newDate.setMonth(index);
                const monthSelected = newDate.getTime() === selectedDate?.getTime();
                const isDisabled = (minDate && compareDate(minDate, newDate)) || (maxDate && compareDate(newDate, maxDate));


                const onClickHandler = () => {
                  if (!isDisabled) this.onMonthClick(index);
                };

                return (
                  <div className="mn12Month"
                    key={`${dateToShow?.getTime()}${index}`}
                  >
                    <div
                      className={
                        cn('mn12MonthText backgroundPrimary valign-wrapper cur-po bodyRegular14', {
                          'mn12MonthCurrent contentInversePrimary': this.isMonthSelected(index),
                          'mn12MonthTextSelected contentInversePrimary': monthSelected,
                          'mn12MonthBack backgroundPrimary': !monthSelected && !isDisabled,
                          'cc12DisableDate': isDisabled
                        })
                      }
                      onClick={onClickHandler}
                    >
                      {month}
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }


  isMonthSelected = (month: number) => {
    const { currentDate } = this.props;
    const { dateToShow } = this.state;
    const currentMonthIndex = currentDate.getMonth();

    return month === currentMonthIndex && currentDate.getFullYear() === dateToShow.getFullYear();
  }


  onMonthClick = (index:number) => {
    const { onDateChange } = this.props;
    const { dateToShow } = this.state;
    const newDate = new Date(dateToShow);

    newDate.setMonth(index);

    onDateChange(newDate);

    this.setState({
      dateToShow: newDate,
      selectedDate: newDate
    });
  }


  goToPreviousYear = () => {
    const { dateToShow } = this.state;
    const newDate = new Date(dateToShow);

    newDate.setFullYear(dateToShow.getFullYear() - 1);
    this.setState({ dateToShow: newDate });
  };


  goToNextYear = () => {
    const { dateToShow } = this.state;
    const newDate = new Date(dateToShow);

    newDate.setFullYear(dateToShow.getFullYear() + 1);
    this.setState({ dateToShow: newDate });
  };
}


type State = {
  dateToShow: Date;
  selectedDate: Date | null;
}

export default MonthCalendar;

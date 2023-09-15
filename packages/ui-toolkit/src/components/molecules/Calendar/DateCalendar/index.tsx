import React from 'react';
import cn from 'classnames';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight
} from '@groww-tech/icon-store/mi';

import { compareDate, getDatesArray, getMonthAbbrByIndex } from '../calendarUtils';
import { CalendarProps as Props } from '../calendar.types';

import './dateCalendar.css';

const WEEK_DAYS = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];


class DateCalendar extends React.PureComponent<Props, State> {
  static defaultProps = {
    highlightCurrentDate: true,
    minDate: null,
    maxDate: null
  };


  state:State = {
    dateToShow: this.props.currentDate,
    dates: getDatesArray(this.props.currentDate),
    selectedDate: null
  };


  componentDidUpdate(prevProps: Props) {

    if (prevProps.currentDate.getDate() !== this.props.currentDate.getDate()) {
      this.setState({
        dateToShow: this.props.currentDate,
        dates: getDatesArray(this.props.currentDate)
      });
    }
  }


  render() {

    return (
      <div>
        <div className="cc12Box">
          {this.getYearUI()}
          {this.getMonthUI()}
          {this.getDatesUI()}
        </div>
      </div>
    );
  }


  getYearUI = () => {
    const { dateToShow } = this.state;
    const maxDate = this.props.maxDate ? new Date(this.props.maxDate) : null;
    const minDate = this.props.minDate ? new Date(this.props.minDate) : null;

    const hasNextYear = !(maxDate && dateToShow.getFullYear() === maxDate.getFullYear());
    const hasPrevYear = !(minDate && dateToShow.getFullYear() === minDate.getFullYear());
    const hasNextMonth = !(maxDate && dateToShow.getMonth() === maxDate.getMonth() && dateToShow.getFullYear() === maxDate.getFullYear());
    const hasPrevMonth = !(minDate && dateToShow.getMonth() === minDate.getMonth() && dateToShow.getFullYear() === minDate.getFullYear());

    return (
      <div className="valign-wrapper cc12YearBox">
        <div className="valign-wrapper cur-po">
          <KeyboardDoubleArrowLeft
            fontSize={21}
            onClick={
              () => {
                if (hasPrevYear) this.goToPreviousYear();
              }
            }
            className={cn({ 'contentSecondary cur-no': !hasPrevYear })}
          />
        </div>
        <div
          className="valign-wrapper cur-po"
        >
          <KeyboardArrowLeft fontSize={21}
            onClick={
              () => {
                if (hasPrevMonth) this.goToPreviousMonth();
              }
            }
            className={cn({ 'contentSecondary cur-no': !hasPrevMonth })}
          />
        </div>
        <div className='cc12Year bodyRegular16'>
          <span>{getMonthAbbrByIndex(dateToShow.getMonth() + 1)} {dateToShow.getFullYear()}</span>
        </div>
        <div
          className="valign-wrapper cur-po"
        >
          <KeyboardArrowRight fontSize={21}
            onClick={
              () => {
                if (hasNextMonth) this.goToNextMonth();
              }
            }
            className={cn({ 'contentSecondary cur-no': !hasNextMonth })}
          />
        </div>
        <div className="valign-wrapper cur-po">
          <KeyboardDoubleArrowRight
            fontSize={21}
            onClick={
              () => {
                if (hasNextYear) this.goToNextYear();
              }
            }
            className={cn({ 'contentSecondary cur-no': !hasNextYear })}
          />
        </div>
      </div>
    );
  }


  getMonthUI = () => {
    return (
      <div className='cc12WeekNameBox valign-wrapper contentSecondary bodyRegular14'>
        {
          WEEK_DAYS.map((day) => (
            <span className="cc12WeekName"
              key={day}
            >
              {day}
            </span>
          ))
        }
      </div>
    );
  }


  getDatesUI = () => {
    const { dates, dateToShow, selectedDate } = this.state;
    const { minDate, maxDate } = this.props;

    return (
      <div>
        {
          dates.map((dateArr, datesArrIndex) => {

            return (
              <div
                key={'datesArrIndex' + datesArrIndex}
                className="valign-wrapper cc12DateRow"
              >
                {
                  dateArr.map((date, index) => {
                    if (date !== null) {
                      const newDate = new Date(dateToShow);

                      newDate.setDate(date);

                      const dateSelected = newDate.getTime() === selectedDate?.getTime();
                      const isDisabled = (minDate && compareDate(minDate, newDate)) || (maxDate && compareDate(newDate, maxDate));

                      return (
                        <div className="cc12DateBlock"
                          key={`${newDate.getTime()}${index}`}
                        >
                          <span
                            className={
                              cn('cc12Date valign-wrapper cur-po circle bodyRegular14', {
                                'cc12DateCurrent contentInversePrimary': this.isDateSelected(date),
                                'cc12DateSelected contentInversePrimary': dateSelected,
                                'cc12DateNotSelected': !dateSelected && !isDisabled,
                                'cc12DisableDate': isDisabled
                              })
                            }
                            onClick={
                              () => {
                                if (!isDisabled) this.onDateClick(date);
                              }
                            }
                          >
                            {date}
                          </span>
                        </div>
                      );
                    }

                    return (
                      <div className="cc12DateBlock"
                        key={index}
                      >&nbsp;</div>
                    );
                  })
                }
              </div>
            );
          })
        }
      </div>
    );
  }


  isDateSelected = (date: number | null) => {
    const { dateToShow } = this.state;
    const { highlightCurrentDate, currentDate } = this.props;

    return (highlightCurrentDate && (currentDate.getDate() === date) && (dateToShow.getFullYear() === currentDate.getFullYear()) && (dateToShow.getMonth() === currentDate.getMonth()));
  };


  goToPreviousMonth = () => {
    const { dateToShow } = this.state;
    const newDate = new Date(dateToShow);

    newDate.setMonth(dateToShow.getMonth() - 1);
    this.setState({ dateToShow: newDate, dates: getDatesArray(newDate) });
  };


  goToNextMonth = () => {
    const { dateToShow } = this.state;
    const newDate = new Date(dateToShow);

    newDate.setMonth(dateToShow.getMonth() + 1);
    this.setState({ dateToShow: newDate, dates: getDatesArray(newDate) });
  };


  goToPreviousYear = () => {
    const { dateToShow } = this.state;
    const newDate = new Date(dateToShow);

    newDate.setFullYear(dateToShow.getFullYear() - 1);
    this.setState({ dateToShow: newDate, dates: getDatesArray(newDate) });
  };


  goToNextYear = () => {
    const { dateToShow } = this.state;
    const newDate = new Date(dateToShow);

    newDate.setFullYear(dateToShow.getFullYear() + 1);
    this.setState({ dateToShow: newDate, dates: getDatesArray(newDate) });
  };


  onDateClick = (date: number) => {
    const { onDateChange } = this.props;
    const { dateToShow } = this.state;
    const newDate = new Date(dateToShow);

    newDate.setDate(date);

    onDateChange(newDate);

    this.setState({
      dateToShow: newDate,
      selectedDate: newDate
    });
  }

}


type State = {
  dateToShow: Date;
  dates: (number | null)[][];
  selectedDate: Date | null;
}


export default DateCalendar;

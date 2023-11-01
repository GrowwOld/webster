import React from 'react';

import MonthCalendar from './MonthCalendar';
import DateCalendar from './DateCalendar';
import { CalendarProps } from './calendar.types';

export const CALENDAR_TYPE = {
  MONTH: 'MONTH',
  DATE: 'DATE'
};


const Calendar = (props:Props) => {
  const {
    type,
    currentDate,
    onDateChange,
    minDate,
    maxDate,
    highlightCurrentDate
  } = props;
  /* restprops is props we have to send to MonthCalendar or DateCalendar */

  const emptyFunction = () => void 0;

  const CalendarComponent = type === CALENDAR_TYPE.MONTH ? MonthCalendar : DateCalendar;

  return (
    <CalendarComponent
      currentDate={currentDate || new Date()}
      minDate={minDate}
      maxDate={maxDate}
      onDateChange={onDateChange || emptyFunction}
      highlightCurrentDate={highlightCurrentDate}
    />
  );
};


export type Props = {
  type: keyof typeof CALENDAR_TYPE;
} & CalendarProps;

export default Calendar;

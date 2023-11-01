export type CalendarProps = {
  currentDate: Date;
  onDateChange: (date:Date)=>void;
  highlightCurrentDate?: boolean;
  minDate?: Date | null;
  maxDate?: Date | null;
};

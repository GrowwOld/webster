function getDaysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate();
}

export function getDatesArray(dateToShow: Date) {
  const dates:(number | null)[][] = [];

  const totalDaysInMonth = getDaysInMonth(dateToShow.getMonth() + 1, dateToShow.getFullYear());

  let currentWeek = 0;

  for (let date = 1; date <= totalDaysInMonth; date += 1) {
    const dateToSet = new Date(dateToShow.getFullYear(), dateToShow.getMonth(), date);
    const weekDay = dateToSet.getDay();

    if (dates[currentWeek]) {
      if (dates[currentWeek][weekDay]) {
        /* increase currentWeeek and initialize new array into dates */
        dates.push([ null, null, null, null, null, null, null ]);
        currentWeek++;

      } else if (weekDay === 0) {
        /* increase currentWeeek and initialize new array into dates */
        dates.push([ null, null, null, null, null, null, null ]);
        currentWeek++;
      }

    } else {
      dates.push([ null, null, null, null, null, null, null ]);
    }

    dates[currentWeek][weekDay] = date;
  }

  return dates;
}

export function getMonthAbbrByIndex(monthNumber: number): string {
  if (monthNumber < 1 || monthNumber > 12) {
    return '';
  }

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  return monthNames[ monthNumber - 1 ];
}


  /* check date1 is greater than date2 */
export function compareDate(date1: Date, date2: Date) {
    // This conversion is required because there is no validation below and .get methods only exists on Date instance unix timestamp will fail
  date1 = new Date(date1);
  date2 = new Date(date2);
  const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate(), 0, 0, 0);
  const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate(), 0, 0, 0);

  return d1.getTime() > d2.getTime();
}

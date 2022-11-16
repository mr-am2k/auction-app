import moment from 'moment';

export const dateDiff = (expirationDate: Date) => {
  const currentDate = moment(new Date());
  const expDate = moment(new Date(expirationDate));
  const dateDiffInDays = expDate.diff(currentDate, 'days');
  const dateDiffInHours = expDate.diff(currentDate, 'hours');
  const dateDiffInMinutes = expDate.diff(currentDate, 'minutes');
  const dateDiffInSeconds = expDate.diff(currentDate, 'seconds');

  //return years
  if (dateDiffInDays > 364) {
    const yearDiff = expDate.diff(currentDate, 'years');
    return yearDiff === 1 ? yearDiff + ' year' : yearDiff + ' years';
  }

  //return months
  if (dateDiffInDays > 31) {
    const monthDiff = expDate.diff(currentDate, 'months');
    return monthDiff === 1 ? monthDiff + ' month' : monthDiff + ' months';
  }

  //return weeks + days
  if (dateDiffInDays > 7) {
    const weekDiff = expDate.diff(currentDate, 'weeks');
    const numberOfDays = parseInt((dateDiffInDays % 7).toString());
    return weekDiff === 1
      ? weekDiff +
          ' week ' +
          numberOfDays +
          (numberOfDays === 1 ? ' day' : ' days')
      : weekDiff +
          ' weeks ' +
          numberOfDays +
          (numberOfDays === 1 ? ' day' : ' days');
  }

  //return days
  if (dateDiffInDays >= 1) {
    return dateDiffInDays === 1
      ? dateDiffInDays + ' day'
      : dateDiffInDays + ' months';
  }

  //return hours + minutes
  if (dateDiffInHours >= 1) {
    const remainingMinutes = parseInt((dateDiffInMinutes % 60).toString());
    return dateDiffInHours === 1
      ? dateDiffInHours +
          ' hour ' +
          remainingMinutes +
          (remainingMinutes === 1 ? ' minute' : ' minutes')
      : dateDiffInHours +
          ' hours ' +
          remainingMinutes +
          (remainingMinutes === 1 ? ' minute' : ' minutes');
  }

  //return minutes + seconds
  if (dateDiffInMinutes >= 1) {
    const remainingSeconds = parseInt((dateDiffInSeconds % 60).toString());
    return dateDiffInMinutes === 1
      ? dateDiffInMinutes +
          ' minute ' +
          remainingSeconds +
          (remainingSeconds === 1 ? ' second' : ' seconds')
      : dateDiffInMinutes +
          ' minutes ' +
          remainingSeconds +
          (remainingSeconds === 1 ? ' second' : ' seconds');
  }

  //return seconds
  if (dateDiffInSeconds >= 1) {
    return dateDiffInSeconds === 1
      ? dateDiffInSeconds + ' second'
      : dateDiffInSeconds + ' seconds';
  }

  return -1
};

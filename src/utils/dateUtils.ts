export const getDateFromTimeStamp = (timestamp: string | number | Date) => {
  return getDate(new Date(timestamp));
};
export const getDateTimeFromTimeStamp = (timestamp: string | number | Date) => {
  return getDateTime(new Date(timestamp));
};

export const getDate = (date: Date) => {
  return (
    (date.getDate() < 10 ? '0' : '') +
    date.getDate() +
    '/' +
    (date.getMonth() + 1 < 10 ? '0' : '') +
    (date.getMonth() + 1) +
    '/' +
    date.getFullYear()
  );
};

export const getTimeLeft = (date1: Date, date2: Date) => {
  const timeLeft = new Date(date2.getTime() - date1.getTime());
  const years = timeLeft.getUTCFullYear() - 1970;
  const months = timeLeft.getUTCMonth();
  const days = timeLeft.getUTCDate() - 1;
  const hours = timeLeft.getHours() - 1;
  const minute = timeLeft.getUTCMinutes();
  const second = timeLeft.getUTCSeconds();
  if (years < 0) return false;
  const res =
    `${years > 0 ? ' ' + years + (years > 1 ? ' années' : ' année') : ''}` +
    `${months > 0 ? ' ' + months + ' mois' : ''}` +
    `${days > 0 ? ' ' + days + (days > 1 ? ' jours' : ' jour') : ''}` +
    `${hours > 0 ? ' ' + hours + (hours > 1 ? ' heures' : ' heure') : ''}` +
    `${
      minute > 0 ? ' ' + minute + (minute > 1 ? ' minutes' : ' minute') : ''
    }` +
    `${
      second > 0 ? ' ' + second + (second > 1 ? ' secondes' : ' seconde') : ''
    }`;
  if (res === '') return false;
  return res;
};

export const getDateTime = (date: Date) => {
  return (
    (date.getDate() < 10 ? '0' : '') +
    date.getDate() +
    '/' +
    (date.getMonth() + 1 < 10 ? '0' : '') +
    (date.getMonth() + 1) +
    '/' +
    date.getFullYear() +
    ' ' +
    (date.getHours() < 10 ? '0' : '') +
    date.getHours() +
    ':' +
    (date.getMinutes() < 10 ? '0' : '') +
    date.getMinutes()
  );
};

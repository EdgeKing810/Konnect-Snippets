const generate = () => {
  let d = new Date();
  const timestamp = new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDate(),
    d.getHours(),
    d.getMinutes(),
    d.getSeconds()
  );
  return timestamp;
};

const convert = (date, absolute) => {
  const language = 'en';

  const oldDate = new Date(date);
  const currentDate = new Date(generate());

  if (absolute) {
    const splitted = oldDate.toString().split(' ');

    const months = {
      en: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    };

    const days = {
      en: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
    };

    const year = splitted[3];
    const date = splitted[2];
    const month = months[language][oldDate.getMonth()];
    const day = days[language][oldDate.getDay()];
    const time = splitted[4];

    return `${time} - ${day}, ${date} ${month} ${year}`;
  }

  let localTerms = {
    en: [' years', ' months', ' days', ' hours', ' minutes', ' seconds'],
  };

  let ms = Math.abs(currentDate - oldDate);
  let prettyTime;

  if (ms >= 1000 * 60 * 60 * 24 * 365) {
    prettyTime =
      Math.floor(ms / (1000 * 60 * 60 * 24 * 365)) + localTerms[language][0];
  } else if (ms >= 1000 * 60 * 60 * 24 * 30) {
    prettyTime =
      Math.floor(ms / (1000 * 60 * 60 * 24 * 30)) + localTerms[language][1];
  } else if (ms >= 1000 * 60 * 60 * 24) {
    prettyTime =
      Math.floor(ms / (1000 * 60 * 60 * 24)) + localTerms[language][2];
  } else if (ms >= 1000 * 60 * 60) {
    prettyTime = Math.floor(ms / (1000 * 60 * 60)) + localTerms[language][3];
  } else if (ms >= 1000 * 60) {
    prettyTime = Math.floor(ms / (1000 * 60)) + localTerms[language][4];
  } else {
    prettyTime = Math.floor(ms / 1000) + localTerms[language][5];
  }

  let endString = ' ago';

  return (
    (prettyTime.split(' ')[0] === '1' ? prettyTime.slice(0, -1) : prettyTime) +
    endString
  );
};

export { generate, convert };

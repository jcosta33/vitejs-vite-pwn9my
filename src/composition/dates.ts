// import useContext from './context';

// const { language } = useContext();
const language = { value: 'PT' };
const getTime = (date: string) => {
  const newDate = new Date(date);
  return newDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
};

const getDate = (date: string) => {
  const newDate = new Date(date);
  return newDate.toLocaleString(language.value, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
const getDateWithTime = (date: string) => {
  const newDate = new Date(date);
  return newDate.toLocaleString(language.value, {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};

const getDay = (date: string) => {
  const newDate = new Date(date);
  return newDate.toLocaleString(language.value, { weekday: 'long' });
};

export default function useDates() {
  return {
    getTime, getDate, getDay, getDateWithTime,
  };
}

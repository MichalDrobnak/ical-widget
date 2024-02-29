import {
  endOfHour,
  startOfHour,
  type Interval,
  addHours,
  areIntervalsOverlapping,
  interval,
  startOfDay,
} from 'date-fns';
import type {
  IDailyAvailability,
  IHourlyAvailability,
  IReservation,
} from '../models/interfaces';

const HOURS_IN_DAY = 24;

const getHourInterval = (date: Date): Interval => {
  const hourStart = startOfHour(date);
  const hourEnd = endOfHour(date);

  return interval(hourStart, hourEnd);
};

const isFreeInInterval = (
  checkedInterval: Interval,
  reservations: IReservation[],
): boolean => {
  return reservations.every((reservation) => {
    const resInterval = interval(reservation.start, reservation.end);
    const areOverlapping = areIntervalsOverlapping(
      checkedInterval,
      resInterval,
    );

    return !areOverlapping;
  });
};

export const getDailyAvailability = (
  date: Date,
  availability: IReservation[],
): IDailyAvailability => {
  const dailyAvailability: IDailyAvailability = {};
  const start = startOfDay(date);

  for (let i = 0; i < HOURS_IN_DAY; i++) {
    const hour = addHours(start, i);
    const hourInterval = getHourInterval(hour);
    dailyAvailability[i] = isFreeInInterval(hourInterval, availability);
  }

  return dailyAvailability;
};

export const getHourlyAvailability = (
  date: Date,
  availability: IReservation[],
): IHourlyAvailability => {
  const currentHourInterval = getHourInterval(date);
  const nextHourInterval = getHourInterval(addHours(date, 1));

  return {
    currentHour: isFreeInInterval(currentHourInterval, availability),
    nextHour: isFreeInInterval(nextHourInterval, availability),
  };
};

import {
  endOfHour,
  interval,
  startOfHour,
  type Interval,
  addHours,
  areIntervalsOverlapping,
} from "date-fns";
import type { IAvailability, IReservation } from "../models/interfaces";

const getHourInterval = (date: Date): Interval => {
  const hourStart = startOfHour(date);
  const hourEnd = endOfHour(date);

  return interval(hourStart, hourEnd);
};

const isFreeInInterval = (
  checkedInterval: Interval,
  reservations: IReservation[]
): boolean => {
  // console.log(reservations);

  return reservations.every((reservation) => {
    const resInterval = interval(reservation.start, reservation.end);
    return !areIntervalsOverlapping(checkedInterval, resInterval);
  });
};

export const isAvailable = (
  date: Date,
  availability: IReservation[]
): IAvailability => {
  const currentHourInterval = getHourInterval(date);
  const nextHourInterval = getHourInterval(addHours(date, 1));

  return {
    currentHour: isFreeInInterval(currentHourInterval, availability),
    nextHour: isFreeInInterval(nextHourInterval, availability),
  };
};

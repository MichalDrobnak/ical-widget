import {
  endOfHour,
  startOfHour,
  type Interval,
  addHours,
  areIntervalsOverlapping,
  interval,
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
  return reservations.every((reservation) => {
    const resInterval = interval(reservation.start, reservation.end);
    const areOverlapping = areIntervalsOverlapping(
      checkedInterval,
      resInterval
    );

    if (areOverlapping && reservation.summary === "3D digitalizace") {
      // console.log("Overlapping reservation", resInterval, checkedInterval);
    }

    return !areOverlapping;
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

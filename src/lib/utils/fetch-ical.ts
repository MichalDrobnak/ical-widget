import type {
  IReservation,
  IRoom,
  IRoomReservations,
} from '../models/interfaces';
import ical, { Component, Time } from 'ical.js';

const ICAL_URL = '/meeting-room-ics';
const REFETCH_DELAY_MS = 1000;
const MAX_RETRIES = 5;

const RESERVATION_TYPE = 'vevent';
const RESERVATION_START = 'dtstart';
const RESERVATION_END = 'dtend';
const SUMMARY = 'summary';
const UID = 'uid';
const TIMEZONE = 'vtimezone';

export const fetchIcal = async (
  roomId: string,
  retry = 0,
): Promise<IReservation[]> => {
  if (retry > MAX_RETRIES) {
    throw new Error('Max retries reached');
  }

  const response = await fetchRoomData(roomId);
  const data = await readStream(response);

  try {
    const reservations = parseIcal(data);
    return reservations;
  } catch (error) {
    return new Promise((resolve) => setTimeout(resolve, REFETCH_DELAY_MS)).then(
      () => fetchIcal(roomId, retry + 1),
    );
  }
};

export const fetchRooms = async (rooms: IRoom[]) => {
  return Promise.all(
    rooms.map((room) =>
      fetchIcal(room.hash).then(
        (reservations): IRoomReservations => ({ ...room, reservations }),
      ),
    ),
  );
};

const fetchRoomData = async (roomId: string): Promise<Response> => {
  const headers = new Headers([['Content-Type', 'text/calendar']]);

  return fetch(`${ICAL_URL}/${roomId}`, {
    method: 'GET',
    headers,
  });
};

const readStream = async (response: Response): Promise<string | null> => {
  const body = response.body;

  if (!body) {
    return null;
  }

  const reader = body.getReader();
  const decoder = new TextDecoder('utf-8');
  const chunks = [];
  let doneReading = false;

  while (!doneReading) {
    const { done, value } = await reader.read();
    doneReading = done;
    chunks.push(decoder.decode(value));
  }

  return chunks.join('');
};

const parseIcal = (data: string | null): IReservation[] => {
  if (data) {
    const parsed = ical.parse(data);
    const icalComponent = new Component(parsed);
    const vtimezone = icalComponent.getFirstSubcomponent(TIMEZONE);
    const timezone = new ical.Timezone(vtimezone!);
    const reservations = getRoomReservations(icalComponent, timezone);

    return reservations;
  }

  return [];
};

const getRoomReservations = (
  icalComponent: Component,
  timezone: ical.Timezone,
): IReservation[] => {
  const events = icalComponent.getAllSubcomponents(RESERVATION_TYPE);

  return events.map((event) => {
    const start = event.getFirstPropertyValue<Time>(RESERVATION_START);
    const end = event.getFirstPropertyValue<Time>(RESERVATION_END);
    const summary = event.getFirstPropertyValue<string>(SUMMARY);
    const uid = event.getFirstPropertyValue<string>(UID);

    return {
      id: uid,
      summary: summary,
      start: getDateWithTimezone(start, timezone),
      end: getDateWithTimezone(end, timezone),
    } as IReservation;
  });
};

const getDateWithTimezone = (time: Time, timezone: ical.Timezone): Date => {
  time.zone = timezone;
  return time.toJSDate();
};

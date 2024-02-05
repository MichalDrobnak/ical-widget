import ical from "ical";
import type { IReservation, IRoomReservations } from "../models/interfaces";

const ICAL_URL = "/meeting-room-ics";
const ROOM_NAME_REGEX = /PRODID:-\/\/.*\/\/([^\/]+)\/\/.*/;
const RESERVATION_TYPE = "VEVENT";

export const fetchIcal = async (roomId: string): Promise<IRoomReservations> => {
  const response = await fetchRoomData(roomId);
  const data = await readStream(response);
  return parseIcal(data);
};

const fetchRoomData = async (roomId: string): Promise<Response> => {
  const headers = new Headers([["Content-Type", "text/calendar"]]);

  return fetch(`${ICAL_URL}/${roomId}`, {
    method: "GET",
    headers,
  });
};

const readStream = async (response: Response): Promise<string | null> => {
  const body = response.body;

  if (!body) {
    return null;
  }

  const reader = body.getReader();
  const decoder = new TextDecoder("utf-8");
  const chunks = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    chunks.push(decoder.decode(value));
  }

  return chunks.join();
};

const parseIcal = (data: string | null): IRoomReservations => {
  if (data) {
    const parsed = ical.parseICS(data);
    const roomName = getRoomName(data);
    const reservations = getRoomReservations(parsed);

    return {
      roomName,
      reservations,
    };
  }

  return {
    reservations: [],
  };
};

const getRoomReservations = (ical: ical.FullCalendar): IReservation[] => {
  return Object.values(ical)
    .filter(
      (event) => event.type === RESERVATION_TYPE && event.start && event.end
    )
    .map((event) => ({
      id: event.uid,
      summary: event.summary,
      start: event.start!,
      end: event.end!,
    }));
};

const getRoomName = (data: string): string => {
  const name = data.match(ROOM_NAME_REGEX);
  return name ? name[1] : "";
};

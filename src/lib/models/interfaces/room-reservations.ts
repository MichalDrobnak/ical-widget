import type { IReservation } from "./reservation";

export interface IRoomReservations {
  roomName?: string;
  reservations: IReservation[];
}

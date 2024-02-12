import type { IReservation } from './reservation';
import type { IRoom } from './room';

export interface IRoomReservations extends IRoom {
  reservations: IReservation[];
}

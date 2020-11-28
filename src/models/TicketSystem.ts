import { BehaviorSubject } from "rxjs";

export class TicketSystem {
     counter: BehaviorSubject<number> = new BehaviorSubject<number>(0)
}
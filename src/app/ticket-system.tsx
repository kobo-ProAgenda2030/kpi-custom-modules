import React from "react";
import { TicketSystem } from "../models/TicketSystem";
import { Counter } from "./counter";
import { FormDialog } from "./dialog";
import { InteractiveList } from "./interactive";

const ticketSystem = new TicketSystem();
export { ticketSystem }

export function TicketSystemBody() {
    return (<div style={{ background: "#bdbdbd" }}>
        <FormDialog />
        <InteractiveList />
        <Counter />
        <Counter />
        <Counter />
    </div>)
}
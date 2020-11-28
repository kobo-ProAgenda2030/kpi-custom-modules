import React from "react";
import { TicketSystem } from "../models/TicketSystem";
import { currentLang } from "../utils/locale_utils";
import { Counter } from "./counter";
import { FormDialog } from "./dialog";
import { InteractiveList } from "./interactive";
import { NestedList } from "./side_menu";

const ticketSystem = new TicketSystem();
export { ticketSystem }

export function TicketSystemBody() {
    return (<div style={{ height: "100%", width: "100%", position: "relative", background: "#bdbdbd", overflowY: "scroll" }}>
        {currentLang()}
        <FormDialog />
        <InteractiveList />
        <Counter />
        <Counter />
        <Counter />

    </div>)
}
export function TicketSystemSideBar() {
    return (<NestedList />)
}
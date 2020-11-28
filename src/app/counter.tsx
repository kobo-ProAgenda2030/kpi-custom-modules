import React from "react"
import Button from '@material-ui/core/Button';
import { useBehaviorState } from "../utils/useBehaviorState"
import { ticketSystem } from "./ticket-system"

export function Counter() {
    const value = useBehaviorState<number>(ticketSystem.counter)
    return (<div>
        value {value}
        <Button onClick={() => { ticketSystem.counter.next(value + 1) }} variant="contained" color="primary">Primary</Button>
    </div>)
}
import React from 'react';
import ReactDOM from 'react-dom';
import { TicketSystem } from './app/ticket-system';
console.log("dev ticket system")
ReactDOM.render(
    <React.StrictMode>
        <TicketSystem />
    </React.StrictMode>,
    document.getElementById('root')
);

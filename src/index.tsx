import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import { TicketSystemBody } from './app/ticket-system';
console.log("dev ticket system")
ReactDOM.render(
    <React.StrictMode>
        <TicketSystemBody />
    </React.StrictMode>,
    document.getElementById('root')
);

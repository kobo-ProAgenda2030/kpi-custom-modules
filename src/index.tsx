import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import { TicketSystemBody, TicketSystemSideBar } from './app/ticket-system';
console.log("dev ticket system")
ReactDOM.render(
    <React.StrictMode>
        <div style={{ display: "flex" }}>
            <TicketSystemSideBar />
            <TicketSystemBody /></div>
    </React.StrictMode>,
    document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import { TicketSystemBody } from './app/ticket-system';
import { TicketSystemSideBar } from './app/side_menu';
console.log("dev ticket system")
function App() {
    return (<div style={{ display: "flex" }}>
        <TicketSystemSideBar />
        <TicketSystemBody baseURL="http://localhost:5000/" /></div>)
}
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

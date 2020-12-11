import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import { TicketSystemBody } from './app/ticket-system';
import { TicketSystemSideBar } from './app/side_menu';
import { PeopleSideBar } from './people/app/people_side_bar';
import { PeopleBody } from './people/app/people_body';
console.log("dev ticket system")
function App() {
    return (<div style={{ display: "flex" }}>
        <div style={{ width: 300 }}>
            <PeopleSideBar />
        </div>
        <PeopleBody baseURL={"http://support.nexion-dev.tk:8500/dummy/dashboard"} />
    </div>)
}
ReactDOM.render(
        <App />,
    document.getElementById('root')
);

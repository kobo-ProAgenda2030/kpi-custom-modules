import { Avatar, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Raw } from "../models/raw";
import { SurveyEntity, Survey } from "../models/survey";
import { ServerConnection } from "../models/serverConnection";
import { User } from "../models/user";


export function TicketSystemBody({ baseURL }: { baseURL: string }) {
    const [server] = useState<ServerConnection>(new ServerConnection(baseURL))
    const [user, setUser] = useState<null | User>(null)
    const [survey, setSurvey] = useState<null | Survey>(null)

    useEffect(() => {
        server.getMe().then(setUser).catch(console.log)
        server.getSurveys().then(setSurvey).catch(console.log)
    }, [server])
    console.log(survey)
    return (<div style={{ height: "100%", width: "100%", position: "relative", background: "#bdbdbd", overflowY: "scroll" }}>
        {user && <UserData user={user} />}
        {survey && <SurveyData survey={survey} server={server} />}
    </div>)
}
function UserData({ user }: { user: User }) {
    return (<div>
        {"username: "} {user.username}{"  email: "}{user.email}
        <Avatar alt="Remy Sharp" src={user.gravatar} />
    </div>)
}
function SurveyData({ survey, server }: { survey: Survey, server: ServerConnection }) {
    return (<div>
        {survey.results.map((value, index) => (<div key={index}><SurveyDetail value={value} server={server} /></div>))}
    </div>)
}
function SurveyDetail({ value, server }: { value: SurveyEntity, server: ServerConnection }) {

    const [raw, setRaw] = useState<null | Raw>(null)
    console.log("raw", raw)
    return (<div>
        <Button onClick={() => {
            server.getRaw(value.uid).then(setRaw).catch(console.log)
        }} color={value.deployment__active ? "primary" : "secondary"}>
            {value.name}
        </Button>
        <div style={{ background: "white" }} >
            {raw && raw.results.map((element, index) => <div key={index}><br />{"data: "}{JSON.stringify(element)}</div>)}
        </div>
    </div>)
}
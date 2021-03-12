import React from "react";
import { OrganizationBody } from "./modules/organizations/app/OrganizationBody";
import { UserBody } from "./modules/users/app/UserBody";
import { CustomSession } from "./session/CustomSession";

export const customSession: CustomSession = new CustomSession(
  "http://localhost:63253"
);
customSession.load();
export function App() {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: 300 }}></div>
      <UserBody baseURL={"http://localhost:63253"} />
    </div>
  );
}

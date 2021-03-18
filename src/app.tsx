import React from "react";
import { OrganizationBody } from "./modules/organizations/OrganizationScreen";

export function App() {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: 300 }}></div>
      <OrganizationBody baseURL={"http://192.168.100.3:63253"} />
    </div>
  );
}

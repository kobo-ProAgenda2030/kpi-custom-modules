import React from "react";
import { OrganizationBody } from "./modules/organizations/app/people_body";
import { OrganizationSideBar } from "./modules/organizations/app/people_side_bar";

export function App() {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: 300 }}>
        <OrganizationSideBar />
      </div>
      <OrganizationBody baseURL={"http://localhost:5000/dummy/dashboard"} />
    </div>
  );
}

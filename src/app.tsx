import React from "react";
import { ShinyMenu } from "./modules/shiny/ShinyMenu";
import { ShinyMain } from "./modules/shiny/ShinyMain";

export function App() {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: 300 }}>
        <ShinyMenu baseURL={"http://192.168.100.3:63253"} />
      </div>
      <ShinyMain shinyDashboardUrl={"http://localhost:3838"} />
    </div>
  );
}

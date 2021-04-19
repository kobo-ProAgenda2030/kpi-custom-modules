import React from "react";
import { dataController } from "../../controller/DataController";
import { ShinyAssets } from "../../models/KoboUser";
import { useBehaviorState } from "../../utils/useBehaviorState";
export const ShinyMain = ({
  shinyDashboardUrl,
}: {
  shinyDashboardUrl: string;
}) => {
  const selected = useBehaviorState<ShinyAssets | null>(
    dataController.shinySelected
  );
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
      }}
    >
      {selected && (
        <iframe
          style={{
            width: "100%",
            height: "calc(100vh - 10px)",
            // overflowY: "scroll",
            // padding: 20,
            // display: "table-row",
          }}
          src={shinyDashboardUrl + "/" + selected.path}
        ></iframe>
      )}
    </div>
  );
};

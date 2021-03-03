import { CircularProgress, Fab, LinearProgress } from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useBehaviorState } from "../../../utils/useBehaviorState";
import { PeopleData } from "../data/people_data";
import { Profile } from "../models/profile";
import { EnhancedTable } from "./table";
export const peopleData: PeopleData = new PeopleData();
export function PeopleBody({ baseURL }: { baseURL: string }) {
  console.log("PeopleBody");
  console.log(baseURL);
  const loading = useBehaviorState(peopleData.loading);
  const users: Profile[] = useBehaviorState(peopleData.users);
  useEffect(() => {
    peopleData.load(baseURL);
  }, [baseURL]);
  return (
    <div style={{ width: "calc(100% - 40px)", padding: 20 }}>
      {loading && users.length === 0 ? (
        <LinearProgress style={{ width: "100%" }} />
      ) : (
        <EnhancedTable />
      )}

      <Fab
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          background: "#259af4",
          color: "white",
        }}
        onClick={() => {
          peopleData.refresh();
        }}
      >
        {loading ? (
          <CircularProgress style={{ color: "white" }} />
        ) : (
          <Refresh />
        )}
      </Fab>
    </div>
  );
}

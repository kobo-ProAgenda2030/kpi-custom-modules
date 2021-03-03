import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { PostProfile } from "../models/profile";
import { FullScreenDialog } from "./modal";

export function PeopleSideBar() {
  const [editProfile, setEditProfile] = useState<PostProfile | null>(null);
  return (
    <div>
      <Button
        fullWidth
        variant="contained"
        style={{ background: "#259af4", color: "white" }}
        onClick={() => {
          setEditProfile({
            id: null,
            userName: "",
            password: "",
            name: "",
            formation: "",
            address: "",
            phone: "",
            professionals: 0,
            employes: 0,
            department: "",
            province: "",
            municipality: "",
            waterConnections: 0,
            connectionsWithMeter: 0,
            connectionsWithoutMeter: 0,
            publicPools: 0,
            latrines: 0,
            serviceContinuity: "",
          });
        }}
      >
        Nuevo
      </Button>

      <FullScreenDialog
        editProfile={editProfile}
        onClose={() => {
          setEditProfile(null);
        }}
      />
    </div>
  );
}

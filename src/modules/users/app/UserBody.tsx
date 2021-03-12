import { LinearProgress, Typography } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useBehaviorState } from "../../../utils/useBehaviorState";
import { OrganizationData } from "../data/organization_data";
import { EditUserProfileDialog } from "./UserEditModal";
import { UseExecuter } from "../../../utils/useExecuter";
import { KoboUser } from "../../../models/KoboUser";
import { CustomIcon } from "../../../utils/CustomIcon";
import React from "react";
export const organizationData: OrganizationData = new OrganizationData();
export function UserBody({ baseURL }: { baseURL: string }) {
  const { loading, executer, error } = UseExecuter();
  const organizations: KoboUser[] = useBehaviorState(organizationData.users);

  useEffect(() => {
    executer(async () => {
      await organizationData.load(baseURL);
    });
  }, [baseURL]);
  return (
    <div
      style={{
        width: "calc(100% - 40px)",
        height: "100%",
        overflowY: "scroll",
        padding: 20,
      }}
    >
      {loading ? (
        <LinearProgress style={{ width: "100%" }} />
      ) : organizations.length !== 0 ? (
        organizations.map((user, index) => (
          <OrganizationView key={index} organizations={user} />
        ))
      ) : (
        <div style={{ color: "red" }}>{error}</div>
      )}
    </div>
  );
}

const OrganizationView = ({
  organizations: organization,
}: {
  organizations: KoboUser;
}) => {
  const [open, setOpen] = useState<boolean>(true);
  const [editProfile, setEditProfile] = useState<KoboUser | null>(null);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: 50,
          display: "flex",
        }}
      >
        <div
          style={{
            background: "#259af4",
            borderRadius: 5,
            marginTop: 5,
            height: 45,
            display: "flex",
            flexGrow: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              flexGrow: 1,
            }}
          >
            <Typography
              style={{
                color: "white",
                display: "flex",
                flexGrow: 1,
                borderRadius: 5,
                alignItems: "center",
                paddingLeft: 10,
              }}
              onClick={() => {
                setOpen(!open);
              }}
            >
              {organization.username}
            </Typography>

            <div
              style={{
                backgroundColor: "white",
                width: 1,
                height: 15,
                marginTop: 15,
              }}
            ></div>

            <CustomIcon
              icon={<Edit />}
              onClick={() => {
                setEditProfile(organization);
              }}
            />
          </div>
        </div>
      </div>
      {editProfile !== null && (
        <EditUserProfileDialog
          koboUser={editProfile}
          onClose={() => {
            setEditProfile(null);
          }}
        />
      )}
    </div>
  );
};

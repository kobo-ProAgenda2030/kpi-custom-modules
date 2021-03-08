import { LinearProgress, Typography } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useBehaviorState } from "../../../utils/useBehaviorState";
import { OrganizationData } from "../data/organization_data";
import { EditUserProfileDialog } from "./UserEditModal";
import { UseExecuter } from "../../../utils/useExecuter";
import { KoboUser } from "../../../models/KoboUser";
import { CustomIcon } from "../../../utils/CustomIcon";
export const organizationData: OrganizationData = new OrganizationData();
export function UserBody({ baseURL }: { baseURL: string }) {
  const { loading, executer } = UseExecuter();
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
        padding: 20,
      }}
    >
      {loading ? (
        <LinearProgress style={{ width: "100%" }} />
      ) : organizations.length !== 0 ? (
        organizations.map((user) => (
          <OrganizationView organizations={user} flag={false} />
        ))
      ) : (
        <div>No hay organizaciones diponibles</div>
      )}
    </div>
  );
}

const OrganizationView = ({
  organizations: organization,
  flag,
}: {
  organizations: KoboUser;
  flag: boolean;
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
                // backgroundColor: organization.color,
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
          organization={editProfile}
          onClose={(cancelled) => {
            // if (!cancelled && editProfile.organizationId === undefined) {
            //   editProfile.organizationId = "";
            //   // organization.organizations.push(editProfile);
            // }
            setEditProfile(null);
          }}
        />
      )}
    </div>
  );
};

import { LinearProgress, Typography } from "@material-ui/core";
import { Add, Edit, KeyboardArrowUp } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useBehaviorState } from "../../../utils/useBehaviorState";
import { OrganizationData } from "../data/organization_data";
import { KeyboardArrowDown } from "@material-ui/icons";
import { FullScreenDialog } from "./OrganizationModal";
import { UseExecuter } from "../../../utils/useExecuter";
import { colorLum } from "../../../utils/ColorLum";
import { Organization } from "../../../models/Organization";
export const organizationData: OrganizationData = new OrganizationData();
export function OrganizationBody({ baseURL }: { baseURL: string }) {
  const { loading, executer, error } = UseExecuter();
  const organizations: Organization[] = useBehaviorState(
    organizationData.organizations
  );

  useEffect(() => {
    executer(async () => {
      await organizationData.load(baseURL);
    });
  }, [baseURL]);
  const organization = organizations.find(
    (value) => value.organizationId === "1"
  );
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
      ) : organization ? (
        <OrganizationView organizations={organization} flag={false} />
      ) : (
        <div style={{ color: "red" }}>{error}</div>
      )}
    </div>
  );
}

const OrganizationView = ({
  organizations: organization,
  flag,
}: {
  organizations: Organization;
  flag: boolean;
}) => {
  const [open, setOpen] = useState<boolean>(true);
  const [editProfile, setEditProfile] = useState<Organization | null>(null);
  const existOrganizations =
    organization.organizations && organization.organizations.length !== 0;

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
        <CustomArrowIcon flag={flag} />
        <div
          style={{
            background: "#259af4",
            borderRadius: 5,
            marginTop: 5,
            height: 45,
            display: "flex",
            flexGrow: 1,
            cursor: existOrganizations ? "pointer" : "initial",
          }}
        >
          {existOrganizations && (
            <>
              <div
                onClick={() => {
                  setOpen(!open);
                }}
              >
                <CustomIcon
                  icon={!open ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
                />
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  width: 1,
                  height: 45,
                }}
              ></div>
            </>
          )}
          <div
            style={{
              display: "flex",
              flexGrow: 1,
            }}
          >
            <Typography
              style={{
                color: colorLum(organization.color),
                display: "flex",
                backgroundColor: organization.color,
                flexGrow: 1,
                borderTopLeftRadius: existOrganizations ? 0 : 5,
                borderBottomLeftRadius: existOrganizations ? 0 : 5,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                alignItems: "center",
                paddingLeft: 10,
              }}
              onClick={() => {
                setOpen(!open);
              }}
            >
              {organization.name}
            </Typography>

            <CustomIcon
              icon={<Add />}
              onClick={() => {
                setEditProfile({
                  parentOrganizationId: organization.organizationId,
                  name: "",
                  color: "",
                  organizations: [],
                  members: [],
                });
              }}
            />
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
      {open && existOrganizations && (
        <div style={{ display: "flex" }}>
          <div
            style={{
              height: "auto",
              width: 50,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {flag && (
              <div
                style={{
                  height: "auto",
                  width: 5,
                  backgroundColor: "#787878",
                }}
              ></div>
            )}
          </div>
          <div
            style={{
              flexGrow: 1,
              backgroundColor: "rgba(166, 212, 221, 0.2)",
              borderRadius: 5,
              border: "solid",
              borderColor: "rgba(166, 212, 221, 0.5)",
              borderWidth: 1,
              paddingBottom: 10,
              paddingRight: 10,
            }}
          >
            {organization.organizations?.map((value, index) => {
              value.parentOrganizationId = organization.organizationId;
              return (
                <OrganizationView
                  key={index}
                  organizations={value}
                  flag={organization.organizations?.length !== index + 1}
                />
              );
            })}
          </div>
        </div>
      )}
      {editProfile !== null && (
        <FullScreenDialog
          organization={editProfile}
          onClose={() => {
            setEditProfile(null);
          }}
        />
      )}
    </div>
  );
};
const CustomArrowIcon = ({ flag = true }: { flag?: boolean }) => {
  return (
    <div style={{ width: 50 }}>
      <svg height="50" width="50">
        {flag && (
          <path
            fill="#787878"
            d="M22.5 0 L22.5 50 L27.5 50 L27.5 27.5 L40 27.5 L40 35 L50 25 L40 15 L 40 20 L27.5 20 L27.5 0 Z"
          />
        )}
        {!flag && (
          <path
            fill="#787878"
            d="M22.5 0 L22.5 27.5L40 27.5 L40 35 L50 25 L40 15 L 40 20 L27.5 20 L27.5 0 Z"
          />
        )}
      </svg>
    </div>
  );
};
const CustomIcon = ({
  onClick,
  icon,
}: {
  onClick?: () => void;
  icon: JSX.Element;
}) => {
  return (
    <div
      style={{
        width: 45,
        height: 45,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        fontSize: 30,
        color: "white",
      }}
      onClick={onClick}
    >
      {icon}
    </div>
  );
};

import { LinearProgress } from "@material-ui/core";
import { Add, Edit, KeyboardArrowUp } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useBehaviorState } from "../../../utils/useBehaviorState";
import { organization, OrganizationData } from "../data/organization_data";
import { Organization, Profile } from "../models/profile";
import { KeyboardArrowDown } from "@material-ui/icons";
export const peopleData: OrganizationData = new OrganizationData();
export function OrganizationBody({ baseURL }: { baseURL: string }) {
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
        <OrganizationView organizations={organization} flag={false} />
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
          onClick={() => {
            setOpen(!open);
          }}
        >
          {existOrganizations && (
            <>
              <CustomIcon
                icon={!open ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
              />
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
            <div
              style={{
                color: "white",
                display: "flex",
                flexGrow: 1,
                alignItems: "center",
                paddingLeft: 10,
              }}
            >
              {organization.name}
            </div>

            <CustomIcon icon={<Add />} />
            <div
              style={{
                backgroundColor: "white",
                width: 1,
                height: 15,
                marginTop: 15,
              }}
            ></div>

            <CustomIcon icon={<Edit />} />
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
            {organization.organizations?.map((value, index) => (
              <OrganizationView
                organizations={value}
                flag={organization.organizations?.length !== index + 1}
              />
            ))}
          </div>
        </div>
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

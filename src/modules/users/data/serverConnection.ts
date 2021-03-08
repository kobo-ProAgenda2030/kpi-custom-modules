// import Axios from "axios";
import axios, { AxiosInstance } from "axios";
import { KoboUser, Organization, OrganizationPost } from "./models";

export class ServerConnection {
  private instance: AxiosInstance = axios.create();
  load(baseUR: string) {
    this.instance = axios.create({
      baseURL: baseUR,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  async getKoboUsers(): Promise<KoboUser[]> {
    return koboUsers;
    const response = await this.instance.get("/KoboUser");
    return response.data;
  }
  async getOrganizations(): Promise<Organization[]> {
    return [organization];
    const response = await this.instance.get("/organizations");
    return response.data;
  }
  async updateCreateOrganization(body: OrganizationPost): Promise<void> {
    return;
    await this.instance.post("/organizations", JSON.stringify(body));
  }
}

const organization: Organization = {
  organizationId: "01",
  name: "ProAgenda 2030",
  color: "",
  organizations: [
    {
      organizationId: "01-01",
      name: "GAM 01",
      color: "",
      organizations: [
        {
          organizationId: "01-01-01",
          name: "CAPyS 01",
          color: "",
          organizations: [],
          members: [],
        },
        {
          organizationId: "01-01-02",
          name: "CAPyS 02",
          color: "",
          organizations: [],
          members: [],
        },
        {
          organizationId: "01-01-02",
          name: "CAPyS 03",
          color: "",
          organizations: [],
          members: [],
        },
      ],
      members: [],
    },
    {
      organizationId: "01-02",
      name: "GAM 00",
      color: "",
      organizations: [],
      members: [],
    },
    {
      organizationId: "01-02",
      name: "GAM 02",
      color: "",
      organizations: [
        {
          organizationId: "01-01",
          name: "CAPyS 01",
          color: "",
          organizations: [
            {
              organizationId: "01-01-01",
              name: "name 01-01-01",
              color: "",
              organizations: [],
              members: [],
            },
            {
              organizationId: "01-01-02",
              name: "name 01-01-02",
              color: "",
              organizations: [],
              members: [],
            },
            {
              organizationId: "01-01-02",
              name: "name 01-01-02",
              color: "",
              organizations: [],
              members: [],
            },
          ],
          members: [],
        },
      ],
      members: [],
    },
  ],
  members: [],
};
const koboUsers: KoboUser[] = [
  {
    id: "1",
    username: "username 1",
    roles: ["1", "2"],
    organizations: [
      {
        organizationId: "1",
        name: "string",
        color: "blue",
        profileId: "string",
      },
    ],
  },
  {
    id: "2",
    username: "username 2",
    roles: [],
    organizations: [],
  },
  {
    id: "3",
    username: "username 3",
    roles: [],
    organizations: [],
  },
  {
    id: "4",
    username: "username 4",
    roles: [],
    organizations: [],
  },
  {
    id: "5",
    username: "username 5",
    roles: [],
    organizations: [],
  },
  {
    id: "6",
    username: "username 6",
    roles: [],
    organizations: [],
  },
  {
    id: "7",
    username: "username 7",
    roles: [],
    organizations: [],
  },
  {
    id: "8",
    username: "username 8",
    roles: [],
    organizations: [],
  },
  {
    id: "9",
    username: "username 9",
    roles: [],
    organizations: [],
  },
  {
    id: "10",
    username: "username 10",
    roles: [],
    organizations: [],
  },
];

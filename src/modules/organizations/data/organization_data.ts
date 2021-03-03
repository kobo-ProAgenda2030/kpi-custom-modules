import { BehaviorSubject } from "rxjs";
import { Organization, PostProfile, Profile } from "../models/profile";
import { PeopleServerConnection } from "./serverConnection";

export class OrganizationData {
  users: BehaviorSubject<Profile[]> = new BehaviorSubject<Profile[]>([]);
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  server: PeopleServerConnection = new PeopleServerConnection();
  async load(baseURL: string) {
    await this.server.load(baseURL);
    await this.refresh();
  }
  async refresh() {
    this.loading.next(true);
    // await sleep(5000)
    const response: Profile[] = await this.server.getUsers().catch((error) => {
      console.log(error);
      return [];
    });
    this.users.next(response);
    this.loading.next(false);
  }
  async postProfile(profile: PostProfile) {
    this.loading.next(true);
    // await sleep(5000)
    await this.server.postUser(profile).catch((error) => {
      this.loading.next(false);
      throw error;
    });
    this.loading.next(false);
  }
}

// function sleep(millis: number) {
//   return new Promise((resolve) => setTimeout(resolve, millis));
// }

export const organization: Organization = {
  id: "01",
  name: "ProAgenda 2030",
  organizations: [
    {
      id: "01-01",
      name: "GAM 01",
      organizations: [
        {
          id: "01-01-01",
          name: "CAPyS 01",
          organizations: [],
        },
        {
          id: "01-01-02",
          name: "CAPyS 02",
          organizations: [],
        },
        {
          id: "01-01-02",
          name: "CAPyS 03",
          organizations: [],
        },
      ],
    },
    {
      id: "01-02",
      name: "GAM 00",
      organizations: [],
    },
    {
      id: "01-02",
      name: "GAM 02",
      organizations: [
        {
          id: "01-01",
          name: "CAPyS 01",
          organizations: [
            {
              id: "01-01-01",
              name: "name 01-01-01",
              organizations: [],
            },
            {
              id: "01-01-02",
              name: "name 01-01-02",
              organizations: [],
            },
            {
              id: "01-01-02",
              name: "name 01-01-02",
              organizations: [],
            },
          ],
        },
      ],
    },
  ],
};

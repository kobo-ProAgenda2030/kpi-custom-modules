import { BehaviorSubject } from "rxjs";
import { KoboUser } from "../../../models/KoboUser";
import { Organization, OrganizationPost } from "./models";
import { ServerConnection } from "./serverConnection";

export class OrganizationData {
  users: BehaviorSubject<KoboUser[]> = new BehaviorSubject<KoboUser[]>([]);
  organizations: BehaviorSubject<Organization[]> = new BehaviorSubject<
    Organization[]
  >([]);
  server: ServerConnection = new ServerConnection();
  async load(baseURL: string) {
    await this.server.load(baseURL);
    await this.loadData();
  }
  async loadData() {
    await this.loadKoboUsers();
    await this.loadOrganizations();
  }
  async loadKoboUsers() {
    await sleep(100);
    const response: KoboUser[] = await this.server.getKoboUsers();
    this.users.next(response);
  }
  async loadOrganizations() {
    await sleep(100);
    const response: Organization[] = await this.server.getOrganizations();
    this.organizations.next(response);
  }
  async updateCreateOrganization(body: OrganizationPost) {
    await sleep(2000);
    // throw Error("Custom error");
    await this.server.updateCreateOrganization(body);
  }
}

function sleep(millis: number) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}

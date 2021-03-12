import { BehaviorSubject } from "rxjs";
import { KoboUser } from "../../../models/KoboUser";
import { Organization } from "../../../models/Organization";
import { Services } from "./../../../service/services";

export class OrganizationData {
  users: BehaviorSubject<KoboUser[]> = new BehaviorSubject<KoboUser[]>([]);
  organizations: BehaviorSubject<Organization[]> = new BehaviorSubject<
    Organization[]
  >([]);
  server: Services = new Services();
  async load(baseURL: string) {
    await this.server.load(baseURL);
    await this.loadData();
  }
  async loadData() {
    await this.loadKoboUsers();
    await this.loadOrganizations();
  }
  async loadKoboUsers() {
    const response: KoboUser[] = await this.server.getAllKoboUsers();
    this.users.next(response);
  }
  async loadOrganizations() {
    const response: Organization[] = await this.server.getAllOrganizations();
    this.organizations.next(response);
  }
}

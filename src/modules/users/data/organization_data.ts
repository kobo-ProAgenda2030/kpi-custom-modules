import { BehaviorSubject } from "rxjs";
import { KoboUser } from "../../../models/KoboUser";
import { Organization, OrganizationPost } from "../../../models/Organization";
import { UserRole } from "../../../models/UserRole";
import { Services } from "../../../service/services";

export class OrganizationData {
  users: BehaviorSubject<KoboUser[]> = new BehaviorSubject<KoboUser[]>([]);
  userRoles: BehaviorSubject<UserRole[]> = new BehaviorSubject<UserRole[]>([]);
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
    await this.loadRoles();
  }
  async loadKoboUsers() {
    const response: KoboUser[] = await this.server.getAllKoboUsers();
    this.users.next(response);
  }
  async loadOrganizations() {
    const response: Organization[] = await this.server.getAllOrganizations();
    this.organizations.next(response);
  }
  async loadRoles() {
    const response: UserRole[] = await this.server.getAllRoles();
    this.userRoles.next(response);
  }
  async updateCreateOrganization(body: OrganizationPost) {
    await this.server.updateCreateOrganization(body);
  }
}

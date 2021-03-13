import { BehaviorSubject } from "rxjs";
import { KoboUser } from "../models/KoboUser";
import { Organization } from "../models/Organization";
import { UserRole } from "../models/UserRole";
import { Services } from "../service/services";
import { CustomSession } from "../session/CustomSession";

export class DataController {
  users = new BehaviorSubject<KoboUser[]>([]);
  userRoles = new BehaviorSubject<UserRole[]>([]);
  organizations = new BehaviorSubject<Organization[]>([]);
  server: Services = new Services();
  session: CustomSession = new CustomSession();
  async load(baseURL: string) {
    await this.server.load(baseURL);
    await this.session.load(this.server);
    await this.loadData();
  }
  async loadData() {
    await this.loadKoboUsers();
    await this.loadOrganizations();
    await this.loadRoles();
  }
  async loadKoboUsers() {
    const response: KoboUser[] = await this.server.getAllKoboUsers();
    const users = response.filter((value) => {
      return value.id !== this.session.koboUserId;
    });
    this.users.next(users);
  }
  async loadOrganizations() {
    const response: Organization[] = await this.server.getAllOrganizations();
    const organizations = response.filter(
      (value) =>
        this.session.organizations.indexOf(value.organizationId || "") >= 0
    );
    this.organizations.next(organizations);
  }
  async loadRoles() {
    const response: UserRole[] = await this.server.getAllRoles();
    this.userRoles.next(response);
  }
}
export const dataController: DataController = new DataController();

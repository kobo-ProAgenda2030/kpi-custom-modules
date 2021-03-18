import { KoboUser, KoboUserPost, KoboUserResource } from "../models/KoboUser";
import { Organization, OrganizationPost } from "../models/Organization";
import { PostProfile, Profile } from "../models/Profile";
import { UserRole } from "../models/UserRole";
import { ServerConnection } from "./serverConnection";

export class Services {
  private serverConnection = new ServerConnection("");
  load(baseURL: string) {
    this.serverConnection = new ServerConnection(baseURL);
  }
  //User management
  async getAllKoboUsers(): Promise<KoboUser[]> {
    const response: KoboUser[] = await this.serverConnection.get<KoboUser[]>(
      "/KoboUser"
    );
    response.sort((a, b) => a.username.localeCompare(b.username));
    return response.filter((value) => value.id !== "-1");
  }
  async getKoboUserResources(): Promise<KoboUserResource> {
    return this.serverConnection.get<KoboUserResource>(
      "/koboUser/userResources"
    );
  }
  async updateKoboUser(body: KoboUserPost): Promise<void> {
    await this.serverConnection.post("/KoboUser", body);
  }
  //Organization management
  async getAllOrganizations(): Promise<Organization[]> {
    const response: Organization[] = await this.serverConnection.get<
      Organization[]
    >("/Organization/All");
    sortOrganizations(response);
    return response;
  }
  async updateCreateOrganization(
    body: OrganizationPost
  ): Promise<{ organizationId: string }> {
    return this.serverConnection.post<{ organizationId: string }>(
      "/Organization/Update",
      body
    );
  }
  async deleteOrganization(id: string): Promise<void> {
    await this.serverConnection.get<KoboUser[]>(
      `/Organization/Delete?organizationId=${id}`
    );
  }
  //role management
  async getAllRoles(): Promise<UserRole[]> {
    const roles: UserRole[] = await this.serverConnection.get<UserRole[]>(
      "/Role/All"
    );
    roles.sort((a, b) => a.name.localeCompare(b.name));
    return roles;
  }
  //Profile management
  async getAllProfiles(): Promise<Profile[]> {
    return this.serverConnection.get<Profile[]>("/Profile/All");
  }
  async updateCreateProfile(body: PostProfile): Promise<{ profileId: string }> {
    return this.serverConnection.post<{ profileId: string }>(
      "/Profile/Update",
      body
    );
  }
  async getProfile(id: string): Promise<Profile> {
    return this.serverConnection.get<Profile>(`/Profile/Get?profileId=${id}`);
  }
}
export const services = new Services();
function sortOrganizations(organizations: Organization[]) {
  organizations.sort((a, b) => a.name.localeCompare(b.name));
  organizations.forEach((organization) =>
    sortOrganizations(organization.organizations)
  );
}

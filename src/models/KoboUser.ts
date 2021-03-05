export interface KoboUser {
  id: string;
  username: string;
  roles: string[];
  organizations: KoboUserOrganization[];
}
export interface KoboUserOrganization {
  organizationId: string;
  name: string;
  color: string;
  profileId: string;
}

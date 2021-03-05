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
export interface Organization {
  organizationId?: string;
  parentOrganizationId?: string;
  name: string;
  color: string;
  profileId?: string;
  organizations: Organization[];
  members: string[];
}
export interface OrganizationPost {
  organizationId?: string;
  parentOrganizationId?: string;
  name: string;
  color: string;
  profileId?: string;
  members: string[];
}

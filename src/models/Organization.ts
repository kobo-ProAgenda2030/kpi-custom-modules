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
  members: string[];
}

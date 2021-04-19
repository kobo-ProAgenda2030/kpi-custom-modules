export interface KoboUser {
  id: string;
  username: string;
  roles: string[];
  organizations: KoboUserOrganization[];
}
export interface KoboUserResource {
  koboUserId: string;
  roles: string[];
  assets: {
    name: string;
    path: string;
    type: string;
  }[];
  organizations: KoboUserOrganization[];
}

export interface KoboUserOrganization {
  organizationId: string;
  name: string;
  color: string;
  profileId: string;
}

export interface KoboUserPost {
  id: string;
  roles: string[];
  organizations: string[];
}
export interface ShinyAssets {
  name: string;
  path: string;
  type: string;
}

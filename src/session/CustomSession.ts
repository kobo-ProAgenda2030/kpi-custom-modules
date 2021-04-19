import { KoboUserResource, ShinyAssets } from "../models/KoboUser";
import { Services } from "../service/services";

export class CustomSession {
  assets: string[] = [];
  roles: string[] = [];
  shinyAssets: ShinyAssets[] = [];
  koboUserId = "";
  organizations: string[] = [];
  async load(server: Services): Promise<void> {
    const koboUserResource: KoboUserResource | null = await server
      .getKoboUserResources()
      .catch(() => {
        fetch(
          `${window.location.protocol}//${window.location.host}/api-auth/logout/`
        ).then(() => {
          if (localStorage.getItem("sessionToken") !== null) {
            localStorage.removeItem("sessionToken");
            window.location.href = `${window.location.protocol}//${window.location.host}`;
          }
        });
        return null;
      });
    if (koboUserResource !== null) {
      this.roles = koboUserResource.roles;
      this.shinyAssets = koboUserResource.assets.filter(
        (value) => value.type === "shiny"
      );
      this.assets = koboUserResource.assets.map((value) => value.name);
      if (this.shinyAssets.length > 0) this.assets.push("shiny_dashboard");
      this.organizations = koboUserResource.organizations.map(
        (value) => value.organizationId
      );
      this.koboUserId = `${koboUserResource.koboUserId}`;
    }
  }
  hasAccess(asset: string): boolean {
    return this.assets.indexOf(asset) >= 0;
  }
}
export const customSessionInstance = new CustomSession();

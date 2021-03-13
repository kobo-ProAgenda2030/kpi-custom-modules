import { KoboUserResource } from "../models/KoboUser";
import { Services } from "../service/services";

export class CustomSession {
  assets: string[] = [];
  koboUserId = "";
  organizations: string[] = [];
  async load(server: Services): Promise<void> {
    const koboUserResource: KoboUserResource = await server.getKoboUserResources();
    this.assets = koboUserResource.assets.map((value) => value.name);
    this.organizations = koboUserResource.organizations.map(
      (value) => value.organizationId
    );
  }
  hasAccess(asset: string): boolean {
    return this.assets.indexOf(asset) >= 0;
  }
}

import { KoboUserResource } from "../models/KoboUser";
import { ServerConnection } from "../service/serverConnection";
import { services } from "../service/services";

class CustomSession {
  assets: string[] = [];
  async load(): Promise<void> {
    const koboUserResource: KoboUserResource = await services.getKoboUserResources();
    this.assets = koboUserResource.assets.map((value) => value.name);
  }
  hasAccess(asset: string): boolean {
    return this.assets.indexOf(asset) >= 0;
  }
}

export const serverConnection = new ServerConnection("http://localhost:63253");
export const customSession: CustomSession = new CustomSession();

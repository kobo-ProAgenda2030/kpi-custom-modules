import { KoboUserResource } from "../models/KoboUser";
import { Services } from "../service/services";

export class CustomSession {
  server: Services = new Services();
  assets: string[] = [];
  constructor(baseURL: string) {
    this.server.load(baseURL);
  }
  async load(): Promise<void> {
    const koboUserResource: KoboUserResource = await this.server.getKoboUserResources();
    this.assets = koboUserResource.assets.map((value) => value.name);
  }
  hasAccess(asset: string): boolean {
    return this.assets.indexOf(asset) >= 0;
  }
}

import { ServerConnection } from "../service/serverConnection";

class DataManager {
  server: ServerConnection = new ServerConnection();
  async load(baseURL: string) {
    await this.server.load(baseURL);
  }
}
export const data = new DataManager();

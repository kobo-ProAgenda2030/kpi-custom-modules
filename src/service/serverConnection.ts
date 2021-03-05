import axios, { AxiosInstance } from "axios";
import { KoboUser } from "../models/KoboUser";
import { Organization } from "../models/Organization";

export class ServerConnection {
  private instance: AxiosInstance = axios.create();
  load(baseUR: string) {
    this.instance = axios.create({
      baseURL: baseUR,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  async getKoboUsers(): Promise<KoboUser[]> {
    const response = await this.instance.get("/kobo-users");
    return response.data;
  }
  async getOrganizations(): Promise<Organization[]> {
    const response = await this.instance.get("/organizations");
    return response.data;
  }
}

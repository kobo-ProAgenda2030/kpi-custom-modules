import axios, { AxiosInstance } from "axios";

export class ServerConnection {
  private instance: AxiosInstance;
  constructor(baseURL: string) {
    const token = localStorage.getItem("sessionToken");
    this.instance = axios.create({
      baseURL: baseURL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
  async get<T>(url: string): Promise<T> {
    const response = await this.instance.get(url);
    // await sleep(1000);
    return response.data;
  }
  async post<T>(url: string, body: any): Promise<T> {
    const response = await this.instance.post(url, JSON.stringify(body));
    // await sleep(1000);
    return response.data;
  }
}
// function sleep(millis: number) {
//   return new Promise((resolve) => setTimeout(resolve, millis));
// }

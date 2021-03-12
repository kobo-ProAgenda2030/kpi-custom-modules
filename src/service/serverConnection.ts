import axios, { AxiosInstance } from "axios";

export class ServerConnection {
  private instance: AxiosInstance;
  constructor(baseURL: string) {
    const token = localStorage.getItem("sessionToken");
    this.instance = axios.create({
      baseURL: baseURL,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJzdXBlcl9hZG1pbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdXNlcmRhdGEiOiIwNGNhOTczMGU0NTlmZjYyNTg4OTgyZmM5M2EwZTdlMTFkNjVkNzc0IiwibmJmIjoxNjE1MzE5MzQ5LCJleHAiOjE2MTc5MTEzNDksImlhdCI6MTYxNTMxOTM0OX0.znF2vGifK5HWADN0FNIBj_M5v0TZARpThKK6jCQY8vJhFWczmrCtlIE-_lgd5gmeAZSf0LzoqZy3-L5cITFsNA",
      },
    });
  }
  async get<T>(url: string): Promise<T> {
    const response = await this.instance.get(url);
    await sleep(2000);
    return response.data;
  }
  async post<T>(url: string, body: any): Promise<T> {
    const response = await this.instance.post(url, JSON.stringify(body));
    await sleep(2000);
    return response.data;
  }
}
export const serverConnection = new ServerConnection("http://localhost:63253");
function sleep(millis: number) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}

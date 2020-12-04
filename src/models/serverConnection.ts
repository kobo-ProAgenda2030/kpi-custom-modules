
import axios, { AxiosInstance } from 'axios'
import { Survey } from "./survey";
import { User } from "./user";
import { Raw } from "./raw";

export class ServerConnection {
     private instance: AxiosInstance
     constructor(baseUR: string) {
          this.instance = axios.create({
               baseURL: baseUR,
          });
     }
     async getMe(): Promise<User> {
          console.log("getMe")
          const response = await this.instance.get('/me')
          return response.data
     }
     async getSurveys(): Promise<Survey> {
          console.log("getSurveys")
          const response = await this.instance.get('/api/v2/assets/?q=asset_type%3Asurvey&limit=200&format=json')
          return response.data
     }
     async getRaw(uid: string): Promise<Raw> {
          console.log("getRaw")
          const response = await this.instance.get(`/api/v2/assets/${uid}/data/?limit=30&start=0&sort={%22_id%22:-1}&format=json`)
          return response.data
     }
}
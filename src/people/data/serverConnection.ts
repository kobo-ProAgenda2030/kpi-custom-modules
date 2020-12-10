
import Axios from 'axios';
import axios, { AxiosInstance } from 'axios'
import { PostProfile, Profile } from '../models/profile';

export class PeopleServerConnection {
     private instance: AxiosInstance=axios.create()
     // constructor(baseUR: string) {
     //      this.instance = axios.create({
     //           baseURL: baseUR,
     //           headers: {
     //                "Content-Type": "application/json"
     //           }
     //      });
     // }
     load(baseUR: string) {
          this.instance = axios.create({
               baseURL: baseUR,
               headers: {
                    "Content-Type": "application/json"
               }
          });
     }
     async getUsers(): Promise<Profile[]> {
          console.log("getUsers")
          const response = await this.instance.get('/users')
          return response.data
     }
     async postUser(body: PostProfile): Promise<any> {
          console.log("postUser")
          const response = await this.instance.post('/user', JSON.stringify(body))
          return response.data
     }
}
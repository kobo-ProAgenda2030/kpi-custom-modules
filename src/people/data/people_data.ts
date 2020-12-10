import { BehaviorSubject } from "rxjs";
import { PostProfile, Profile } from "../models/profile";
import { PeopleServerConnection } from "./serverConnection";

export class PeopleData {
    users: BehaviorSubject<Profile[]> = new BehaviorSubject<Profile[]>([])
    loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
    server: PeopleServerConnection = new PeopleServerConnection()
    async load(baseURL: string) {
        await this.server.load(baseURL)
        await this.refresh()
    }
    async refresh() {
        this.loading.next(true)
        // await sleep(5000)
        const response: Profile[] = await this.server.getUsers().catch(error => {
            console.log(error)
            return []
        })
        this.users.next(response)
        this.loading.next(false)
    }
    async postProfile(profile: PostProfile) {
        this.loading.next(true)
        await sleep(5000)
        await this.server.postUser(profile).catch(error => {
            this.loading.next(false)
            throw error
        })
        this.loading.next(false)
    }
}

function sleep(millis: number) {
    return new Promise(resolve => setTimeout(resolve, millis));
}
import { Kurs } from "./kurs.model";

export interface UserExtended {
    name: string,
    email: string, 
    password: string,
    kurse: Kurs[],
    rolle: string
}
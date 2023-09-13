import { UserRolle } from "../enums/userRollen.enum";
import { Kurs } from "./kurs.model";
import { Rolle } from "./rolle.model";

export interface UserExtended {
    name: string,
    email: string, 
    password: string,
    kurse: Kurs[],
    rolle: string
}
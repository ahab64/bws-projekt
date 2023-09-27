import { User } from "./user.model";

export interface PendingUser extends User
{
    user_id: number
    email: string,
    status: string;
}
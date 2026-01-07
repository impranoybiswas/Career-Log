import { ObjectId } from "mongodb";

export interface Job {
    _id?: ObjectId,
    company: string,
    position: string,
    location: string,
    description: string,
    status: string
    createdAt?: string
}
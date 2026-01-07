import { ObjectId } from "mongodb";

export interface User {
  _id?: ObjectId;
  name: string;
  email: string;
  mobile: string;
  gender: string;
  links: { name: string; link: string }[];
  password: string;
  createdAt: Date;
}

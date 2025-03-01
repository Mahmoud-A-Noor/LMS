import { UserType } from "@/enums/UserEnum";

export interface User {
    id: string;
    username: string;
    email: string;
    role: UserType;
    imageUrl: string | null
  }
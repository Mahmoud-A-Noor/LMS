
export interface User {
    id: string;
    username: string;
    email: string;
    role: 'admin' | 'user';
    imageUrl: string | null
  }
import { User } from "@/types/user";
import { serverApi } from "@/utils/serverApi";


const useUser = async (): Promise<User | null> => {
  try {
    const userResponse = await serverApi('/users/me', 'GET');
    const user = userResponse?.response?.data as User;
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

export default useUser;

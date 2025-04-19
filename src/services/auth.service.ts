import { loginType, signupType } from '@/@types/auth';
import http from '@/utils/http/http.utils';

class AuthService {
  /**
   * FETCH PROFILE
   * */
  static async fetchProfile() {
    const response = await http().get('api/profile');
    return response.data;
  }

  /**
   * SIGN UP
   * @param data
   * */
  static async register(data: signupType) {
    const response = await http().post('api/register', JSON.stringify(data));
    return response.data;
  }

  /**
   * LOGIN
   * @param credentials
   * */
  static async login(credentials: loginType) {
    return http().post('api/login', JSON.stringify(credentials));
  }

  /**
   * LOGOUT METHOD
   * */
  static logout(): Promise<void> {
    return http().post('api/logout');
  }

  /**
   * REFRESH TOKEN
   * */
  static refreshToken(): Promise<void> {
    return http().post('api/refresh-token');
  }
}

export default AuthService;

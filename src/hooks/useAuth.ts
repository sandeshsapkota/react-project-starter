import { useDispatch } from 'react-redux';
import {useNavigate} from "react-router";

import authSlice, {
  loginFailure,
  loginStart,
  loginSuccess,
  setUser,
  invalidToken,
} from '@/store/slices/auth.slice';

import { loginType, signupType } from '@/@types/auth';
import AuthService from '@/services/auth.service';
import useStore from '@/hooks/useStore';
import notify from '@/utils/helpers/notification.utils';

const useAuth = () => {
  const navigate = useNavigate()
  /**
   * REDUX HOOK
   * */
  const dispatch = useDispatch();

  /**
   * REDUX STORE
   * */
  const { user, token, authenticated, authenticating, signing } =
    useStore('auth');

  /**
   * REGISTER METHOD
   * @param data
   * */
  const register = async (data: signupType) => AuthService.register(data);

  /**
   * LOGIN METHOD
   * @param credentials
   * */
  const login = async (credentials: loginType) => {
    dispatch(loginStart());
    try {
      const response: any = await AuthService.login(credentials);
      dispatch(loginSuccess(response.data));

      if (response?.data?.refreshToken) {
        document.cookie = `refreshToken=${response.data.refreshToken}; path=/; secure; samesite=strict`;
      }
    } catch (e: any) {
      dispatch(loginFailure(e));
      notify('Something went wrong.', 'error');
    }
  };

  /**
   * LOGOUT METHOD
   * */
  const logout = async () => {
    try {
      const response: any = await AuthService.logout();
      if (response.data.ok) {
        dispatch(authSlice.actions.logout());
      }
    } catch (e: any) {
      notify('Something went wrong .', 'error');
    }
  };

  /*
  * REFRESH TOKEN
  * */
  const refreshToken = async () => {
    try {
      const response: any = await AuthService.refreshToken();
      dispatch(loginSuccess(response.data));
    } catch (e: any) {
      dispatch(invalidToken());
      navigate('/login')
    }
  };

  /**
   * FETCH PROFILE METHOD
   * */
  const fetchProfile = async () => {
    try {
      const response = await AuthService.fetchProfile();
      dispatch(setUser(response));
    } catch (e: any) {
      if (e?.response?.data?.error === 'invalid_token') {
        refreshToken();
      } else {
        dispatch(invalidToken());
      }
    }
  };

  return {
    user,
    token,
    signing,
    authenticated,
    authenticating,
    register,
    login,
    logout,
    fetchProfile,
  };
};

export default useAuth;

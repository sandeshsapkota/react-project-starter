import { FC, PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '@/hooks/useAuth';
import AuthGuard from '@/hoc/auth-guard';
import {clearToken} from "@/utils/helpers/token.utils";

/**
 * Component that restricts access to its children based on user authentication status.
 * @param props - Props passed to the Protected component.
 * @returns Rendered children if authenticated, otherwise null.
 */

const Protected: FC<PropsWithChildren> = (props) => {
  const navigate = useNavigate();
  /*
   * STATE AND PROPS
   * */
  const { children } = props;
  const { token, fetchProfile, authenticated } = useAuth();

  /*
   * Fetch user profile if token exists, otherwise navigate to the homepage.
   */
  useEffect(() => {
    token ? fetchProfile() : navigate('/login');
    if(!token) {
      clearToken()
    }
  }, [token]);

  return authenticated ? <AuthGuard>{children}</AuthGuard> : null;
};

export default Protected;

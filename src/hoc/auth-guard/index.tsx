import { FC, PropsWithChildren, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router';
import UnAuthorized from '@/components/un-authorized';
import useAuth from '@/hooks/useAuth';
import { RolesType } from '@/@types/auth';
import { AUTH_GUARDS } from '@/utils/constants/auth';

/**
 * Determines whether a user with a certain role can access a specific path.
 * @param role - User's role.
 * @param pathName - Path to check access for.
 * @returns Whether the user with the given role can access the path.
 */
const canSee = (role: RolesType, pathName: string) =>
  AUTH_GUARDS[role].includes(pathName);

/**
 * Component that guards access to certain routes or components based on user's role.
 * @param props - Props passed to the AuthGuard component.
 * @returns Rendered component or UnAuthorized component if access is denied.
 */
const AuthGuard: FC<PropsWithChildren> = (props) => {
  /*
   * STATE AND PROPS
   * */
  const { children } = props;

  const { user } = useAuth();
  const [authorized, setAuthorized] = useState(false);
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if (user) {
      if (user?.role && canSee(user.role, pathname)) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
    }
  }, [pathname, user]);

  return authorized ? children : <UnAuthorized />;
};

export default AuthGuard;

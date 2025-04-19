import { RolesType } from '@/@types/auth';
import { ADMIN_HOME_PAGE } from '@/utils/constants/common';

type PermissionTypes<T> = { [key in T & string]: string[] };

export const AUTH_GUARDS: PermissionTypes<RolesType> = {
  admin: [ADMIN_HOME_PAGE, '/reports'],
  developer: ['/dashboard'],
  manager: [],
};

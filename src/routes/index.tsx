import { ReactNode } from 'react';
import Dashboard from '@/pages/dashboard';
import Register from '@/pages/register';
import Login from '@/pages/login';
import ForgotPassword from '@/pages/forget-password';
import { ADMIN_HOME_PAGE } from '@/utils/constants/common';
import { AdminLayout, FrontLayout } from '@/components';
import Reports from '@/pages/reports';
import Home from '@/pages/home';
import UnAuthorized from '@/components/un-authorized';

/*
 * Higher Order Component (HOC) to wrap a component with AdminLayout.
 * @param {ReactNode} component - The component to be wrapped.
 * @returns {ReactNode} - The component wrapped with AdminLayout.
 */
const withAdminLayout = (component: ReactNode) => (
  <AdminLayout>{component}</AdminLayout>
);

const withFrontLayout = (component: ReactNode) => (
  <FrontLayout>{component}</FrontLayout>
);

/*
 * Application route list.
 * Before adding a new route, check if it requires a particular layout.
 * e.g. wrap the element with the layout HOC
 */
const routes = [
  {
    path: '/',
    element: withFrontLayout(<Home />),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: ADMIN_HOME_PAGE,
    element: withAdminLayout(<Dashboard />),
  },
  {
    path: '/reports',
    element: withAdminLayout(<Reports />),
  },
  {
    path: '/unauthorized',
    element: <UnAuthorized />,
  },
];

export default routes;

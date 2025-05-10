import { ReactNode, lazy } from 'react';
import { ADMIN_HOME_PAGE } from '@/utils/constants/common';
import { AdminLayout, FrontLayout } from '@/components';

import Home from "@/pages/home"
const UnAuthorized = lazy(() => import('@/components/un-authorized'));
const Dashboard = lazy(() => import('@/pages/dashboard'));
const Register = lazy(() => import('@/pages/register'));
const Login = lazy(() => import('@/pages/login'));
const ForgotPassword = lazy(() => import('@/pages/forget-password'));
const Reports = lazy(() => import('@/pages/reports'));

export const RouteLoadingComponent = () => <div>LOADING</div>;

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

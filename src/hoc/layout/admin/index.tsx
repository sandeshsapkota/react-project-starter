import { ReactNode } from 'react';

import Protected from '@/hoc/protected';
import AdminHeader from '@/components/header/AdminHeader';

const AdminLayout = ({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) => {
  return (
    <Protected>
      <title>{title ? `${title} | app name` : 'app name'}</title>
      <AdminHeader />
      <main>{children}</main>
    </Protected>
  );
};

export default AdminLayout;

import { Link } from 'react-router-dom';
import Logo from '@/components/logo';

const Header = () => {
  return (
    <header className="p-4 bg-gray-100 flex justify-between">
      <Logo />
      <div className="flex gap-4 items-center">
        <div className="flex gap-2">
          <Link to="/" className="text-blue-500">
            Home
          </Link>
          <Link to="/dashboard" className="text-blue-500">
            Dashboard
          </Link>
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

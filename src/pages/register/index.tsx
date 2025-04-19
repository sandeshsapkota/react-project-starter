import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router';
import useAuth from '@/hooks/useAuth';
import { LoginSignUpFormWrapper } from '@/components';
import {ADMIN_HOME_PAGE} from "@/utils/constants/common";

const Index = () => {
  /*
   * STATE
   * */
  const { register, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(token){
      navigate(ADMIN_HOME_PAGE)
    }
  }, []);

  /*
   * REDIRECT
   * */

  const [username, setUsername] = useState('sora@gmail.com');
  const [password, setPassword] = useState('password');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response: any = await register({
        username,
        password,
        confirm_password: password,
      });
      if (response && response?.ok) {
        navigate('/login');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <LoginSignUpFormWrapper title="Create your account">
      <form onSubmit={handleSubmit} className="grid gap-8">
        <div className="grid gap-6">
          <div>
            <label htmlFor="username" className="text-sm">
              Username
            </label>
            <input
              className="bg-[#f9fafb] text-gray-900 sm:text-sm rounded block w-full px-3 py-2 border !border-gray-200 border-solid"
              type="text"
              value={username}
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              className="bg-[#f9fafb] text-gray-900 sm:text-sm rounded block w-full px-3 py-2 border !border-gray-200 border-solid"
              type="email"
              value={username}
              id="email"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <input
              className="bg-[#f9fafb] text-gray-900 sm:text-sm rounded block w-full px-3 py-2 border !border-gray-200 border-solid"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800"
        >
          Sign up
        </button>
        <Link
          to="/"
          className="w-full text-black border border-solid border-blue hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-800"
        >
          Cancel
        </Link>
      </form>
    </LoginSignUpFormWrapper>
  );
};

export default Index;

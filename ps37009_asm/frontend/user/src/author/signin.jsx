
import React, { useState, useEffect, useContext} from 'react'
import SignInGoogle from './signingoogle'
import { notification } from 'antd';
import api from '/src/api';
import LoaDing from '../components/loading';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { UserContext } from '/src/context/logincontext';

export default function SignIn() {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [typePass, setTypePass] = useState('password');
    const { updateUser } = useContext(UserContext);

    const submit = () => {
      let warning = null;
      const reGexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!warning && !reGexEmail.test(email)) {
        warning = 'Email không hợp lệ';
      }
      if(!warning && !password) {
        warning = 'Vui lòng nhập mật khẩu';
      }

      if(warning) {
        notification.warning({
          message: warning,
        });
        return;
      }

      const datareq = {
        email,
        password
      }

      const url = '/signin';

      const fetch = async () => {
        setLoader(true);
        try {
          const response = await api.post(url, datareq);
          const data = response.data;
          const token = data.access_token;
          const user = jwtDecode(token);
          const infoUser = {
            token,
            user
          }
          localStorage.setItem('userInfo', JSON.stringify(infoUser));
          notification.success({
            message: 'Đăng nhập thành công',
          });
          updateUser(user);
          navigate('/');
          console.log('User: ', user);
        } catch (error) {
          console.error('Failed to fetch data: ', error);
          const message = error.response.data.error || error.response.data.message;
          notification.error({
            message: message,
          });
        }
        setLoader(false);
      };
      fetch();
    };

    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-1 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Đăng nhập vào tài khoản
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={e=> setEmail(e.target.value)}
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                    Mật khẩu
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Quên mật khẩu?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type={typePass}
                    required
                    value={password}
                    onChange={e=> setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className='mt-2 flex gap-3'>
                            <input type="checkbox" id='showpass' onChange={e=> { e.target.checked ? setTypePass('text') : setTypePass('password') }} />
                            <label htmlFor="showpass">Hiển thị mật khẩu</label>
                </div>
  
              <div>
                <button
                  type="button"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={submit}
                >
                    Đăng nhập
                </button>
              </div>
            </form>
  
           <div className='mt-4'>
                <SignInGoogle />
           </div>
          </div>
        </div>
        <LoaDing loader={loader} />
      </>
    )
  }
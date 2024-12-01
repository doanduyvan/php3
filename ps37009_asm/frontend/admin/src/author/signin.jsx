
import React from 'react'
import SignInGoogle from './signingoogle'
import api from '/src/api';

export default function SignIn({setIsLogin}) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');


  function handleSubmit(e) {
    e.preventDefault();
    api.post('/admin/login', { email, password })
      .then(res => {
        console.log(res);
        if (res.data.access_token) {
          localStorage.setItem('token', res.data.access_token);
          setIsLogin(true);
        }
        else {
          alert('Sai email hoặc mật khẩu');
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-1 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Đăng nhập vào tài khoản
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
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
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    onChange={(e) => setEmail(e.target.value)}
                 />
                </div>
                <p className='text-red-500 text-sm'>loi</p>
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
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    onChange={(e) => setPassword(e.target.value)}
                 />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
      </>
    )
  }
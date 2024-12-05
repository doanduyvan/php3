import { useState, useEffect, useContext  } from 'react'
import {jwtDecode} from 'jwt-decode';
import Layout from './layout'
import SignIn from './author/signin'
import api from './api'
import "antd/dist/reset.css"; // Import CSS của Ant Design
import "./index.css"; // Import CSS của Tailwind
import { Avatar } from 'antd';
import { UserContext } from './context/usercontext';



function App() {

  const { user, updateUser, clearUser } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); 
      if (decodedToken.exp < currentTime) {
        clearUser();
      } else {
        const userInfo = {
          username: decodedToken.username,
          role: decodedToken.role,
          avatar: decodedToken.avatar,
        };
        updateUser(userInfo);
      }
    } catch (error) {
      console.error('Có lỗi xảy ra khi giải mã token', error);
      clearUser();
    }
  }
  }, []);

  return (
    <>
      {user ? <Layout /> : <SignIn /> }
    </>
  )
}

export default App

import { useState, useEffect  } from 'react'
import {jwtDecode} from 'jwt-decode';
import Layout from './layout'
import SignIn from './author/signin'
import api from './api'
import "antd/dist/reset.css"; // Import CSS của Ant Design
import "./index.css"; // Import CSS của Tailwind
import { Avatar } from 'antd';

const user2 = {
    username: 'Duy Van',
    email: 'tom@example.com',
    role: 2,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

function App() {

  // kiểm tra đăng nhập
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(user2);

  useEffect(() => {
    return;
    const token = localStorage.getItem('token');
    if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); 
      if (decodedToken.exp > currentTime) {
        setIsLogin(true); 
        setUser(decodedToken);
      } else {
        localStorage.removeItem('token');
        setIsLogin(false);
      }
    } catch (error) {
      console.error('Invalid token:', error);
      localStorage.removeItem('token');
      setIsLogin(false);
    }
  }
  }, []);

  return (
    <>
      {isLogin ? <Layout setIsLogin={setIsLogin} user={user} /> : <SignIn setIsLogin={setIsLogin} /> }
    </>
  )
}

export default App

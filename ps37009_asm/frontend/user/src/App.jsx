import Layout from "./layout"
import React, {useEffect, useContext} from "react";
import { UserContext } from "./context/logincontext";
import { notification } from "antd";
function App() {

  const { updateUser } = useContext(UserContext);
  useEffect(() => {
    // check login status
    const token = localStorage.getItem('userInfo');
    if(token) {
      const { user } = JSON.parse(token);
      const exp = user.exp;
      const now = Math.floor(Date.now() / 1000);
      if(exp < now) {
        localStorage.removeItem('userInfo');
        notification.warning({
          message: 'Phiên đăng nhập hết hạn',
        });
        return;
      }
      updateUser(user);
    }
  }, []);

  return (
    <>
      
      <Layout />

    </>
  )
}

export default App

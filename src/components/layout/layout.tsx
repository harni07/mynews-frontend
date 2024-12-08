import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Sidebar from './SideBar';
import { setUser } from '../../store/slices/user';
import MobileNavbar from './mobileNavbar';
import Header from './header';
import TopBanner from '../topBanner';


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user);

    const logout = () => {
        localStorage.removeItem('token');
        navigate("/login")
    }

  

    useEffect(() => {
        const storedUserData = localStorage.getItem('token');
        if (storedUserData && !user.access_token) {
            const parsedData = JSON.parse(storedUserData);
            dispatch(setUser(parsedData));
        }
    }, [dispatch]);

  

    return (
        <>
            <TopBanner />
           <MobileNavbar />
           <div className="layout-container">
              <Header />
              <div className="content">
                  <Sidebar />
                  <div className="main-content">{children}</div>
              </div>
            </div>
        </>
      );
}

export default Layout;

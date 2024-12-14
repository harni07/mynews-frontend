import React, {useEffect} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Sidebar from './SideBar';
import { setUser } from '../../store/slices/user';
import MobileNavbar from './mobileNavbar';
import Header from './header';
import TopBanner from '../topBanner';
import { AppState } from '../../store';

const Layout: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: AppState) => state.user);

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
                    <div className="main-content">
                        <Outlet /> 
                    </div>
                </div>
            </div>
        </>
    );
}

export default Layout;

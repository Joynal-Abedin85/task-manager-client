import React from 'react';
import Header from '../component/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../component/Footer';

const Mainlayout = () => {
    return (
        <div>
            <div>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
            
        </div>
        </div>
    );
};

export default Mainlayout;
import { Outlet } from "react-router-dom";
import Sidebar from "../admin/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState } from 'react';

export default function AdminLayout() {
    const [toggle, setToggle] = useState(true);

    const Toggle = () => {
        setToggle(!toggle);
    }

  return (
    <>  
        <div className='container-fluid bg-secondary min-vh-100'>
            <div className='row'>
                {toggle && (
                    <div className='col-4 col-md-2 bg-white vh-100 position-fixed'>
                        <Sidebar />
                    </div>
                     )}
                     {toggle && <div className='col-4 col-md-2'></div>}
                     <div className='col'>
                            <main>
                                <Outlet />
                            </main>
                    </div>
            </div>
        </div>
    </>
  )
}

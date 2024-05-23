import React from 'react';


function Sidebar() {
    return (
        <div className='bg-white sidebar p-2'>
        <div className='m-2'>
            <i className='bi bi-bootstrap-fill me-3 fs-4'></i>
            <span className='brand-name fs-4'>Admin</span>
        </div>
        <hr className='text-dark' />
        <div className='list-group list-group-flush'>
            <Link className='list-group-item py-2' to='/admin/Home'>
                <i className='bi bi-house fs-5 me-3'></i>
                <span>Home</span>
            </Link>
            <Link className='list-group-item py-2' to='/admin/produit'>
                <i className='bi bi-table fs-5 me-3'></i>
                <span>Products</span>
            </Link>
            <Link className='list-group-item py-2' to='/admin/user'>
                <i className='bi bi-clipboard-data fs-5 me-3'></i>
                <span>Users</span>
            </Link>
            <Link className='list-group-item py-2' to='/admin/admins'>
                <i className='bi bi-people fs-5 me-3'></i>
                <span>Admins</span>
            </Link>
            <Link className='list-group-item py-2' to='/admin/logout'>
                <i className='bi bi-power fs-5 me-3'></i>
                <span>Logout</span>
            </Link>
        </div>
    </div>
    );
}

export default Sidebar;
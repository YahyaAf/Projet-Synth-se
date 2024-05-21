import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [admins, setAdmins] = useState([]);
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/api/admins', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        setAdmins(data);
    };

    const handleCreateAdmin = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/api/admins', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ nom, email, mot_de_passe: motDePasse })
        });
        const data = await response.json();
        setAdmins([...admins, data]);
    };

    const handleDeleteAdmin = async (id) => {
        const token = localStorage.getItem('token');
        await fetch(`http://localhost:8000/api/admins/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setAdmins(admins.filter(admin => admin.id !== id));
    };

    const handleUpdateAdmin = async (id) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8000/api/admins/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ nom, email, mot_de_passe: motDePasse })
        });
        const data = await response.json();
        setAdmins(admins.map(admin => (admin.id === id ? data : admin)));
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <form onSubmit={handleCreateAdmin}>
                <div>
                    <label>Name</label>
                    <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} />
                </div>
                <button type="submit">Create Admin</button>
            </form>
            <ul>
                {admins.map(admin => (
                    <li key={admin.id}>
                        {admin.nom} ({admin.email})
                        <button onClick={() => handleUpdateAdmin(admin.id)}>Update</button>
                        <button onClick={() => handleDeleteAdmin(admin.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;

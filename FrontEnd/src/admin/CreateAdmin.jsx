import React, { useState, useEffect } from 'react';

const AdminManagement = () => {
    const [admins, setAdmins] = useState([]);
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/admin');
            if (!response.ok) {
                throw new Error('Failed to fetch admins');
            }
            const data = await response.json();
            setAdmins(data.admins);
        } catch (error) {
            console.error('Fetch admins failed:', error);
        }
    };

    const handleCreate = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/admin/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nom: nom,
                    email: email,
                    mot_de_passe: password,
                    mot_de_passe_confirmation: confirmPassword,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(JSON.stringify(data.errors));
            }

            await fetchAdmins();
            setNom('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            setErrors(JSON.parse(error.message));
            console.error('Admin creation failed:', error);
        }
    };

    const handleEdit = (id) => {
        const adminToEdit = admins.find(admin => admin.id === id);
        if (adminToEdit) {
            setIsEditing(true);
            setEditId(id);
            setNom(adminToEdit.nom);
            setEmail(adminToEdit.email);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/admin/${editId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nom: nom,
                    email: email,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(JSON.stringify(data.errors));
            }

            await fetchAdmins();
            setIsEditing(false);
            setEditId(null);
            setNom('');
            setEmail('');
        } catch (error) {
            console.error('Admin update failed:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/admin/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete admin');
            }

            await fetchAdmins();
        } catch (error) {
            console.error('Admin deletion failed:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            handleUpdate();
        } else {
            handleCreate();
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="display-4 text-center my-4">Admin Management</h1>
            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
                        <h3 className="mb-4">{isEditing ? 'Edit Admin' : 'Create Admin'}</h3>
                        <div className="form-group">
                            <label htmlFor="nom">Nom</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nom"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                            />
                            {errors.nom && <div className="text-danger">{errors.nom[0]}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <div className="text-danger">{errors.email[0]}</div>}
                        </div>
                        {!isEditing && (
                            <>
                                <div className="form-group">
                                    <label htmlFor="password">Mot de passe</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {errors.mot_de_passe && <div className="text-danger">{errors.mot_de_passe[0]}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirmer Mot de passe</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    {errors.mot_de_passe_confirmation && <div className="text-danger">{errors.mot_de_passe_confirmation[0]}</div>}
                                </div>
                            </>
                        )}
                        <button type="submit" className="btn btn-primary mt-2">
                            {isEditing ? 'Update Admin' : 'Add Admin'}
                        </button>
                    </form>
                </div>
                <div className="col-md-6">
                    <table className="table table-bordered table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>Nom</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admins.map(admin => (
                                <tr key={admin.id}>
                                    <td>{admin.nom}</td>
                                    <td>{admin.email}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm mr-2"
                                            onClick={() => handleEdit(admin.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(admin.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminManagement;

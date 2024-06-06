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
            const response = await fetch('http://localhost:8008/api/admin');
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
            const response = await fetch('http://localhost:8008/api/admin/create', {
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
            setErrors([]);
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
            const response = await fetch(`http://localhost:8008/api/admin/${editId}`, {
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
            setErrors([]);
        } catch (error) {
            console.error('Admin update failed:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8008/api/admin/${id}`, {
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
        <div className="bg-gray-100 min-h-screen p-4 md:p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">Admin Management</h1>
            <div className="p-4 md:p-6 border rounded shadow-sm bg-gray-200 max-w-4xl mx-auto mb-6">
                <form onSubmit={handleSubmit}>
                    <h3 className="text-lg md:text-xl font-semibold mb-4">{isEditing ? 'Edit Admin' : 'Create Admin'}</h3>
                    <div className="mb-4">
                        <label htmlFor="nom" className="block text-sm md:text-base font-medium text-gray-700">Nom</label>
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm md:text-base"
                            id="nom"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                        />
                        {errors.nom && <div className="text-red-500 text-xs md:text-sm mt-1">{errors.nom[0]}</div>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm md:text-base font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm md:text-base"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <div className="text-red-500 text-xs md:text-sm mt-1">{errors.email[0]}</div>}
                    </div>
                    {!isEditing && (
                        <>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm md:text-base font-medium text-gray-700">Mot de passe</label>
                                <input
                                    type="password"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm md:text-base"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors.mot_de_passe && <div className="text-red-500 text-xs md:text-sm mt-1">{errors.mot_de_passe[0]}</div>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="confirmPassword" className="block text-sm md:text-base font-medium text-gray-700">Confirmer Mot de passe</label>
                                <input
                                    type="password"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm md:text-base"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                {errors.mot_de_passe_confirmation && <div className="text-red-500 text-xs md:text-sm mt-1">{errors.mot_de_passe_confirmation[0]}</div>}
                            </div>
                        </>
                    )}
                    <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm md:text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        {isEditing ? 'Update Admin' : 'Add Admin'}
                    </button>
                </form>
            </div>
            <div className="overflow-x-auto max-w-4xl mx-auto">
                <table className="min-w-full divide-y divide-gray-200 bg-white shadow overflow-hidden sm:rounded-lg">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                            <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {admins.map(admin => (
                            <tr key={admin.id}>
                                <td className="px-2 md:px-4 py-2 md:py-3 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">{admin.nom}</td>
                                <td className="px-2 md:px-4 py-2 md:py-3 whitespace-nowrap text-xs md:text-sm text-gray-500">{admin.email}</td>
                                <td className="px-2 md:px-4 py-2 md:py-3 whitespace-nowrap text-xs md:text-sm font-medium">
                                    <button
                                        className="text-indigo-600 hover:text-indigo-900 mr-2 md:mr-4"
                                        onClick={() => handleEdit(admin.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-600 hover:text-red-900"
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
    );
};

export default AdminManagement;

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Optional, can be removed if fully migrating to Tailwind

export default function User() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({
      nom: '',
      email: '',
      mot_de_passe: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editUserId, setEditUserId] = useState(null);
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8008/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm({
        ...form,
        [name]: value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (isEditing) {
        handleUpdate(editUserId);
      } else {
        handleAdd();
      }
    };

    const handleAdd = async () => {
      try {
        const response = await fetch('http://localhost:8008/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });
        const newUser = await response.json();
        setUsers([...users, newUser]);
        setForm({ nom: '', email: '', mot_de_passe: '' });
      } catch (error) {
        console.error('Error creating user:', error);
      }
    };
  
    const handleDelete = async (id) => {
      try {
        await fetch(`http://localhost:8008/api/users/${id}`, {
          method: 'DELETE',
        });
        setUsers(users.filter((user) => user.id !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    };
  
    const handleUpdate = async (id) => {
      try {
        const response = await fetch(`http://localhost:8008/api/users/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });
        const updatedUser = await response.json();
        setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
        setForm({ nom: '', email: '', mot_de_passe: '' });
        setIsEditing(false);
        setEditUserId(null);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    };

    const handleEdit = (user) => {
      setForm({
        nom: user.nom,
        email: user.email,
        mot_de_passe: '',
      });
      setIsEditing(true);
      setEditUserId(user.id);
    };
  
    return (
      <div className="bg-gray-100 min-h-screen p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-center my-6">Users</h1>
        </div>

        <div className="mb-6 p-6 border rounded shadow-sm bg-gray-200">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Nom</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                id="nom"
                name="nom"
                placeholder="Nom"
                value={form.nom}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                id="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mot_de_passe" className="block text-sm font-medium text-gray-700">Mot de passe</label>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                id="mot_de_passe"
                name="mot_de_passe"
                placeholder="Mot de passe"
                value={form.mot_de_passe}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {isEditing ? 'Update User' : 'Add User'}
            </button>
          </form>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white shadow overflow-hidden sm:rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map(user => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.nom}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(user.id)}
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

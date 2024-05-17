import React, { useEffect, useState } from 'react';

import React from 'react'

export default function User() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({
      nom: '',
      email: '',
      mot_de_passe: '',
    });
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/users');
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
      try {
        const response = await fetch('http://localhost:8000/api/users', {
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
        await fetch(`http://localhost:8000/api/users/${id}`, {
          method: 'DELETE',
        });
        setUsers(users.filter((user) => user.id !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    };
  
    const handleUpdate = async (id) => {
      try {
        const response = await fetch(`http://localhost:8000/api/users/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });
        const updatedUser = await response.json();
        setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
        setForm({ nom: '', email: '', mot_de_passe: '' });
      } catch (error) {
        console.error('Error updating user:', error);
      }
    };
  
    return (
      <div>
        <h1>Users</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={form.nom}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="mot_de_passe"
            placeholder="Mot de passe"
            value={form.mot_de_passe}
            onChange={handleChange}
          />
          <button type="submit">Add User</button>
        </form>
  
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.nom} - {user.email}
              <button onClick={() => handleDelete(user.id)}>Delete</button>
              <button onClick={() => handleUpdate(user.id)}>Update</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
 
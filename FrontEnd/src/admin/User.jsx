import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importation du CSS de Bootstrap

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
      if (isEditing) {
        handleUpdate(editUserId);
      } else {
        handleAdd();
      }
    };

    const handleAdd = async () => {
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
      <div>
        <div className="container">
            <h1 className="display-4 text-center my-4">Users</h1>
        </div>
        <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
          <div className="form-group">
            <label htmlFor="nom">Nom</label>
            <input
              type="text"
              className="form-control"
              id="nom"
              name="nom"
              placeholder="Nom"
              value={form.nom}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="mot_de_passe">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              id="mot_de_passe"
              name="mot_de_passe"
              placeholder="Mot de passe"
              value={form.mot_de_passe}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-2">
            {isEditing ? 'Update User' : 'Add User'}
          </button>
        </form>
  
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
          </thead>
          <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.nom}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm mr-2"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    );
  };
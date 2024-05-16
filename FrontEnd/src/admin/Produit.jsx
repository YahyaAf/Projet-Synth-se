import React, { useEffect, useState } from 'react';

const Produits = () => {
  const [produits, setProduits] = useState([]);
  const [form, setForm] = useState({
    nom: '',
    description: '',
    prix: '',
  });

  useEffect(() => {
    fetchProduits();
  }, []);

  const fetchProduits = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/produit');
      const data = await response.json();
      setProduits(data);
    } catch (error) {
      console.error('Error fetching produits:', error);
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
      const response = await fetch('http://localhost:8000/api/produit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const newProduit = await response.json();
      setProduits([...produits, newProduit]);
      setForm({ nom: '', description: '', prix: '' });
    } catch (error) {
      console.error('Error creating produit:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8000/api/produit/${id}`, {
        method: 'DELETE',
      });
      setProduits(produits.filter((produit) => produit.id !== id));
    } catch (error) {
      console.error('Error deleting produit:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/produit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const updatedProduit = await response.json();
      setProduits(produits.map((produit) => (produit.id === id ? updatedProduit : produit)));
      setForm({ nom: '', description: '', prix: '' });
    } catch (error) {
      console.error('Error updating produit:', error);
    }
  };

  return (
    <div>
      <h1>Produits</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nom"
          placeholder="Nom"
          value={form.nom}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="prix"
          placeholder="Prix"
          value={form.prix}
          onChange={handleChange}
        />
        <button type="submit">Add Produit</button>
      </form>

      <ul>
        {produits.map((produit) => (
          <li key={produit.id}>
            {produit.nom} - {produit.description} - {produit.prix}€
            <button onClick={() => handleDelete(produit.id)}>Delete</button>
            <button onClick={() => handleUpdate(produit.id)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Produits;
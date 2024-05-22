// src/ProduitPage.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Produit() {
  const [produits, setProduits] = useState([]);
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [quantiteStock, setQuantiteStock] = useState('');
  const [image, setImage] = useState('');
  const [selectedProduit, setSelectedProduit] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduits();
  }, []);

  const fetchProduits = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/produit');
      const data = await response.json();
      setProduits(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const produit = { nom, description, prix, quantite_stock: quantiteStock, image };

    try {
      const response = await fetch(`http://localhost:8000/api/produit${selectedProduit ? `/${selectedProduit.id}` : ''}`, {
        method: selectedProduit ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(produit)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de l\'enregistrement du produit');
      }

      await response.json();
      fetchProduits();
      resetForm();
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };

  const handleEdit = (produit) => {
    setSelectedProduit(produit);
    setNom(produit.nom);
    setDescription(produit.description);
    setPrix(produit.prix);
    setQuantiteStock(produit.quantite_stock);
    setImage(produit.image);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/produit/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la suppression du produit');
      }

      fetchProduits();
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };

  const resetForm = () => {
    setSelectedProduit(null);
    setNom('');
    setDescription('');
    setPrix('');
    setQuantiteStock('');
    setImage('');
    setError(null);
  };

  return (
    <div className="" >
      {error && <p className="alert alert-danger">{error}</p>}
      <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded shadow-sm bg-light">
      <h2 className="mb-4">{selectedProduit ? 'Modifier le Produit' : 'Ajouter un Nouveau Produit'}</h2>
      <div className="form-group">
        <label htmlFor="nom">Nom</label>
        <input 
          type="text" 
          className="form-control" 
          id="nom" 
          name="nom" 
          value={nom} 
          onChange={(e) => setNom(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input 
          type="text" 
          className="form-control" 
          id="description" 
          name="description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <label htmlFor="prix">Prix</label>
        <input 
          type="number" 
          className="form-control" 
          id="prix" 
          name="prix" 
          value={prix} 
          onChange={(e) => setPrix(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <label htmlFor="quantite_stock">Quantité en stock</label>
        <input 
          type="number" 
          className="form-control" 
          id="quantite_stock" 
          name="quantite_stock" 
          value={quantiteStock} 
          onChange={(e) => setQuantiteStock(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">Image</label>
        <input 
          type="text" 
          className="form-control" 
          id="image" 
          name="image" 
          value={image} 
          onChange={(e) => setImage(e.target.value)} 
          required 
        />
      </div>
      <button type="submit" className="btn btn-primary mt-2">{selectedProduit ? 'Mettre à jour' : 'Ajouter'}</button>
      {selectedProduit && <button type="button" className="btn btn-secondary ml-2" onClick={resetForm}>Annuler</button>}
    </form>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Prix (€)</th>
            <th>Quantité en stock</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {produits.map(produit => (
            <tr key={produit.id}>
              <td>{produit.nom}</td>
              <td>{produit.description}</td>
              <td>{produit.prix}</td>
              <td>{produit.quantite_stock}</td>
              <td>{produit.image}</td>
              <td>
                <button className="btn btn-warning mr-2" onClick={() => handleEdit(produit)}>Modifier</button>
                <button className="btn btn-danger" onClick={() => handleDelete(produit.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



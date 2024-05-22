import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Commande = () => {
  const [form, setForm] = useState({
    ville: '',
    adresse: '',
    numero: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajoutez ici la logique pour soumettre le formulaire
    console.log('Formulaire soumis:', form);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
    <h1 className="text-2xl font-bold mb-6 text-center">Passer une Commande</h1>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="ville" className="block text-sm font-medium text-gray-700">Ville</label>
        <input
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          id="ville"
          name="ville"
          value={form.ville}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="adresse" className="block text-sm font-medium text-gray-700">Adresse</label>
        <input
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          id="adresse"
          name="adresse"
          value={form.adresse}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="numero" className="block text-sm font-medium text-gray-700">Numéro</label>
        <input
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          id="numero"
          name="numero"
          value={form.numero}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Passer la Commande
      </button>
    </form>
  </div>
  );
};

export default Commande;

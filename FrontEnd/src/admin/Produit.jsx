import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Produit() {
  const [produits, setProduits] = useState([]);
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [quantiteStock, setQuantiteStock] = useState('');
  const [image, setImage] = useState(null);
  const [selectedProduit, setSelectedProduit] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduits();
  }, []);

  const fetchProduits = async () => {
    try {
      const response = await fetch('http://localhost:8008/api/produit');
      const data = await response.json();
      setProduits(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('description', description);
    formData.append('prix', prix);
    formData.append('quantite_stock', quantiteStock);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch(`http://localhost:8008/api/produit${selectedProduit ? `/${selectedProduit.id}` : ''}`, {
        method: selectedProduit ? 'PUT' : 'POST',
        body: formData
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
    setImage(null); // Reset the image file input
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8008/api/produit/${id}`, {
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
    setImage(null);
    setError(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-6">
      {error && <p className="alert alert-danger">{error}</p>}
      <form onSubmit={handleSubmit} className="mb-6 p-4 md:p-6 border rounded shadow-sm bg-gray-200 max-w-4xl mx-auto" encType="multipart/form-data">
        <h2 className="mb-4 text-lg md:text-xl font-semibold">{selectedProduit ? 'Modifier le Produit' : 'Ajouter un Nouveau Produit'}</h2>
        <div className="mb-4">
          <label htmlFor="nom" className="block text-sm md:text-base font-medium text-gray-700">Nom</label>
          <input 
            type="text" 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm md:text-base" 
            id="nom" 
            name="nom" 
            value={nom} 
            onChange={(e) => setNom(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm md:text-base font-medium text-gray-700">Description</label>
          <input 
            type="text" 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm md:text-base" 
            id="description" 
            name="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-4">
          <label htmlFor="prix" className="block text-sm md:text-base font-medium text-gray-700">Prix</label>
          <input 
            type="number" 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm md:text-base" 
            id="prix" 
            name="prix" 
            value={prix} 
            onChange={(e) => setPrix(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-4">
          <label htmlFor="quantite_stock" className="block text-sm md:text-base font-medium text-gray-700">Quantité en stock</label>
          <input 
            type="number" 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm md:text-base" 
            id="quantite_stock" 
            name="quantite_stock" 
            value={quantiteStock} 
            onChange={(e) => setQuantiteStock(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm md:text-base font-medium text-gray-700">Image</label>
          <input 
            type="file" 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm md:text-base" 
            id="image" 
            name="image" 
            onChange={(e) => setImage(e.target.files[0])} 
          />
        </div>
        <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm md:text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          {selectedProduit ? 'Mettre à jour' : 'Ajouter'}
        </button>
        {selectedProduit && <button type="button" className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm md:text-base font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" onClick={resetForm}>Annuler</button>}
      </form>
      <div className="overflow-x-auto max-w-4xl mx-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow overflow-hidden sm:rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Nom</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Prix (€)</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Quantité en stock</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {produits.map(produit => (
              <tr key={produit.id}>
                <td className="px-2 md:px-4 py-2 md:py-3 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">{produit.nom}</td>
                <td className="px-2 md:px-4 py-2 md:py-3 whitespace-nowrap text-xs md:text-sm text-gray-500">{produit.description}</td>
                <td className="px-2 md:px-4 py-2 md:py-3 whitespace-nowrap text-xs md:text-sm text-gray-500">{produit.prix}</td>
                <td className="px-2 md:px-4 py-2 md:py-3 whitespace-nowrap text-xs md:text-sm text-gray-500">{produit.quantite_stock}</td>
                <td className="px-2 md:px-4 py-2 md:py-3 whitespace-nowrap text-xs md:text-sm text-gray-500">
                  {produit.image && <img src={`http://localhost:8008/storage/${produit.image}`} alt={produit.nom} className="w-20 h-20 object-cover" />}
                </td>
                <td className="px-2 md:px-4 py-2 md:py-3 whitespace-nowrap text-xs md:text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-2 md:mr-4" onClick={() => handleEdit(produit)}>Modifier</button>
                  <button className="text-red-600 hover:text-red-900" onClick={() => handleDelete(produit.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

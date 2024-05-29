import React, { useState, useEffect } from 'react';

const CommandPage = () => {
    const [commandes, setCommandes] = useState([]);
    const [selectedCommande, setSelectedCommande] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        total: '',
        user_id: '',
        produit_id: '',
        adresse: '',
        ville: '',
        numero: '',
    });

    useEffect(() => {
        fetchCommandes();
    }, []);

    const fetchCommandes = async () => {
        const response = await fetch('http://localhost:8000/api/commandes');
        const data = await response.json();
        setCommandes(data);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8000/api/commandes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            fetchCommandes();
            setFormData({
                total: '',
                user_id: '',
                produit_id: '',
                adresse: '',
                ville: '',
                numero: '',
            });
        } else {
            console.error('Failed to create the commande');
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:8000/api/commandes/${selectedCommande.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            fetchCommandes();
            setSelectedCommande(null);
            setIsEditing(false);
            setFormData({
                total: '',
                user_id: '',
                produit_id: '',
                adresse: '',
                ville: '',
                numero: '',
            });
        } else {
            console.error('Failed to update the commande');
        }
    };

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:8000/api/commandes/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            fetchCommandes();
        } else {
            console.error('Failed to delete the commande');
        }
    };

    const handleDetails = (commande) => {
        setSelectedCommande(commande);
        setIsEditing(false);
    };

    const handleEdit = (commande) => {
        setSelectedCommande(commande);
        setIsEditing(true);
        setFormData({
            total: commande.total,
            user_id: commande.user_id,
            produit_id: commande.produit_id,
            adresse: commande.adresse,
            ville: commande.ville,
            numero: commande.numero,
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Gestion des Commandes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <ul>
                        {commandes.map((commande) => (
                            <li key={commande.id} className="border p-2 mb-2 flex justify-between items-center">
                                <div>
                                    <p>ID: {commande.id}</p>
                                    <p>Total: {commande.total}</p>
                                </div>
                                <div>
                                    <button
                                        onClick={() => handleDetails(commande)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                    >
                                        Voir Détails
                                    </button>
                                    <button
                                        onClick={() => handleEdit(commande)}
                                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        onClick={() => handleDelete(commande.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    {selectedCommande && !isEditing && (
                        <div className="bg-white p-4 rounded shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Détails de la Commande</h2>
                            <div className="mb-2">
                                <span className="font-semibold">ID:</span> {selectedCommande.id}
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold">Total:</span> {selectedCommande.total}
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold">Created At:</span> {new Date(selectedCommande.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold">User ID:</span> {selectedCommande.user_id}
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold">Produit ID:</span> {selectedCommande.produit_id}
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold">Adresse:</span> {selectedCommande.adresse}
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold">Ville:</span> {selectedCommande.ville}
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold">Numéro:</span> {selectedCommande.numero}
                            </div>
                        </div>
                    )}
                    {selectedCommande && isEditing && (
                        <form onSubmit={handleUpdate} className="bg-white p-4 rounded shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Modifier la Commande</h2>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Total:</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="total"
                                    value={formData.total}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">User ID:</label>
                                <input
                                    type="number"
                                    name="user_id"
                                    value={formData.user_id}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Produit ID:</label>
                                <input
                                    type="number"
                                    name="produit_id"
                                    value={formData.produit_id}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Adresse:</label>
                                <input
                                    type="text"
                                    name="adresse"
                                    value={formData.adresse}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Ville:</label>
                                <input
                                    type="text"
                                    name="ville"
                                    value={formData.ville}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Numéro:</label>
                                <input
                                    type="text"
                                    name="numero"
                                    value={formData.numero}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Mettre à jour
                            </button>
                        </form>
                    )}
                    {!selectedCommande && !isEditing && (
                        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Ajouter une Commande</h2>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Total:</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="total"
                                    value={formData.total}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">User ID:</label>
                                <input
                                    type="number"
                                    name="user_id"
                                    value={formData.user_id}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Produit ID:</label>
                                <input
                                    type="number"
                                    name="produit_id"
                                    value={formData.produit_id}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Adresse:</label>
                                <input
                                    type="text"
                                    name="adresse"
                                    value={formData.adresse}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Ville:</label>
                                <input
                                    type="text"
                                    name="ville"
                                    value={formData.ville}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Numéro:</label>
                                <input
                                    type="text"
                                    name="numero"
                                    value={formData.numero}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Ajouter
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommandPage;

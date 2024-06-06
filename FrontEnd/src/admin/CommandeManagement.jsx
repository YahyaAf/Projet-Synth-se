import React, { useState, useEffect } from 'react';
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
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
        const response = await fetch('http://localhost:8008/api/commandes');
        const data = await response.json();
        setCommandes(data);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8008/api/commandes', {
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
        const response = await fetch(`http://localhost:8008/api/commandes/${selectedCommande.id}`, {
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
        const response = await fetch(`http://localhost:8008/api/commandes/${id}`, {
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
        <div className="bg-gray-50 min-h-screen p-4 md:p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">Gestion des Commandes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
                <div className="bg-white p-4 md:p-6 rounded shadow-sm">
                    <h2 className="text-2xl font-semibold mb-4">Liste des Commandes</h2>
                    <ul className="space-y-4">
                        {commandes.map((commande) => (
                            <li key={commande.id} className="border p-4 rounded shadow-sm flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">ID: {commande.id}</p>
                                    <p>Total: {commande.total}</p>
                                </div>
                                <div className="space-x-2">
                                    <button
                                        onClick={() => handleDetails(commande)}
                                        className="text-gray-600 hover:text-gray-900 mr-2 md:mr-4"
                                    >
                                        Voir Détails
                                    </button>
                                    <button
                                        onClick={() => handleEdit(commande)}
                                        className="text-blue-600 hover:text-blue-900 mr-2 md:mr-4"
                                    >
                                        <PencilSquareIcon class="h-6 w-6 text-gray-500" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(commande.id)}
                                        className="hover:text-red-900"
                                    >
                                        <TrashIcon class="h-6 w-6 text-gray-500" />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    {selectedCommande && !isEditing && (
                        <div className="bg-white p-4 md:p-6 rounded shadow-sm">
                            <h2 className="text-2xl font-semibold mb-4">Détails de la Commande</h2>
                            <div className="mb-2">
                                <span className="font-semibold">ID:</span> {selectedCommande.id}
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold">Total:</span> {selectedCommande.total}
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold">Créé le:</span> {new Date(selectedCommande.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
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
                        <form onSubmit={handleUpdate} className="bg-white p-4 md:p-6 rounded shadow-sm">
                            <h2 className="text-2xl font-semibold mb-4">Modifier la Commande</h2>
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
                                className="text-blue-600 hover:text-blue-900 mr-2 md:mr-4"
                            >
                                Mettre à jour
                            </button>
                        </form>
                    )}
                    {!selectedCommande && (
                        <form onSubmit={handleSubmit} className="bg-white p-4 md:p-6 rounded shadow-sm">
                            <h2 className="text-2xl font-semibold mb-4">Créer une Nouvelle Commande</h2>
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
                                className="text-indigo-600 hover:text-indigo-900 mr-2 md:mr-4"
                            >
                                Créer
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommandPage;

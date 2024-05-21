import { useEffect, useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function AddToCart() {
  const { user } = useAuthContext();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPanierData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/panier', {
          method: "GET",
          headers: { "Authorization": `Bearer ${user.token}` }
        });
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
        } else {
          throw new Error("Failed to fetch panier products");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPanierData();
  }, [user.token]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/panier/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${user.token}` }
      });
      if (response.ok) {
        setData(data.filter(item => item.id !== id));
      } else {
        throw new Error("Failed to delete product from panier");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mx-auto p-20">
      {data.map((item) => (
        <div key={item.id} className="grid grid-cols-3 gap-4 items-center mb-4 bg-gray-100 p-4 rounded-lg">
          <div className="flex items-center">
            <img src={item.product.image} className="w-16 h-16 object-cover mr-4" alt="product" />
            <div>
              <p>{item.product.nom}</p>
              <p>{item.product.prix} DH</p>
            </div>
          </div>
          <div className="flex justify-end">
            <TrashIcon onClick={() => handleDelete(item.id)} className="h-6 w-6 text-gray-500 cursor-pointer" />
          </div>
        </div>
      ))}
      <div className="flex justify-end mt-6">
        <button className="bg-brown-500 text-white py-2 px-4 rounded">
          Valider la commande
        </button>
      </div>
    </div>
  );
}

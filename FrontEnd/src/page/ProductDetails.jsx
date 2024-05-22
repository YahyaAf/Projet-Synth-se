import { useState, useEffect } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
    const [data, setData] = useState([]);
    const {user}= useAuthContext()
    const {id} =useParams()
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await fetch(`http://127.0.0.1:8000/api/product/${id}`, {
              method: 'GET',
              headers: { "Authorization": `Bearer ${user.token}` }
            });
            if (response.ok) {
              const jsonData = await response.json();
              setData(jsonData);
            } else {
              throw new Error('Failed to fetch products');
            }
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchProducts();
      }, []); 
      console.log(data);
      const handleAddToCart = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/panier', {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${user.token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: user.user.id,
                    produit_id: id
                })
            });

            if (response.ok) {
                console.log("Product added to cart successfully");
                // You can add further actions here, such as updating the UI or notifying the user
            } else {
                throw new Error('Failed to add product to cart');
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
            <div className=" mx-auto flex justify-center mt-20 mb-20">
              <div className="flex bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
                <div className="p-5 w-1/2">
                  <img
                    src={`/public/${data.image}`}
                    className="w-full h-full object-cover"
                    alt="Product"
                  />
                </div>
                <div className="p-10 w-1/2 flex flex-col justify-center">
                  <h5 className="text-3xl mb-3 uppercase font-bold">{data.nom}</h5>
                  <p className="text-lg mb-3">{data.description}</p>
                  <p className="text-xl text-gray-500 font-semibold mb-3">{data.prix} DH</p>
                  <button
                  onClick={handleAddToCart}
                    className="mt-5 rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                  >
                    Ajouter au panier
                  </button>
                </div>
              </div>
            </div>
        )
}

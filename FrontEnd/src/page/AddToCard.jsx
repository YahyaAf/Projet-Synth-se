import { useEffect, useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { TrashIcon } from "@heroicons/react/24/outline";
import Loading from "./Loading";
import { Link } from "react-router-dom";

export default function AddToCart() {
  const { user } = useAuthContext();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        setIsLoading(false);
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
        setData(data.filter(item => item.id_panier !== id));
      } else {
        throw new Error("Failed to delete product from panier");
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center" style={{ height: '100vh' }}>
        <Loading type={'spin'} color={'gray'} />
      </div>
    );
  }

  return (
    <div className="mx-auto p-20" style={{ minHeight: "400px" }}>
      {data.length > 0 ? (
        data.map((item) => (
          <div key={item.id_panier} className="items-center mb-4 bg-gray-100 p-4 rounded-lg flex justify-between">
            <Link to={`/productDetails/${item.product.id}`} className="flex items-center">
              <img 
                src={`http://127.0.0.1:8008/storage/${item.product.image}`} // Correct path to the image
                className="w-16 h-16 object-cover mr-4" 
                alt="product" 
              />
              <div>
                <p>{item.product.nom}</p>
                <p>{item.product.prix} DH</p>
              </div>
            </Link>
            <div className="flex justify-end">
              <TrashIcon onClick={() => handleDelete(item.id_panier)} className="h-6 w-6 text-gray-500 cursor-pointer" />
            </div>
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center" }} className="text-2xl">Your cart is empty</p>
      )}
      <div className="flex justify-end mt-6">
        <Link 
          className="mt-3 rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          to="/checkout"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}

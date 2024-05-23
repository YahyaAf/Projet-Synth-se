import { useState, useEffect } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { useParams ,Link} from "react-router-dom";
import Loading from "./Loading"; // Make sure to import your Loading component

export default function ProductDetails() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState('success'); // success or error
  const { user } = useAuthContext();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/product/${id}`, {
          method: 'GET',
          headers: { "Authorization": `Bearer ${user.token}` }
        });
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
        } else {
          throw new Error('Failed to fetch product');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id, user.token]);

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
        setAlertMessage("Product added to cart successfully");
        setAlertType('success');
      } else {
        const errorData = await response.json();
        if (errorData.message === "The Product is already in the card") {
          setAlertMessage(errorData.message);
          setAlertType('error');
        } else {
          throw new Error('Failed to add product to cart');
        }
      }
    } catch (error) {
      console.log(error);
      setAlertMessage('An unexpected error occurred. Please try again.');
      setAlertType('error');
    } finally {
      setTimeout(() => setAlertMessage(null), 3000); // Clear the alert message after 3 seconds
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center" style={{ height: '100vh' }}>
        <Loading type={'spin'} color={'gray'} />
      </div>
    );
  }

  if (!data) {
    return <div className="text-center mt-20">Product not found</div>;
  }

  return (
    <div className="relative mx-auto mt-20 mb-20 max-w-4xl">
      {alertMessage && (
        <div className={`fixed top-0 left-0 w-full p-4 z-50 text-center ${alertType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {alertMessage}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-5">
          <img
            src={`/public/${data.image}`}
            className="w-full h-full object-cover"
            alt="Product"
          />
        </div>
        <div className="p-5 flex flex-col justify-center">
          <h5 className="text-3xl mb-3 uppercase font-bold">{data.nom}</h5>
          <p className="text-lg mb-3">{data.description}</p>
          <p className="text-xl text-gray-500 font-semibold mb-3">{data.prix} DH</p>
          <button
            onClick={handleAddToCart}
            className="mt-3 rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 text-center focus-visible:outline-orange-600"
          >
            Ajouter au panier
          </button>
          <Link 
            className="mt-3 rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 text-center focus-visible:outline-orange-600"
            to={`/commande/${id}`}>
              commande
            </Link>
        </div>
      </div>
    </div>
  );
}

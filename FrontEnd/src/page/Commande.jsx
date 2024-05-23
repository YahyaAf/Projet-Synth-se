import { useParams, useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import { useState, useEffect } from "react";

export default function Commande() {
  const { user } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [numero, setNumero] = useState('');
  const [adresse, setAdresse] = useState('');
  const [ville, setVille] = useState('');
  const [data, setData] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState('success'); // success or error

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
      }
    };

    fetchProduct();
  }, [id, user.token]);

  const handleCommande = async (event) => {
    event.preventDefault(); // Prevent default form submission
    try {
      const response = await fetch('http://127.0.0.1:8000/api/command', {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${user.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: user.user.id,
          produit_id: id,
          ville: ville,
          adresse: adresse,
          numero: numero,
          total: data?.prix || 0 // Ensure data is loaded and has a prix field
        })
      });
      if (response.ok) {
        setAlertMessage("Commande created successfully");
        setAlertType('success');
        setTimeout(() => {
          setAlertMessage(null);
          navigate('/');
        }, 3000); // Navigate to home after 3 seconds
      } else {
        throw new Error('Failed to create commande');
      }
    } catch (error) {
      console.log(error);
      setAlertMessage('An unexpected error occurred. Please try again.');
      setAlertType('error');
      setTimeout(() => setAlertMessage(null), 3000); // Clear the alert message after 3 seconds
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {alertMessage && (
        <div className={`fixed top-0 left-0 w-full p-4 z-50 text-center ${alertType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {alertMessage}
        </div>
      )}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* Additional content can be placed here */}
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleCommande}>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Phone Number
            </label>
            <div className="mt-2">
              <input
                type="number"
                required
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Address
              </label>
            </div>
            <div className="mt-2">
              <input
                type="text"
                required
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
            </div>
            <div className="mt-2">
              <input
                type="text"
                required
                value={ville}
                onChange={(e) => setVille(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="mt-3 rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 text-center focus-visible:outline-orange-600"
            >
              Commande
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

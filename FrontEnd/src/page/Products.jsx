import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import Loading from "./Loading";

export default function Products() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/product', {
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [user.token]);

  return (
    <div className="mx-auto p-10" style={{ minHeight: "400px" }}>
      <div className="flex justify-center">
        {isLoading ? (
          <div className="flex items-center justify-center w-full" style={{ height: '400px' }}>
            <Loading type={'spin'} color={'gray'} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-2">
            {data.length > 0 ? (
              data.map(item => (
                <div key={item.id} className="bg-white p-4 rounded-md shadow-md my-1 flex flex-col justify-between">
                  <Link to={`/productDetails/${item.id}`}>
                    <div>
                      <img src={item.image} alt="product" className="mb-2 transition-transform duration-300 transform hover:scale-110" />
                      <h1 className="text-xl font-bold text-center mb-2">{item.nom} </h1>
                      <p className="text-gray-700 text-center">{item.prix} DH</p>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center" }} className="text-2xl">No products available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

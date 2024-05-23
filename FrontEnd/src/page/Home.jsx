import { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
export default function Home() {
  const [data, setData]=useState()
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/product', {
          method: 'GET'
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
  return ( 
    <>
<div className="bg-gray-100 pt-10 flex justify-center">
        <div className="p-10 rounded-lg flex flex-col md:flex-row items-center justify-between w-full max-w-5xl">
          <div className="md:text-left md:max-w-lg">
            <h1 className="text-orange-500 text-4xl font-bold mb-4">Fakhar Shop</h1>
            <h3 className="text-2xl md:text-6xl font-bold text-gray-800">Beautifully designed and modern</h3>
            <h4 className="mt-5 text-gray-600">Pure Moroccan tradition passed down from generation to generation, a true art of living!</h4>
            <Link to="/products">
              <button className="mt-5 rounded-md bg-orange-500 px-6 py-3 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
                SHOP NOW
              </button>
            </Link>
          </div>
          <div className="mt-10 md:mt-0 md:ml-10">
            <img src="../../public/plat_couscous-removebg-preview.png" className="w-full max-w-sm md:max-w-md" alt="Moroccan Dish" />
          </div>
        </div>
      </div>

      <div className="p-20">
        <section className="">
          <h1 className="text-center text-5xl font-bold text-gray-800 mb-5">Popular <span className="text-orange-500">Products</span> </h1>
          <p className="text-center text-lg">Discover our latest product updates</p>
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-2">
            {data && data.slice(0,4).map(item => (
              <div key={item.id} className="bg-white p-4 rounded-md shadow-md my-1 flex flex-col justify-between">
                
                  <div className="text-center">
                    <img src={`../../public/${item.image}`} alt={item.nom} className="mb-2 transition-transform duration-300 transform hover:scale-110" />
                    <h1 className="text-xl font-bold text-center mb-2">{item.nom}</h1>
                    <p className="text-gray-700 text-center">{item.prix} DH</p>
                    <Link to={`/productDetails/${item.id}`}>
                      <button className="mt-3 rounded-md bg-orange-500 px-4  py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 text-center focus-visible:outline-orange-600">show details</button>
                  </Link>
                  </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      {/* <div className="p-40">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">In Fashion Now</h1>
          <p className="text-lg"><Link className="text-orange-500 hover:underline" to='/products'>See All</Link></p>

        </div>


        <section className="">
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 my-2">
            {data && data.slice(3,6).map(item => (
              <div key={item.id} className="bg-white p-4 rounded-md shadow-md my-1 flex flex-col justify-between">
                  <div className="text-center">
                    <Link to={`/productDetails/${item.id}`}>
                    <img src={`../../public/${item.image}`} alt={item.nom} className="mb-2 transition-transform duration-300 transform hover:scale-110" />
                    <h1 className="text-xl font-bold text-center mb-2 mr-10">{item.nom}</h1>
                    <p className="text-gray-700 text-center mr-10">{item.prix} DH</p>
                  </Link>
                  </div>
              </div>
            ))}
          </div>
        </section>
      
      </div> */}
<div className="p-4 sm:p-20 ml-0 sm:ml-10 flex justify-center">
  <div className="flex flex-col sm:flex-row items-center bg-white p-8 rounded-md shadow-md">
    <div className="w-full sm:w-1/2 max-w-sm mb-4 sm:mb-0">
      <img 
        src="../../public/pexels-axp-photography-500641970-16534567.jpg" 
        alt="Product of the month" 
        className="w-full h-auto object-cover rounded-md"
      />
    </div>
    <div className="w-full sm:w-1/2 ml-0 sm:ml-10">
      <p className="text-gray-600 text-xl mb-4 sm:mb-6">SAVE UP TO 70%</p>
      <h4 className="text-2xl sm:text-5xl font-extrabold text-gray-400 mb-4 sm:mb-6">Products of the month</h4>
      <p className="text-gray-700 mb-4 sm:mb-6">Discover excellence at an irresistible price now!</p>
      <Link to="/products">
        <button className="rounded-md bg-orange-500 px-4 sm:px-6 py-3 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
          Discover now
        </button>
      </Link>
    </div>
  </div>
</div>

    </>

  );
}

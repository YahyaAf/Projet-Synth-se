export default function Home() {
  return ( 
    <>

    <div className="bg-gray-100 pt-10 flex justify-center ">
      <div className="p-10 rounded-lg flex flex-col md:flex-row items-center justify-between w-full max-w-5xl">
        <div className="text-center md:text-left md:max-w-lg">
          <h1 className="text-orange-500 text-4xl font-bold mb-4">Fakhar Shop</h1>
          <h3 className="text-2xl md:text-6xl font-bold text-gray-800">Beautifully designed and modern</h3>
          <h4 className="mt-5 text-gray-600">Pure Moroccan tradition passed down from generation to generation, a true art of living!</h4>
          <button
            className="mt-5 rounded-md bg-orange-500 px-6 py-3 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          >
            SHOP NOW
          </button>
        </div>
        <div className="mt-10 md:mt-0 md:ml-10">
          <img src="../../public/plat_couscous-removebg-preview.png" className="w-full max-w-sm md:max-w-md" alt="Moroccan Dish" />
        </div>
      </div>
    </div>
    {/* card */}
    <div className="p-20">
      <section className="">
        <h1 className="text-center text-5xl font-bold text-gray-800 mb-5">Popular products</h1>
        <p className="text-center text-lg">Discover our latest product updates</p>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <img className="w-full h-64 object-cover mb-4" src="../../public/plat_carre.PNG" alt="PLAT CARRÉ" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">PLAT CARRÉ</h3>
            <p className="text-gray-600 mb-2">349 DH</p>
            <button className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300">Ajouter au panier</button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <img className="w-full h-64 object-cover mb-4" src="../../public/plat_carre.PNG" alt="PLAT CARRÉ" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">PLAT COUSCOUS</h3>
            <p className="text-gray-600 mb-2">450 DH</p>
            <button className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300">Ajouter au panier</button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <img className="w-full h-64 object-cover mb-4" src="../../public/plat_carre.PNG" alt="PLATEAU DE FRUITS SECS" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">PLATEAU DE FRUITS SECS</h3>
            <p className="text-gray-600 mb-2">450 DH</p>
            <button className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300">Ajouter au panier</button>
          </div>
        </div>
      </section>
    </div>
    <div className="">
      <h1 className="text-center text-5xl font-bold text-gray-800 mb-5">Popular products</h1>
      <p className="text-center text-lg">Discover our latest product updates</p>
    </div>
    </>

  );
}

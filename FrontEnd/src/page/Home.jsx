import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';
import { GoStarFill } from "react-icons/go";
export default function Home() {
  return ( 
    <>
    <div>
    <Carousel interval={1000} >
    <Carousel.Item>
      <img style={{height:'90vh'}}
        className="d-block w-100"
        src= "https://img.freepik.com/fotos-premium/proceso-primer-plano-alfarero-haciendo-vasija-barro_1029375-3390.jpg"
        alt="First slide"
      />
      <Carousel.Caption className='top-1/2 transform -translate-y-1/2'>
        <h3 className='text-7xl'>Bienvenue sur Fakhar Shop</h3>
        <button className="bg-stone-600 text-white py-2 px-4 rounded-md mt-10">Produit</button>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img style={{height:'90vh'}}
        className="d-block w-100"
        src="https://img.freepik.com/photos-premium/potter-sculpte-vase-tour-potier_159160-682.jpg"
        alt="Second slide"
      />

      <Carousel.Caption  className='top-1/2 transform -translate-y-1/2'>
      <h3 className='text-7xl'>Bienvenue sur Fakhar Shop</h3>
      <button className="bg-stone-600 text-white py-2 px-4 rounded-md mt-10">Produit</button>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img style={{height:'90vh'}}
        className="d-block w-100"
        src="https://t3.ftcdn.net/jpg/00/88/71/94/360_F_88719494_WU7zwHT7v3CKCkZpHCQuWkWL9hcJMjJi.jpg"
        alt="Third slide"
      />
      <Carousel.Caption  className='top-1/2 transform -translate-y-1/2'>
      <h3 className='text-7xl'>Bienvenue sur Fakhar Shop</h3>
      <button className=" bg-zinc-500 text-white py-2 px-4 rounded-md mt-10">Produit</button> 
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  </div>
  {/* card */}
  
  <h1 className="text-4xl text-center pt-10">Produits populaires</h1>
	<section>
		<div class="container ">
			<div class="card">
				<div class="content">
					<div class="imgBx">
						<img src="https://fakhar.shop/wp-content/uploads/2021/04/3-300x300.jpg"/>
					</div>
					<div class="contentBx">
						<h3>PLAT CARRÉ<br/></h3>
					</div>
				</div>
				<ul class="sci">
					
					<li>
						<a href=""><button>voir les Produit</button></a>
					</li>
					
				</ul>
			</div>
			<div class="card">
				<div class="content">
					<div class="imgBx">
						<img src="https://fakhar.shop/wp-content/uploads/2021/04/1-300x300.jpg"/>
					</div>
					<div class="contentBx">
						<h3>PLAT COUSCOUS<br/></h3>
					</div>
				</div>
				<ul class="sci">
					
					<li>
						<a href=""><button>voir les Produit</button></a>
					</li>
					
				</ul>
			</div>
			<div class="card">
				<div class="content">
					<div class="imgBx">
						<img src="https://fakhar.shop/wp-content/uploads/2021/04/2-300x300.jpg"/>
					</div>
					<div class="contentBx">
						<h3>PLATEAU DE FRUITS SECS<br/></h3>
					</div>
				</div>
				<ul class="sci">
					
					<li>
          <a href=""><button>voir les Produit</button></a>
					</li>
				
				</ul>
			</div>
      
		</div>
	</section>



{/* 1 */}

<div class="flex justify-center space-x-16">
  <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
      <img class="p-8 rounded-t-lg" src="https://fakhar.shop/wp-content/uploads/2023/10/6-300x300.jpg" alt="product image" />
    </a>
    <div class="px-5 pb-5">
      <a href="#">
        <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">PLATS</h5>
      </a>
      <div class="flex items-center mt-2.5 mb-5">
        <div class="flex items-center space-x-1 rtl:space-x-reverse">
          <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
          <GoStarFill className="text-2xl"/>
          <GoStarFill className="text-2xl"/>
          <GoStarFill className="text-2xl"/>
          </svg>
        </div>
        
        
      </div>
   
      <div class="flex items-center justify-between">
        <span class="text-2xl font-bold text-gray-900 dark:text-white">449 DH</span>
        
        <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">voir le Produit</a>
      </div>
    </div>
  </div>
{/* 2 */}
  <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
      <img class="p-8 rounded-t-lg" src="https://fakhar.shop/wp-content/uploads/2023/10/5.jpg" alt="product image" />
    </a>
    <div class="px-5 pb-5">
      <a href="#">
        <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">SALADIER</h5>
      </a>
      <div class="flex items-center mt-2.5 mb-5">
        <div class="flex items-center space-x-1 rtl:space-x-reverse">
          <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
          <GoStarFill className="text-2xl"/>
          </svg>
        </div>
        
        
      </div>
   
      <div class="flex items-center justify-between">
        <span class="text-2xl font-bold text-gray-900 dark:text-white">449 DH</span>
        
        <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">voir le Produit</a>
      </div>
    </div>
  </div>
  </div>

  {/* 3 */}
  <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
     <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
      <img class="p-8 rounded-t-lg" src="https://fakhar.shop/wp-content/uploads/2023/10/7-300x300.jpg" alt="product image" />
    </a>
    <div class="px-5 pb-5">
      <a href="#">
        <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">SOUPIÈRES</h5>
      </a>
      <div class="flex items-center mt-2.5 mb-5">
        <div class="flex items-center space-x-1 rtl:space-x-reverse">
          <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
          <GoStarFill className="text-2xl"/>
          </svg>
        </div>
        
        
      </div>
   
      <div class="flex items-center justify-between">
        <span class="text-2xl font-bold text-gray-900 dark:text-white">449 DH</span>
        
        <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">voir le Produit</a>
      </div>
    </div>
  </div>
  </div>
</div>




  </>
  );
}

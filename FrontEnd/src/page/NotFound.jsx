import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <h1 className='text-orange-600 text-8xl font-extrabold	'>404</h1>
      <h1 className="text-4xl text-gray-800 mb-4">Sorry, the page you were looking for was not found.</h1>
      <Link to="/" className="mt-3 rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 text-center focus-visible:outline-orange-600">
        Return to Home
      </Link>
    </div>
  );
}

export default NotFound;

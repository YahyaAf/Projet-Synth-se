import { Link } from 'react-router-dom';
import { useState } from 'react';
import useLogin from '../hooks/useLogin';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  }

  const renderErrorMessages = () => {
    if (!error) {
      return null;
    }

    if (typeof error === 'string') {
      return <p className='text-red-500 text-base'>{error}</p>;
    }

    if (typeof error === 'object') {
      return Object.keys(error).map((field, index) => (
        error[field].map((errorMessage, subIndex) => (
          <p className='text-red-500 text-base' key={`${field}-${subIndex}`}>
            {errorMessage}
          </p>
        ))
      ));
    }

    return null;
  }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log in
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md bg-orange-300 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
              >
                {isLoading ? 'LOADING...' : 'LOG IN'}
              </button>
            </div>
            <div className="text-center">
              {renderErrorMessages()}
            </div>
          </form>
          <p className="mt-3 text-center text-sm text-gray-500">
            <Link className="font-semibold leading-6 text-orange-300 hover:text-orange-400" to="/signup">
              Don't have an account? Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

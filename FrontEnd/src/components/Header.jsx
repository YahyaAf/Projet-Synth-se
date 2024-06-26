import { Fragment, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon,UserIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Link, NavLink, useLocation } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

const initialNavigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Product', href: '/products', current: false },
  { name: 'Contact', href: '/contact', current: false },
];


function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const [navigation, setNavigation] = useState(initialNavigation);
  const location = useLocation();
  const {user} = useAuthContext()
  const {logout} = useLogout()
  const handleNavClick = (name) => {
    setNavigation(navigation.map((item) =>
      item.name === name ? { ...item, current: true } : { ...item, current: false }
    ));
  };

  const handleLinkClick = () => {
    setNavigation(navigation.map((item) => ({ ...item, current: false })));
  };
const handleLogout = () =>{
  logout()
}
  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <h1 className='text-orange-300 font-bold text-xl'>
                    <Link to='/' onClick={handleLinkClick}>Fakhar</Link>
                  </h1>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:justify-center sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => handleNavClick(item.name)}
                        className={classNames(
                          item.current ? 'border-b-2 border-orange-300 text-orange-300' : '',
                          'px-3 py-2 text-sm font-medium'
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="div">
                  {user && 
                    <div className='pr-4'>
                      <Link onClick={handleLinkClick} to="/addToCard">
                        <ShoppingCartIcon class="h-6 w-6 text-gray-500" />
                      </Link>
                    </div>
                  }
                {!user &&
                <>
                    <NavLink
                      className={({ isActive }) =>
                        "rounded-md px-3 py-2 text-base font-medium " + (isActive ? "text-orange-300 " : "text-black")
                      }
                      to="/signup"
                      onClick={handleLinkClick}
                    >
                      Signup
                    </NavLink>
                    <NavLink
                      className={({ isActive }) =>
                        "rounded-md px-3 py-2 text-base font-medium " + (isActive ? "text-orange-300 " : "text-black")
                      }
                      to="/login"
                      onClick={handleLinkClick}
                    >
                      Login
                    </NavLink>
                    </>
                }
                </div>
                
                {user && <div>
                  <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 ">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <UserIcon class="h-6 w-6 text-black-500 bg-gray-300 rounded-full" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            user: {user.user.nom}
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <span
                            onClick={handleLogout}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </span>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>

                </div>
                }
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
  <div className="space-y-1 px-2 pb-3 pt-2">
    {navigation.map((item) => (
      <Link
        key={item.name}
        to={item.href}
        onClick={() => handleNavClick(item.name)}
        className={classNames(
          item.current ? 'bg-orange-300 text-white' : 'text-orange-300',
          'block rounded-md px-3 py-2 text-base font-medium'
        )}
        aria-current={item.current ? 'page' : undefined}
      >
        {item.name}
      </Link>
    ))}
  </div>
</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

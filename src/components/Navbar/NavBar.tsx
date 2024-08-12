"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose, AiFillMessage } from 'react-icons/ai';
import { IoLogOut } from 'react-icons/io5';
import Logo from '../Logo/Logo';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const localConfig = window.localStorage.getItem('userDetails');
    setLoggedIn(localConfig !== null);

    if (localConfig !== null) {
      const data = JSON.parse(localConfig);
      setUsername(data.full_name); // Use full_name directly
    }
  }, []);

  const handleOutsideClick = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const logout = () => {
    window.localStorage.removeItem('userDetails');
    window.location.assign('/');
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/home">
              <Logo />
            </Link>
          </div>
          <div className="hidden md:flex flex-1 justify-center space-x-4">
            {/* Navigation Links */}
            <Link href="/" className="text-black hover:text-light-black-4 transform transition-transform duration-200 hover:scale-90 text-lg font-semibold font-merriweather">Home</Link>
            <Link href="/shop" className="text-black hover:text-light-black-4 transform transition-transform duration-200 hover:scale-90 text-lg font-semibold font-merriweather">Shop</Link>
            <Link href="/cart" className="text-black hover:text-light-black-4 transform transition-transform duration-200 hover:scale-90 text-lg font-semibold font-merriweather">Cart</Link>
            <Link href="/about" className="text-black hover:text-light-black-4 transform transition-transform duration-200 hover:scale-90 text-lg font-semibold font-merriweather">About</Link>
          </div>
          <div className="hidden md:block">
            {!loggedIn ? (
              <Link href="/login" className="py-2 px-4 rounded-md text-white bg-black hover:text-light-black-4 text-lg font-semibold font-merriweather">Login</Link>
            ) : (
              <div className="flex items-center space-x-4">
                <div
                  ref={dropdownRef}
                  onClick={() => setIsOpen(!isOpen)}
                  className="cursor-pointer text-black font-semibold flex items-center gap-2 relative"
                >
                  <p>{username}</p>
                  {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
                      <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                      <Link href="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
                      <button onClick={logout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                    </div>
                  )}
                </div>
                <IoLogOut onClick={logout} size={"22px"} className="text-black cursor-pointer" />
              </div>
            )}
          </div>
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700 focus:outline-none">
              {menuOpen ? <AiOutlineClose className="h-6 w-6" /> : <GiHamburgerMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden">
            {/* Mobile Menu Links */}
            <Link href="/" className="block px-4 py-2 text-black hover:bg-light-black-4">Home</Link>
            <Link href="/shop" className="block px-4 py-2 text-black hover:bg-light-black-4">Shop</Link>
            <Link href="/cart" className="block px-4 py-2 text-black hover:bg-light-black-4">Cart</Link>
            <Link href="/about" className="block px-4 py-2 text-black hover:bg-light-black-4">About</Link>
            {!loggedIn ? (
              <Link href="/login" className="mt-4 flex justify-center py-2 px-4 rounded-md text-white bg-black hover:text-light-black-4 text-lg font-semibold font-merriweather">Login</Link>
            ) : (
              <div className="px-4 py-2">
                <div className="flex items-center justify-between">
                  <span>{username}</span>
                  <IoLogOut onClick={logout} size={"22px"} className="text-black cursor-pointer" />
                </div>
                <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                <Link href="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;

"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { IoLogOut } from 'react-icons/io5';
import Logo from '../Logo/Logo';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('authToken');
      console.log("Token:", token);
      if (token) {
        try {
          const response = await fetch('http://localhost:8000/api/users/profile', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
  
          console.log("Response status:", response.status);
          if (response.ok) {
            const user = await response.json();
            console.log("User data:", user);
            setUsername(user.name); // Use user.name instead of user.fullName
            setLoggedIn(true);
          } else {
            console.error("Failed to fetch user profile:", response.statusText);
            setLoggedIn(false);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setLoggedIn(false);
        }
      } else {
        console.log("No token found");
        setLoggedIn(false);
      }
    };
  
    fetchUserProfile();
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
    localStorage.removeItem('authToken');
    setLoggedIn(false);
    window.location.assign('/');
  };

  useEffect(() => {
    console.log("Username:", username);
  }, [username]);

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
            <Link href="/" className="text-black hover:text-light-black-4 transform no-underline transition-transform duration-75 hover:scale-90 text-lg font-medium">Home</Link>
            <Link href="/shop" className="text-black hover:text-light-black-4 transform no-underline transition-transform duration-75 hover:scale-90 text-lg font-medium">Shop</Link>
            <Link href="/cart" className="text-black hover:text-light-black-4 transform no-underline transition-transform duration-75 hover:scale-90 text-lg font-medium">Cart</Link>
            <Link href="/about" className="text-black hover:text-light-black-4 transform no-underline transition-transform duration-75 hover:scale-90 text-lg font-medium">About</Link>
          </div>
          <div className="hidden md:block">
            {!loggedIn ? (
              <Link href="/login" className="py-2 px-6 rounded-md text-white bg-secondary no-underline text-lg font-medium">Login</Link>
            ) : (
              <div className="flex items-center space-x-4">
                <div
                  ref={dropdownRef}
                  onClick={() => setIsOpen(!isOpen)}
                  className="cursor-pointer text-black font-medium flex items-center gap-2 relative"
                >
                  Welcome,
                  <p className='text-secondary font-semibold text-lg'>{username}</p>
                  {isOpen && (
                    <div className="absolute right-0 mt-[8.5rem] w-28 bg-white border border-secondary rounded shadow-lg">
                      <Link href="/profile" className="block px-4 py-2 hover:bg-light-yellow">Profile</Link>
                      <button onClick={logout} className="block w-full bg-secondary text-left px-4 py-2 hover:bg-light-yellow">Logout</button>
                    </div>
                  )}
                </div>
                <IoLogOut onClick={logout} size={"22px"} className="text-black cursor-pointer" />
              </div>
            )}
          </div>
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-secondary focus:outline-none">
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
              <Link href="/login" className="mt-4 flex justify-center py-2 px-4 rounded-md text-white bg-secondary text-lg font-semibold font-merriweather">Login</Link>
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
